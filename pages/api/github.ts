import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'edge'
};

export default async function handler(req: NextRequest) {
  const userResponse = await fetch('https://api.github.com/users/innovatorved');
  const userReposResponse = await fetch(
    'https://api.github.com/users/innovatorved/repos?per_page=100'
  );

  const user = await userResponse.json();
  const repositories = await userReposResponse.json();

  const mine = Array.isArray(repositories)
    ? repositories.filter((repo) => !repo.fork)
    : undefined;
  const stars = Array.isArray(mine)
    ? mine.reduce((accumulator, repository) => {
        return accumulator + repository['stargazers_count'];
      }, 0)
    : undefined;

  return new Response(
    JSON.stringify({
      followers: user.followers,
      stars
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
      }
    }
  );
}
