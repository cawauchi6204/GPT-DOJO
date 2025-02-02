// This file is auto-generated from microCMS API schema
export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type MicroCMSDate = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type SlideContent = {
  fieldId: 'contents';
  content: string;
};

export type Slides = {
  id: string;
  slide: SlideContent[];
} & MicroCMSDate;

export type MicroCMSResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
