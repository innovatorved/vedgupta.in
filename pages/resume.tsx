import Container from 'components/Container';

export default function NotFound() {
  return (
    <Container title="Resume - Ved Gupta">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white ml-auto mr-auto">
          My Resume
        </h1>
        <iframe
          className="w-[100%] md:w-[80%] h-[450px] sm:h-[600px] md:h-[750px]"
          sandbox="allow-same-origin allow-scripts allow-forms"
          src={'/pdf/VedGupta_Resume.pdf'}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        ></iframe>
      </div>
    </Container>
  );
}
