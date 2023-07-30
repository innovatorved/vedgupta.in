import { NextApiRequest, NextApiResponse } from 'next';
import { getStudentsData } from 'controller/admin.controller';
import { User, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Role } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUser(req, res);
  if (user.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }
  try {
    if (req.method === 'GET') {
      return await handleGET(req, res);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  let page = Number(req.query.page);
  let per_page = Number(req.query.per_page);
  let searchQuery = req.query.searchQuery;
  if (!page) {
    page = 1;
  }
  if (!per_page) {
    per_page = 10;
  }

  const response = await getStudentsData(page, per_page, searchQuery as string);
  return res.json(response);
};

export async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User> {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new Error('You must be authenticated to do this');
  }
  const { user } = session;
  return user;
}
