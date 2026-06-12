// Лейаут auth-зони — прозорий: логін малює власний повноекранний
// спліт (макети registration student/teacher), решта сторінок
// центрується через <AuthShell>.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
