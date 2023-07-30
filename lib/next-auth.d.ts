import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
  interface User {
    id: string;
    image: string;
    role: Role;
    name: string;
    email: string;
  }
  enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }
}
