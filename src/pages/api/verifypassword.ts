import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const response = await fetch(
        'https://ca-backend-qknd.onrender.com/auth/login/forgot_password/verify/',
        {
          method: 'POST',
          body: JSON.stringify(req.body), // Pass the request body as-is
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data); // Forward the response from the external API
      } else {
        res.status(response.status).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}
