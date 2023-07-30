import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from 'lib/password';
import { omit } from 'lodash';
import { prisma } from 'lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      await handlePOST(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// POST /api/user
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).json({ error: 'Missing name, email and/or password' });
    return;
  }
  const { referredBy } = req.body;
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password)
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });

  return res.json(omit(user, ['password', 'EmailVerification']));
}
