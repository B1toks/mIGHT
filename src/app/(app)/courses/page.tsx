import CourseCard from "@/components/courses/CourseCard";
import { COURSES } from "@/data/mock";

// «Мої курси»: сітка 3×N карток. Server Component — даним нема
// причини їхати на клієнт, інтерактивності тут нуль.
export default function MyCoursesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Мої курси</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
