import { redirect } from "next/navigation";

// /courses/[id]/topic без номера теми — ведемо на першу тему.
export default async function TopicIndexPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/courses/${id}/topic/1`);
}
