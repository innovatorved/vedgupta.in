import useSWR from 'swr';

import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import Link from 'next/link';

export default function BlogPostCard({ slug, name }) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Link
      href={`/blog/${slug}`}
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50  dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full"
    >
      <div className="flex flex-col">
        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
          {name}
        </p>
        <ViewCounter views={views} />
      </div>
      <div className="text-neutral-700 dark:text-neutral-300">
        <ArrowIcon />
      </div>
    </Link>
  );
}

export function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 transform hover:rotate-90"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ViewCounter({ views }) {
  return (
    <p className="text-neutral-600 text-sm dark:text-neutral-400">{`${
      views ? views : '–––'
    } views`}</p>
  );
}
