import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import { PropsWithChildren, Suspense } from 'react';

import Container from 'components/Container';
import Subscribe from 'components/Subscribe';
import ViewCounter from 'components/ViewCounter';
import { Post, Categories } from 'lib/types';
import { urlForImage } from 'lib/sanity';

export default function BlogLayout({
  children,
  post
}: PropsWithChildren<{ post: Post }>) {
  return (
    <Container
      title={`${post.title} – Ved Prakash Gupta`}
      description={post.excerpt}
      image={urlForImage(post.coverImage).url()}
      date={new Date(post.date).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Ved Gupta"
              height={32}
              width={32}
              sizes="20vw"
              src={urlForImage(post.author.image).url()}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {`${post.author.name} / `}
              {format(parseISO(post.date), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readingTime}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <div className="my-4">
          <Image
            alt={post.title}
            height={1024}
            width={1024}
            sizes="100vw"
            src={urlForImage(post.coverImage).url()}
            className="rounded-sm"
          />
        </div>
        <div className="text-gray-700 dark:text-white mt-3">
          <p>{post.excerpt}</p>
        </div>
        <Suspense fallback={null}>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            {children}
          </div>
          <div className="mt-4 prose dark:prose-dark max-w-none">
            <h2 id="link">
              <a href="#link">
                <span className="icon icon-link"></span>
              </a>
              🔗 Related Link
            </h2>
            <a
              href={`${post.website}?utm_source=vedgupta.in&utm_medium=Blog`}
              className="underline text-blue-600 hover:text-blue-700 dark:hover:text-blue-900 dark:visited:text-purple-600 visited:text-purple-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.website}
            </a>
          </div>
          <div className="prose dark:prose-dark space-x-2 mt-8">
            <span>Categories :</span>
            {post.categories?.map((category: Categories, key) => {
              return (
                <span
                  key={key}
                  className="inline bg-none rounded border-solid border cursor-pointer items-center px-2 py-1 gap-1"
                >
                  <strong className="mr-2">{category.title}</strong>
                </span>
              );
            })}
          </div>
          <div className="mt-8">
            <Subscribe />
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <a
              href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
                `https://vedgupta.in/blog/${post.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {'Discuss on Twitter'}
            </a>
            {` • `}
            <a
              href="https://github.com/innovatorved/vedgupta.in/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              {'Suggest Change'}
            </a>
          </div>
        </Suspense>
      </article>
    </Container>
  );
}
