import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterStudentPage() {
  return (
    <AuthShell>
      <RegisterForm role="student" />
    </AuthShell>
  );
}
