import { Role } from '@prisma/client';
import Container from 'components/Container';
import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from 'components/LoadingSpinner';
import SuccessMessage from 'components/SuccessMessage';
import { Form, FormState } from 'lib/types';
import { GetServerSidePropsContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import React, { useRef, useState } from 'react';

export default function AdminLogin() {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onLogin = async (e: any) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: `${window.location.origin}/admin`
      });
      setForm({
        state: Form.Success,
        message: `Hooray! Thanks for signing my Guestbook.`
      });
    } catch (error: any) {
      setForm({ state: Form.Error, message: error.message });
    }
  };

  return (
    <Container title="Admin Login" description="Admin Console - Ved Gupta">
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="my-2 flex flex-col space-y-4 w-full"></div>
        <h3 className="font-bold text-xl md:text-2xl tracking-tight mb-1 text-black dark:text-white">
          Admin Login
        </h3>
        <form
          style={{ opacity: form.state !== Form.Loading ? 1 : 0.7 }}
          className="relative max-w-[500px] text-sm my-2"
          onSubmit={onLogin}
        >
          <input
            ref={emailRef}
            aria-label="Email"
            placeholder="Email"
            disabled={form.state === Form.Loading}
            name="entry"
            type="text"
            required
            className=" pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          />
          <input
            ref={passwordRef}
            aria-label="Password"
            placeholder="Password"
            disabled={form.state === Form.Loading}
            name="entry"
            type="password"
            required
            className=" pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          />
          <button
            className="py-2 mt-3 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 hover:dark:bg-neutral-800 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            disabled={form.state === Form.Loading}
            type="submit"
          >
            {form.state === Form.Loading ? <LoadingSpinner /> : 'Sign'}
          </button>
        </form>
        {form.state === Form.Error ? (
          <ErrorMessage>{form.message}</ErrorMessage>
        ) : form.state === Form.Success ? (
          <SuccessMessage>{form.message}</SuccessMessage>
        ) : (
          <p className="text-sm text-gray-800 dark:text-gray-200" />
        )}
      </div>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  let destination = '/';
  if (session) {
    if (session.user.role === Role.ADMIN) {
      destination = '/admin';
    }
    return {
      redirect: {
        destination,
        permanent: false
      }
    };
  }
  return {
    props: {
      session
    }
  };
}
