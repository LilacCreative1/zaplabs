export default async function handler(req, res) {
  const { suspectId, message } = req.body;

  const grokRes = await fetch('https://api.grok.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'grok-1',
      messages: [
        {
          role: 'system',
          content: `You are simulating a suspect named ${suspectId}. Respond in character with realistic tone, psychology, and behavior.`
        },
        {
          role: 'user',
          content: message
        }
      ]
    })
  });

  const data = await grokRes.json();
  res.status(200).json(data);
}



add Grok chat handler for suspect simulation
