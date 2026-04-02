import { z } from 'zod';

export const GetSnapshotsSchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000),
});

export const CategoryType = z.enum(['income', 'expense']);

export const CreateCategorySchema = z.object({
  name: z.string().min(1),
  type: CategoryType,
  icon: z.string().min(1),
  defaultBudget: z.number().positive().optional().nullable(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
  type: CategoryType,
  defaultBudget: z.number().nullable(),
  transactionCount: z.number(),
  totalSpend: z.number(),
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const CategorySnapshotSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  name: z.string(),
  icon: z.string(),
  type: CategoryType,
  budget: z.number().nullable(),
  totalSpend: z.number(),
  transactionCount: z.number(),
  month: z.number(),
  year: z.number(),
});

export type GetSnapshotsDto = z.infer<typeof GetSnapshotsSchema>;
export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
export type CategoryDto = z.infer<typeof CategorySchema>;
export type CategorySnapshotDto = z.infer<typeof CategorySnapshotSchema>;