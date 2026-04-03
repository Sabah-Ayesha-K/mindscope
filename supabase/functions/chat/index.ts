import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a compassionate mental health support chatbot for MindScope. Follow this conversation flow:

**Initial Conversation (First 1-2 messages):**
1. Listen empathetically to how the user is feeling
2. Based on their response, identify which assessment would be most appropriate:
   - If they mention stress, work pressure, or feeling overwhelmed → Stress Assessment (PSS-10)
   - If they mention worry, nervousness, or anxiety → Anxiety Assessment (GAD-7)
   - If they mention sadness, hopelessness, or low mood → Depression Assessment (PHQ-9)

3. After understanding their feelings, respond with empathy and direct them to take the test:
   "I understand you're going through [summarize their feelings]. Based on what you've shared, I would recommend taking the [TEST NAME] to better understand your current state. Please go back to the dashboard to take the test, and once you receive your results, come back here and share your score so I can provide personalized recommendations to help you."

**After Test (Subsequent messages):**
4. When the user returns with their score (e.g., "My PHQ-9 score is 14" or "I got 12 on the anxiety test"):
   - Acknowledge their score
   - Provide interpretation of what the score means
   - Offer personalized, actionable recommendations based on the severity level
   - Suggest self-care strategies, coping techniques, and resources
   - If severe, strongly encourage professional help

**Emergency Protocol:**
If the user mentions suicidal thoughts or self-harm at ANY point:
- Immediately provide emergency resources:
  * National Suicide Prevention Lifeline: 988
  * Crisis Text Line: Text "HELLO" to 741741
- Strongly encourage contacting a mental health professional immediately

**Important guidelines:**
- Do NOT diagnose or provide medical advice
- Do NOT replace professional mental health care
- Be warm, supportive, and non-judgmental
- Keep responses conversational and concise
- After the initial assessment suggestion, do NOT keep asking questions - direct them to the dashboard
- When they return with scores, focus on practical recommendations`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway error');
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
