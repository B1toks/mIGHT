import { z } from "zod";

// Схеми валідації auth-форм. Єдине джерело правди для фронта;
// коли з'явиться бек — ці ж правила продублюються там (валідація
// на клієнті — це UX, валідація на сервері — це безпека).

// У макеті поле називається «Логін» — приймаємо і логін, і email;
// розрулювання відбудеться на беку.
export const loginSchema = z.object({
  login: z.string().min(1, "Вкажіть логін"),
  password: z.string().min(1, "Вкажіть пароль"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = (role: "student" | "teacher") =>
  z
    .object({
      firstName: z.string().min(2, "Вкажіть ім'я"),
      lastName: z.string().min(2, "Вкажіть прізвище"),
      email: z.string().min(1, "Вкажіть email").email("Невірний формат email"),
      group: z.string().optional(),
      department: z.string().optional(),
      password: z.string().min(8, "Мінімум 8 символів"),
      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (role === "student" && !data.group?.trim()) {
        ctx.addIssue({ code: "custom", path: ["group"], message: "Вкажіть групу" });
      }
      if (role === "teacher" && !data.department?.trim()) {
        ctx.addIssue({ code: "custom", path: ["department"], message: "Вкажіть кафедру" });
      }
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          message: "Паролі не збігаються",
        });
      }
    });

export type RegisterValues = z.infer<ReturnType<typeof registerSchema>>;

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Вкажіть email").email("Невірний формат email"),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
