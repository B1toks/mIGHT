import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterTeacherPage() {
  return (
    <AuthShell>
      <RegisterForm role="teacher" />
    </AuthShell>
  );
}
