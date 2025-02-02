import { createClient } from "microcms-js-sdk";
import { Slides } from "@/types/microcms";

if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  throw new Error("Missing required environment variables for microCMS");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const slideRepository = {
  async getSlidesByLessonId(lessonId: string, draftKey?: string): Promise<Slides> {
    return client.get<Slides>({
      endpoint: "slides",
      contentId: lessonId,
      queries: { draftKey: draftKey || undefined }
    });
  },
};
