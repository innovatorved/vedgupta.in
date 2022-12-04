import Link from 'next/link';
import Image from 'next/future/image';

import Container from 'components/Container';
import avatar from 'public/avatar.jpg';
import avatarBW from 'public/avatar-bw.jpg';

export default function About() {
  return (
    <Container title="About – Lee Robinson">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Links</h2>
          <ul>
            <li>
              Twitter:{' '}
              <a href="https://twitter.com/innovatorved">@innovatorved</a>
            </li>
            <li>
              GitHub:{' '}
              <a href="https://github.com/innovatorved">@innovatorved</a>
            </li>
            <li>
              Website:{' '}
              <Link href="https://innovatorved.io">
                <a>https://innovatorved.io</a>
              </Link>
            </li>
            <li>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/in/innovatorved/">
                https://www.linkedin.com/in/innovatorved
              </a>
            </li>
          </ul>
          <h2>Bio</h2>
          <h3>Job Title</h3>
          <p>Lee Robinson, VP of Developer Experience at Vercel</p>
          <h3>Long, 3rd Person</h3>
          <p>
            Lee Robinson is the VP of Developer Experience at{' '}
            <a href="http://vercel.com/">Vercel</a>, where he helps developers
            build a faster web and leads the Next.js community. He leads the
            community for the React framework Next.js and is an open-source
            contributor. An educator, writer, and speaker, Lee has created
            courses on React, Next.js, and web development.
          </p>
          <h3>Long, 1st Person</h3>
          <p>
            I am tech enthusiast Full Stack Software Developer compatible in
            various technologies that are needed and also compatible in
            Development , Deployment and Maintenance of an Application
          </p>
          <h3>Education</h3>
          <p>
            Ved Prakash Gupta Pursue from Galgotias College of Engineering and
            Technology with a B.tech in Information Technology.
          </p>
          <h2>Headshots</h2>
          <div className="flex space-x-8">
            <a href="/avatar.jpg">
              <Image
                alt="Ved Prakash Gupta headshot"
                width={400}
                quality={100}
                src={avatar}
                className="rounded-md"
              />
            </a>
            <a href="/avatar-bw.jpg">
              <Image
                alt="Ved Prakash Gupta headshot"
                width={400}
                quality={100}
                src={avatarBW}
                className="rounded-md"
              />
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
