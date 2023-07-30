import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { hashPassword } from 'lib/password';
import { omit } from 'lodash';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await handlePOST(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// POST /api/user/check-credentials
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      password: true
    }
  });
  if (user && user.password == hashPassword(req.body.password)) {
    res.json(omit(user, 'password'));
  } else {
    res.status(400).end('Invalid credentials');
  }
}
