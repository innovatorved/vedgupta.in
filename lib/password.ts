import sha256 from 'crypto-js/sha256';

export const hashPassword = (password: string) => {
  return sha256(password).toString();
};
