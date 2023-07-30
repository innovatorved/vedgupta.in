import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { hashPassword } from 'lib/password';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id as string;

  if (req.method === 'GET') {
    return handleGET(userId, res);
  } else if (req.method === 'POST') {
    return handlePOST(userId, res, req);
  } else if (req.method === 'DELETE') {
    return handleDELETE(userId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
  return;
}

// GET /api/user/:id
async function handleGET(userId: string, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      password: false
    }
  });
  return res.json(user);
}

// POST /api/user/:id
async function handlePOST(
  userId: string,
  res: NextApiResponse,
  req: NextApiRequest
) {
  const data: any = {};
  if (req.body.name) {
    data['name'] = req.body.name;
  }
  if (req.body.email) {
    data['email'] = req.body.email;
  }
  if (
    req.body.password &&
    req.body.password.length >= 8 &&
    req.body.password.length <= 16
  ) {
    data['password'] = hashPassword(req.body.password);
  }
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true
      }
    });
    return res.json({
      user,
      success: true,
      message: 'User updated successfully'
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: 'User updated failed'
    });
  }
}

// DELETE /api/user/:id
async function handleDELETE(userId: string, res: NextApiResponse) {
  const user = await prisma.user.delete({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      password: false
    }
  });
  return res.json(user);
}
