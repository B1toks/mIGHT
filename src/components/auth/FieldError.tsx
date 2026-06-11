// Підпис помилки під полем форми — єдиний стиль для всіх auth-екранів.
export default function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-500">{message}</p>;
}
