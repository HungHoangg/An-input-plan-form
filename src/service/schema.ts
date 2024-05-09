import { z, ZodSchema } from "zod";
import { AWING_FORM } from "./type";

export const PostInputSchema: ZodSchema<AWING_FORM> = z.object({
  information: z.object({
    name: z.string().min(1, "Dữ liệu không hợp lệ."),
    describe: z.string().optional(),
  }),
  subCampaigns: z
    .object({
      name: z.string().min(1, "Dữ liệu không hợp lệ."),
      status: z.boolean(),
      ads: z
        .object({
          name: z.string().min(1, ""),
          quantity: z
            .number({
              required_error: "",
              invalid_type_error: "",
            })
            .positive(""),
        })
        .array(),
    })
    .array(),
});

export type PostInput = z.infer<typeof PostInputSchema>;
