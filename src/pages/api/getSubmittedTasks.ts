import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(
        'https://ca-backend-qknd.onrender.com/tasks/submitted',
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
        const submittedTasks = await response.json();
        res.status(200).json(submittedTasks); // Forward the response from the API
      } else {
        res
          .status(response.status)
          .json({ message: 'Failed to fetch submitted tasks' });
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
