import { createClient } from 'microcms-js-sdk';
import { Slides } from '@/types/microcms';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const slideRepository = {
  async getSlidesByLessonId(lessonId: string): Promise<Slides> {
    return client.get<Slides>({
      endpoint: 'slides',
      contentId: lessonId,
    });
  },
};