import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(
        'https://ca-backend-qknd.onrender.com/auth/user/profile/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization
              ? req.headers.authorization
              : '',
          },
        }
      );

      if (response.ok) {
        const profile = await response.json();
        res.status(200).json(profile); // Forward the response from the API
      } else {
        console.log('Failed to fetch Profile : getProfile.ts');
        res
          .status(response.status)
          .json({ message: 'Failed to fetch Profile' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
