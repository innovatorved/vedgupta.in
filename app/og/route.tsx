import { ImageResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get('title');
  //   const font = fetch(
  //     new URL('../../public/fonts/kaisei-tokumin-bold.ttf', import.meta.url)
  //   ).then((res) => res.arrayBuffer());
  //   const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          padding: '10px 20px',
          justifyContent: 'center',
          fontSize: 28,
          backgroundColor: 'white',
          backgroundImage: `url(http://localhost:3000/static/background/background-4.jpg)`,
          backgroundSize: 'cover'
        }}
      >
        <img
          style={{
            width: 300,
            height: 300,
            position: 'absolute',
            top: 100,
            left: 100,
            filter: 'grayscale(100%)'
          }}
          src="http://localhost:3000/static/favicons/android-chrome-512x512.png"
        />
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 100,
            fontFamily: 'Kaisei Tokumin',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: 'white',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {postTitle}
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 80,
            left: 150
          }}
        >
          <img
            style={{
              width: 100,
              height: 100
            }}
            tw="rounded-lg"
            src="http://localhost:3000/avatar-square.jpg"
            width={100}
            height={100}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <label
              style={{
                display: 'flex',
                fontSize: 35,
                letterSpacing: '-0.05em',
                color: 'white',
                marginLeft: '20px'
              }}
              tw="font-extrabold"
            >
              <b>Ved Gupta</b>
            </label>
            <label
              style={{
                display: 'flex',
                fontSize: 30,
                letterSpacing: '-0.05em',
                color: 'grey',
                marginLeft: '20px'
              }}
            >
              Software Developer
            </label>
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080
      //   fonts: [
      //     {
      //       name: 'Kaisei Tokumin',
      //         data: fontData,
      //       style: 'normal'
      //     }
      //   ]
    }
  );
}
