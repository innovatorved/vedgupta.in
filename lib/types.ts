import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type Post = {
  _id: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  date: string;
  excerpt: string;
  website: string;
  author: { name: string; image: string };
  categories?: Categories[] | null;
  coverImage: string;
  readingTime: string;
  tweets?: any[] | null;
};

export interface Categories {
  title: string;
}

export type Snippet = {
  _id: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  description: string;
  logo: string;
};

export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Subscribers = {
  count: number;
};

export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type YouTube = {
  subscriberCount: number;
  viewCount: number;
};

export type GitHub = {
  stars: number;
};

export interface Student {
  id: string;
  RollNumber: number;
  EnrollmentNoAKTU: number;
  FullName: string;
  Gender: 'M' | 'F';
  DOB: Date;
  TenthPercentageOrCGPA: number;
  TenthBoardsName: string;
  TenthPassingYear: number;
  QualificationAfterTenth: string;
  TwelfthOrDiplomaPercentage: number;
  TwelfthOrDiplomaBoardOrUniversityName: string;
  TwelfthOrDiplomaPassingYear: number;
  AdmissionInBTechThrough: string;
  BTechSem1SGPA?: number;
  BTechSem2SGPA?: number;
  BTechSem3SGPA?: number;
  BTechSem4SGPA?: number;
  BTechSem5SGPA?: number;
  EmailId: string;
  BranchId: string;
  PassoutYear: number;
}

export interface Branch {
  BranchId: string;
  Branch: string;
  Description?: string;
  Students: Student[];
}

export interface DataTableColumn {
  name: string;
  select: string;
  required?: boolean;
  datetime?: boolean;
}
