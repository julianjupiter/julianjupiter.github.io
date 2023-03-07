import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    keywords: z.string(),
    author: z.string(),
    date: z.date(),
    image: z.object({
      thumbnail: z.string()
    })
  }),
});

export const collections = {
  blog: blog,
};
