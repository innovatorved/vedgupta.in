import { useState, useRef } from 'react';

import { Form, FormState, Subscribers } from 'lib/types';
import SuccessMessage from 'components/SuccessMessage';
import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from 'components/LoadingSpinner';

export default function Subscribe() {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef<HTMLInputElement | null>(null);

  const subscribe = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    let email = inputEl.current?.value;
    let res = await fetch(`/api/subscribe?email=${email}`);
    const { success, error } = await res.json();

    if (success) {
      inputEl.current && (inputEl.current.value = '');
      setForm({
        state: Form.Success,
        message: `Hooray! You're now on the list.`
      });
    } else {
      setForm({
        state: Form.Error,
        message: `Some error Occured! Make sure EmailId is not registered`
      });
    }
  };

  return (
    <div className="my-4 w-full">
      <form className="relative mt-4 mb-2" onSubmit={subscribe}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="tim@apple.com"
          type="email"
          autoComplete="email"
          required
          className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pr-32"
        />
        <button
          className="flex items-center justify-center absolute right-1 top-1 px-4 pt-1 font-medium h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
          type="submit"
        >
          {form.state === Form.Loading ? <LoadingSpinner /> : 'Subscribe'}
        </button>
      </form>
      {form.state === Form.Error ? (
        <ErrorMessage>{form.message}</ErrorMessage>
      ) : form.state === Form.Success ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : (
        <SubscribeMessage>Subscribe to the newsletter</SubscribeMessage>
      )}
    </div>
  );
}

function SubscribeMessage({ children }) {
  return (
    <p className="flex items-center text-sm text-gray-800 dark:text-gray-200 font-semibold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="mr-2 h-4 w-4"
      >
        <path d="M10.5 3.5H1.75a.25.25 0 0 0-.25.25v.32L8 7.88l3.02-1.77a.75.75 0 0 1 .758 1.295L8.379 9.397a.75.75 0 0 1-.758 0L1.5 5.809v6.441c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-4.5a.75.75 0 0 1 1.5 0v4.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25V4.513a.75.75 0 0 1 0-.027V3.75C0 2.784.784 2 1.75 2h8.75a.75.75 0 0 1 0 1.5Z"></path>
        <path d="M14 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
      </svg>
      {children}
    </p>
  );
}
