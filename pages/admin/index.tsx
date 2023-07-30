import { Role } from '@prisma/client';
import Container from 'components/Container';
import DataTable, { DataTableColumn } from 'components/DataTable';
import fetcher from 'lib/fetcher';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';

export default function AdminConsole() {
  return (
    <Container title="Admin Console" description="Admin Console - Ved Gupta">
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="my-2 flex flex-col space-y-4 w-full"></div>
        <GalgotiaStudents />
      </div>
    </Container>
  );
}

const GalgotiaStudents = () => {
  const [page, setPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = useCallback(async () => {
    setLoading(true);
    const data = await fetcher(
      `/api/admin/students?page=${page}&searchQuery=${searchQuery}`
    );
    console.log(data);
    setTotalStudents(data.totalStudents);
    setStudents(data.students);
    setLoading(false);
  }, [page, searchQuery]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);

  const handleNextPage = () => {
    let per_page = 10;
    if (page * per_page < totalStudents) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const columns: DataTableColumn[] = [
    { name: 'RollNumber', select: 'RollNumber', required: true },
    { name: 'EnrollmentNoAKTU', select: 'EnrollmentNoAKTU' },
    { name: 'Name', select: 'FullName', required: true },
    { name: 'Gender', select: 'Gender' },
    { name: 'DOB', select: 'DOB', required: true, datetime: true },
    { name: 'TenthPercentageOrCGPA', select: 'TenthPercentageOrCGPA' },
    { name: 'TenthBoardsName', select: 'TenthBoardsName' },
    { name: 'TenthPassingYear', select: 'TenthPassingYear' },
    { name: 'QualificationAfterTenth', select: 'QualificationAfterTenth' },
    {
      name: 'TwelfthOrDiplomaPercentage',
      select: 'TwelfthOrDiplomaPercentage'
    },
    {
      name: 'TwelfthOrDiplomaBoardOrUniversityName',
      select: 'TwelfthOrDiplomaBoardOrUniversityName'
    },
    {
      name: 'TwelfthOrDiplomaPassingYear',
      select: 'TwelfthOrDiplomaPassingYear'
    },
    { name: 'AdmissionInBTechThrough', select: 'AdmissionInBTechThrough' },
    { name: 'BTechSem1SGPA', select: 'BTechSem1SGPA' },
    { name: 'BTechSem2SGPA', select: 'BTechSem2SGPA' },
    { name: 'BTechSem3SGPA', select: 'BTechSem3SGPA' },
    { name: 'BTechSem4SGPA', select: 'BTechSem4SGPA' },
    { name: 'BTechSem5SGPA', select: 'BTechSem5SGPA' },
    { name: 'EmailId', select: 'EmailId', required: true },
    { name: 'PassoutYear', select: 'PassoutYear' }
  ];

  return (
    <DataTable
      columns={columns}
      total={totalStudents}
      data={students}
      page={page}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      handleSearch={handleSearch}
    />
  );
};

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
