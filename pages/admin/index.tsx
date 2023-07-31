import { Role } from '@prisma/client';
import Container from 'components/Container';
import Card from 'components/admin/Card';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export default function AdminConsole() {
  return (
    <Container title="Admin Console" description="Admin Console - Ved Gupta">
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="my-2 flex flex-col w-full">
          <Card
            title="Galgotia Students Database 2023"
            excerpt="Galgotia College of Engineering and Technology Student Batch 2023 Passout Data"
            slug="/admin/galgotia-students"
          />
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session || session.user.role !== Role.ADMIN) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: {
      user: session.user
    }
  };
}
