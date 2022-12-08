import { Suspense } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';

import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';
import Subscribe from '../components/Subscribe';
import VideoCard from '../components/VideoCard';

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <div className="flex flex-col-reverse sm:flex-row items-start">
            <div className="flex flex-col pr-8">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
                Ved Prakash Gupta
              </h1>
              <h2 className="text-gray-700 dark:text-gray-200 mb-4">
                Student and Tech enthusiast{' '}
                <span className="font-semibold">Developer</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-16">
                Love to help Developers. Always Open for Contributions
              </p>
            </div>
            <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
              <Image
                alt="Ved Gupta"
                height={176}
                width={176}
                src="/avatar.jpg"
                priority
                className="rounded-full filter grayscale"
              />
            </div>
          </div>

          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            Featured Posts
          </h3>
          <div className="flex gap-6 flex-col md:flex-row">
            <BlogPostCard
              title="Web UI Implementation of Whisper to transcribe the Speech"
              slug="whisper-openai-web-ui-implementation"
              gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
            />
            <BlogPostCard
              title="Prenotebook a web based open source note taking Service"
              slug="prenotebook-alternative-to-google-keep"
              gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
            />
            <BlogPostCard
              title="Text Manipulator , a new way to play with your text"
              slug="textmanipulator-maipulate-your-text"
              gradient="from-[#D8B4FE] to-[#818CF8]"
            />
          </div>
          <Link href="/blog">
            <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
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
            </a>
          </Link>

          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            Suggested Tech videos
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            My suggested videos to learn about modern Tech Stacks & various SaaS
            resources and listen to latest tech news.
          </p>
          <VideoCard
            index="01"
            href="https://www.youtube.com/playlist?list=PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR"
            length="17:31:17"
            title="Learn Javascript by CodeWithHarry"
          />
          <VideoCard
            index="02"
            href="https://www.youtube.com/playlist?list=PLRAV69dS1uWRPSfKzwZsIm-Axxq-LxqhW"
            length="03:56:29"
            title="Learn TypeScript by HiteshChoudhary"
          />
          <VideoCard
            index="03"
            href="https://www.youtube.com/playlist?list=PL0vfts4VzfNjnYhJMfTulea5McZbQLM7G"
            length="__:__:__"
            title="The Code Report by Fireship.io --Dev News"
          />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/"
            className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
          >
            Watch all videos
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
          </a>
          <span className="h-16" />
          <Subscribe />
        </div>
      </Container>
    </Suspense>
  );
}
