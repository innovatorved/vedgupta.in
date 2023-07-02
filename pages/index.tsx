import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';
import Subscribe from '../components/Subscribe';

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <div className="flex flex-col-reverse items-start">
            <div className="flex flex-col pr-8">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
                Ved Prakash Gupta
              </h1>
              <h2 className="text-gray-700 dark:text-gray-200 mb-4">
                Student and Tech enthusiast{' '}
                <span className="font-semibold">Developer</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-16">
                It's my passion to write code and solve problems as a Software
                Developer. Love to help Developers. Always Open for
                Contributions
              </p>
            </div>
            <div className="relative mb-8 ">
              <Image
                alt="Ved Gupta"
                height={100}
                width={500}
                src="/avatar-mobile.jpg"
                sizes="100vw"
                priority
                className="rounded-lg filter grayscale object-cover"
              />
            </div>
          </div>

          <h3 className="font-bold mt-8 text-xl md:text-2xl tracking-tight mb-6 text-black dark:text-white">
            Featured Posts
          </h3>
          <div className="my-2 flex flex-col space-y-4 w-full">
            <BlogPostCard
              name="Web UI Implementation of Whisper to transcribe the Speech"
              slug="whisper-openai-web-ui-implementation"
            />
            <BlogPostCard
              name="Prenotebook a web based open source note taking Service"
              slug="prenotebook-alternative-to-google-keep"
            />
            <BlogPostCard
              name="Text Manipulator , a new way to play with your text"
              slug="textmanipulator-maipulate-your-text"
            />
          </div>
          <Link
            href="/blog"
            className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
          >
            <>
              Read all posts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 ml-1"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                />
              </svg>
            </>
          </Link>

          <span className="h-16" />
          <Subscribe />
        </div>
      </Container>
    </Suspense>
  );
}
