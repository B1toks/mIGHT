"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterValues,
} from "@/lib/validation/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FieldError from "@/components/auth/FieldError";

// Спільна форма для обох реєстрацій: макет має окремі екрани
// "registration student" і "registration teacher", але відрізняються
// вони одним полем (група vs кафедра) — тому компонент один, роль пропом.
export default function RegisterForm({ role }: { role: "student" | "teacher" }) {
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema(role)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      group: "",
      department: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterValues) => {
    setFormError(null);

    // TODO(backend): тут буде виклик реєстрації (Supabase Auth signUp
    // або ендпоінт NestJS). Поки що — імітуємо успіх і ведемо на логін.
    void values;
    router.push("/login");
  };

  const isStudent = role === "student";

  return (
    <Card className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-xl">
      <CardHeader className="space-y-1">
        <h1 className="text-center text-2xl font-semibold">
          Реєстрація {isStudent ? "студента" : "викладача"}
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          {isStudent
            ? "Створіть акаунт, щоб приєднатися до своїх курсів"
            : "Створіть акаунт, щоб вести курси та журнал"}
        </p>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {formError && (
            <Alert variant="destructive">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Ім&rsquo;я</Label>
              <Input id="firstName" autoComplete="given-name" {...register("firstName")} />
              <FieldError message={errors.firstName?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Прізвище</Label>
              <Input id="lastName" autoComplete="family-name" {...register("lastName")} />
              <FieldError message={errors.lastName?.message} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
            />
            <FieldError message={errors.email?.message} />
          </div>

          {isStudent ? (
            <div className="space-y-2">
              <Label htmlFor="group">Група</Label>
              <Input id="group" placeholder="Напр. КН-21" {...register("group")} />
              <FieldError message={errors.group?.message} />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="department">Кафедра</Label>
              <Input
                id="department"
                placeholder="Напр. Комп'ютерні науки"
                {...register("department")}
              />
              <FieldError message={errors.department?.message} />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />
            <FieldError message={errors.password?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Підтвердження пароля</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
            <FieldError message={errors.confirmPassword?.message} />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Зареєструватися
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Вже є акаунт?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Увійти
            </Link>
            {" · "}
            <Link
              href={isStudent ? "/register/teacher" : "/register/student"}
              className="text-blue-600 hover:underline"
            >
              Я {isStudent ? "викладач" : "студент"}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
