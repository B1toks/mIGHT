"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/store/authSlice";
import { USERS } from "@/lib/constants";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const rememberMe = watch("rememberMe");

  useEffect(() => {
    const remembered = localStorage.getItem("rememberedUser");
    if (remembered) {
      setValue("email", remembered);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = (values: LoginValues) => {
    setFormError(null);

    // TODO(backend): замінити на Supabase Auth signInWithPassword.
    // Тимчасовий міст до демо-механізму (USERS + Redux), щоб застосунок
    // лишався клікабельним, поки бек не готовий: email "student@..."
    // з паролем "student" тощо.
    const username = values.email.split("@")[0];
    const user = USERS[username as keyof typeof USERS];
    if (user && user.password === values.password) {
      dispatch(login({ username, role: user.role }));
      if (values.rememberMe) {
        localStorage.setItem("rememberedUser", values.email);
      } else {
        localStorage.removeItem("rememberedUser");
      }
      router.push("/dashboard");
    } else {
      setFormError("Невірний email або пароль.");
    }
  };

  return (
    <Card className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-xl">
      <CardHeader className="space-y-1">
        <h1 className="text-center text-2xl font-semibold">Вхід</h1>
        <p className="text-center text-sm text-muted-foreground">
          Увійдіть до свого кабінету mIGHT
        </p>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {formError && (
            <Alert variant="destructive">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Забули пароль?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Ваш пароль"
              autoComplete="current-password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) =>
                setValue("rememberMe", Boolean(checked))
              }
            />
            <Label htmlFor="remember">Запам&rsquo;ятати мене</Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Увійти
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Немає акаунта?{" "}
            <Link
              href="/register/student"
              className="text-blue-600 hover:underline"
            >
              Реєстрація студента
            </Link>{" "}
            ·{" "}
            <Link
              href="/register/teacher"
              className="text-blue-600 hover:underline"
            >
              викладача
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
