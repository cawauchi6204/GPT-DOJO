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
  async getSlidesByLessonId(lessonId: string): Promise<Slides> {
    return client.get<Slides>({
      endpoint: "slides",
      contentId: lessonId,
    });
  },
};

export async function fetchSlideContent(lessonId: string) {
  try {
    const response = await client.get({
      endpoint: "slides",
      contentId: lessonId,
    });

    return response.content;
  } catch (error) {
    console.error("Error fetching slide content:", error);
    return ""; // もしくはエラーハンドリングの方針に応じて対応
  }
}
