export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export const VerifyCredentials = async (credentials: any) => {
  const CREDENTIALS_URL = `${
    process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  }/api/user/check-credentials`;
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json'
    },
    body: credentials ? new URLSearchParams(credentials).toString() : ''
  };

  const user = await fetcher(CREDENTIALS_URL, data);
  if (!user) return null;
  return user;
};
