import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Loader2, ArrowLeft, MessageSquarePlus, Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

function formatMessageToHtml(text: string): string {
  // basic markdown-ish to HTML (safe subset; no links)
  let html = text
    // bold **...**
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // bullets starting with "* "
    .replace(/(^|\n)\* +(.+?)(?=\n|$)/g, '$1<li>$2</li>')
    // paragraphs -> <br/>
    .replace(/\n\n+/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');

  // wrap loose <li> in <ul>
  if (/<li>/.test(html)) {
    html = html.replace(/(?:^|<br\/><br\/>)*(<li>[\s\S]*<\/li>)/g, '<ul class="list-disc pl-5 space-y-1">$1</ul>');
  }
  return html;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  updated_at: string;
}

export const ChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load all conversations
  const loadConversations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('conversations')
      .select('id, title, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (data) {
      setConversations(data);
    }
  };

  // Load messages for a specific conversation
  const loadMessages = async (convId: string) => {
    const { data: chatMessages } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true });

    if (chatMessages && chatMessages.length > 0) {
      setMessages(chatMessages as Message[]);
    } else {
      const initialMessage: Message = {
        role: 'assistant',
        content: 'Hello! I\'m here to support you. How are you feeling today?'
      };
      setMessages([initialMessage]);
      
      await supabase
        .from('chat_messages')
        .insert({
          conversation_id: convId,
          role: initialMessage.role,
          content: initialMessage.content
        });
    }
  };

  // Check authentication and load initial conversation
  useEffect(() => {
    const checkAuthAndLoadConversation = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      await loadConversations();

      const { data: convs } = await supabase
        .from('conversations')
        .select('id')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      let convId: string;

      if (convs && convs.length > 0) {
        convId = convs[0].id;
      } else {
        const { data: newConv, error } = await supabase
          .from('conversations')
          .insert({ user_id: user.id, title: 'Mental Health Chat' })
          .select('id')
          .single();

        if (error || !newConv) {
          toast({
            title: 'Error',
            description: 'Failed to create conversation',
            variant: 'destructive'
          });
          return;
        }
        convId = newConv.id;
        await loadConversations();
      }

      setConversationId(convId);
      await loadMessages(convId);
    };

    checkAuthAndLoadConversation();
  }, [navigate, toast]);

  // Create new conversation
  const createNewConversation = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: newConv, error } = await supabase
      .from('conversations')
      .insert({ user_id: user.id, title: `MindScope Assistant 💬` })
      .select('id')
      .single();

    if (error || !newConv) {
      toast({
        title: 'Error',
        description: 'Failed to create conversation',
        variant: 'destructive'
      });
      return;
    }

    setConversationId(newConv.id);
    await loadConversations();
    await loadMessages(newConv.id);
    setSidebarOpen(false);
  };

  // Switch to a different conversation
  const switchConversation = async (convId: string) => {
    setConversationId(convId);
    await loadMessages(convId);
    setSidebarOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !conversationId) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Save user message to database
      await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          role: userMessage.role,
          content: userMessage.content
        });

      // Get AI response
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: [...messages, userMessage] }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Save assistant message to database
      await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          role: assistantMessage.role,
          content: assistantMessage.content
        });

      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'fixed inset-0 z-50 bg-background' : 'hidden'} lg:relative lg:block lg:w-72 border-r`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Conversations</h2>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4">
            <Button 
              onClick={createNewConversation} 
              className="w-full"
              variant="outline"
            >
              <MessageSquarePlus className="h-4 w-4 mr-2" />
              New Conversation
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2">
              {conversations.map((conv) => (
                <Card
                  key={conv.id}
                  className={`p-3 cursor-pointer hover:bg-accent transition-colors ${
                    conversationId === conv.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => switchConversation(conv.id)}
                >
                  <p className="font-medium text-sm truncate">{conv.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(conv.updated_at).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => {
            const isUser = message.role === 'user';
            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-foreground'
                  }`}
                >
                  {isUser ? (
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <div
                      className="text-[15px] leading-relaxed"
                      // we control formatting to a safe subset above
                      dangerouslySetInnerHTML={{ __html: formatMessageToHtml(message.content) }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex justify-start items-center gap-2">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  <span>Assistant is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
