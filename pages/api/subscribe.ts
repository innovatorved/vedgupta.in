import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import url from 'url';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const incoming_url = req.url ? url.parse(req.url, true) : null;
  const email = incoming_url?.query.email || null;
  if (!email) {
    return res.status(200).json({ error: 'Email Not found', succes: false });
  }

  try {
    const entry = await prisma.newsletter.create({
      data: {
        email: `${email}`
      }
    });
    if (entry) {
      res.status(200).json({ error: '', success: true });
    } else {
      res.status(200).json({ error: 'Error Occured', success: false });
    }
    return;
  } catch (err) {
    res.status(200).json({ error: err.message, success: false });
  }
  return;
}
