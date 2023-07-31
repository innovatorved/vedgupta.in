import { ArrowIcon } from 'components/DataTable';
import Link from 'next/link';

export default function Card({
  slug,
  title,
  excerpt
}: {
  slug: string;
  title: string;
  excerpt: string;
}) {
  return (
    <Link href={`/${slug}`} className="w-full">
      <div className="w-full mb-4">
        <div className="flex flex-col justify-between md:flex-row">
          <h3 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{excerpt}</p>
      </div>
      <div className="text-neutral-700 dark:text-neutral-300 mx-2">
        <ArrowIcon className={'hover:rotate-45'} />
      </div>
    </Link>
  );
}
