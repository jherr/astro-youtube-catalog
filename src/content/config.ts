import { z, defineCollection } from "astro:content";
import { VideoIDsType } from "./videos";

const videoSchema = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.string()).optional(),
    privacyStatus: z.enum(["public"]),
    short: z.boolean(),
    thumbnails: z.object({
      default: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      medium: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      high: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      standard: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      maxres: z
        .object({
          url: z.string(),
          width: z.number(),
          height: z.number(),
        })
        .optional(),
    }),
  }),
});

const roadMapSchema = defineCollection({
  schema: z.object({
    title: z.string(),
    videos: z.array(z.nativeEnum(VideoIDsType)),
  }),
});

export const collections = {
  videos: videoSchema,
  roadmaps: roadMapSchema,
};
