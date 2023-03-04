import { z } from 'zod'

const ZJsonUpload = z.object({
  scopeI: z
    .object({
      groupKey: z.string(),
      groupName: z.string(),
      dataSource: z
        .object({
          key: z.string(),
          sourceName: z.string(),
          gwp: z.string(),
          yearlyAmount: z.number().min(0),
          ar5: z.number().min(0),
          co2e: z.number().min(0),
          carbonTonsPerYear: z.number().min(0),
          period: z.union([
            z.literal('yearly'),
            z.literal('monthly'),
            z.literal('hourly'),
          ]),
          monthlyAmount: z.number().min(0).array().length(12),
          hourlyAmount: z.number().min(0),
          unit: z.union([
            z.literal('kg'),
            z.literal('tons'),
          ]),
        })
        .array(),
    })
    .array(),
  scopeII: z.object({}).array(),
  info: z.object({
    title: z.string(),
    content: z.string(),
    companyCategory: z.string(),
  }),
})
