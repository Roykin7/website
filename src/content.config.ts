import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    department: z.string(),
    location: z.string(),
    reportsTo: z.string(),
    employmentType: z.enum(['VOLUNTEER', 'FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN', 'OTHER']),
    status: z.enum(['open', 'closed']),
    postedDate: z.coerce.date(),
    applyEmail: z.string(),
    pdfHref: z.string(),
    summary: z.string(),
    applySteps: z.array(z.string()),
    sendWith: z.array(z.string()),
  }),
});

export const collections = { jobs };
