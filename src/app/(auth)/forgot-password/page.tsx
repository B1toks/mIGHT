"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validation/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = () => {
    // TODO(backend): resetPasswordForEmail — лист зі скиданням пароля.
    // Важливо: і зараз, і з беком показуємо той самий успішний стан
    // незалежно від існування email — щоб не розкривати, хто зареєстрований.
    setSent(true);
  };

  if (sent) {
    return (
      <Card className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-xl">
        <CardHeader>
          <h1 className="text-center text-2xl font-semibold">Перевірте пошту</h1>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            Якщо акаунт <span className="font-medium">{getValues("email")}</span>{" "}
            існує, ми надіслали на нього лист з інструкціями для відновлення
            пароля.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/login" className="text-sm text-blue-600 hover:underline">
            Повернутися до входу
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-xl">
      <CardHeader className="space-y-1">
        <h1 className="text-center text-2xl font-semibold">
          Відновлення пароля
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          Вкажіть email — надішлемо інструкції
        </p>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
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
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Надіслати
          </Button>
          <Link href="/login" className="text-sm text-blue-600 hover:underline">
            Повернутися до входу
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
