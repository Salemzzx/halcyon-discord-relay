export default async function handler(req, res) {
  const { params } = req.body;

  if (!params) {
    return res.status(400).json({ error: 'Missing "params" in body' });
  }

  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

  if (!discordWebhook) {
    return res.status(500).json({ error: 'Missing DISCORD_WEBHOOK_URL env variable' });
  }

  try {
    const response = await fetch(discordWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: params }),
    });

    if (!response.ok) {
      throw new Error(`Discord responded with status ${response.status}`);
    }

    return res.status(200).json({ status: 'Sent to Discord' });
  } catch (error) {
    console.error('Error sending to Discord:', error);
    return res.status(500).json({ error: 'Failed to send to Discord' });
  }
}
