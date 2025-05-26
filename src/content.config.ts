import { file, glob } from "astro/loaders";
import { defineCollection, z, reference } from "astro:content";
import type { icons as lucideIcons } from "@iconify-json/lucide/icons.json";
import type { icons as simpleIcons } from "@iconify-json/simple-icons/icons.json";

const other = defineCollection({
  loader: glob({ base: "src/content/other", pattern: "**/*.{md,mdx}" }),
});

const other_es = defineCollection({
  loader: glob({ base: "src/content/other-es", pattern: "**/*.{md,mdx}" }),
});

const lucideIconSchema = z.object({
  type: z.literal("lucide"),
  name: z.custom<keyof typeof lucideIcons>(),
});

const simpleIconSchema = z.object({
  type: z.literal("simple-icons"),
  name: z.custom<keyof typeof simpleIcons>(),
});

const quickInfo = defineCollection({
  loader: file("src/content/info.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    text: z.string(),
  }),
});

const quickInfo_es = defineCollection({
  loader: file("src/content/info_es.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    text: z.string(),
  }),
});

const socials = defineCollection({
  loader: file("src/content/socials.json"),
  schema: z.object({
    id: z.number(),
    icon: z.union([lucideIconSchema, simpleIconSchema]),
    text: z.string(),
    link: z.string().url(),
  }),
});

const workExperience = defineCollection({
  loader: file("src/content/work.json"),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    company: z.string(),
    duration: z.string(),
    description: z.string(),
  }),
});

const workExperience_es = defineCollection({
  loader: file("src/content/work_es.json"),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    company: z.string(),
    duration: z.string(),
    description: z.string(),
  }),
});

const tags = defineCollection({
  loader: file("src/content/tags.json"),
  schema: z.object({
    id: z.string(),
  }),
});

const posts = defineCollection({
  loader: glob({ base: "src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      description: z.string(),
      tags: z.array(reference("tags")),
      draft: z.boolean().optional().default(false),
      image: image(),
    }),
});

const posts_es = defineCollection({
  loader: glob({ base: "src/content/posts-es", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      description: z.string(),
      tags: z.array(reference("tags")),
      draft: z.boolean().optional().default(false),
      image: image(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      image: image(),
      link: z.string().url().optional(),
      info: z.array(
        z.object({
          text: z.string(),
          icon: z.union([lucideIconSchema, simpleIconSchema]),
          link: z.string().url().optional(),
        }),
      ),
    }),
});

const projects_es = defineCollection({
  loader: glob({ base: "src/content/projects-es", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      image: image(),
      link: z.string().url().optional(),
      info: z.array(
        z.object({
          text: z.string(),
          icon: z.union([lucideIconSchema, simpleIconSchema]),
          link: z.string().url().optional(),
        }),
      ),
    }),
});

export const collections = {
  tags,
  posts,
  posts_es,
  projects,
  projects_es,
  other,
  other_es,
  quickInfo,
  quickInfo_es,
  socials,
  workExperience,
  workExperience_es,
};
