import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc").min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
