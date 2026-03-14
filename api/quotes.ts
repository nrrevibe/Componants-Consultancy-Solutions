import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, phone, service, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Log the quote request (Vercel serverless doesn't support SQLite)
  console.log('New quote request:', { name, email, company, phone, service, message });

  // Return success - in production, you'd integrate with a database service
  // like Vercel Postgres, PlanetScale, Supabase, etc.
  return res.status(201).json({ 
    id: Date.now(),
    message: 'Quote request received successfully' 
  });
}
