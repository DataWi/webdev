import { Container } from "react-bootstrap";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/pages/courses";
import Courses from "../../../../assets/course.json";
import Users from "../../../../assets/users.json";
import { User } from "@/components/users/usersList";
import Link from "next/link";

export default function MyCourses() {
  const pathname = usePathname()!;
  const userId = typeof pathname === "string" ? pathname.split("/")[2] : "";
  // let userId = "";
  // console.log(userId);
  const [courseList, setCourseList] = useState([] as Course[]);

  useEffect(() => {
    if (!userId) return;
    const user = Users.find((user) => user.id === Number(userId)) as
      | User
      | undefined;
    if (!user) redirect("/404");

    const courses = Courses.filter((course) =>
      user.ownedCourseIds.includes(course.id)
    );

    setCourseList(courses);
  }, [userId]);

  return (
    <Container className='mt-2 py-5 text-center'>
      <h1>Continue with learning</h1>
      <div className='d-flex flex-wrap justify-content-center'>
        {courseList.map((course) => (
          <div key={course.id} className='m-2'>
            <img
              src={course.imageUrl}
              alt={course.title}
              style={{ width: "200px", height: "200px" }}
            />
            <h3>{course.title}</h3>
            <Link href={"/users/" + userId + "/courses/" + course.id}>
              View Course
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
