import { Container, ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Course } from "@/pages/courses";
import Courses from "../../../../assets/course.json";
import Link from "next/link";
import {
  UserContextProvider,
  useUser,
} from "@/components/users/singleUserContext";

export default function MyCourses() {
  const { user, findUser, isLoading } = useUser();
  // console.log(userId);
  const [courseList, setCourseList] = useState([] as Course[]);

  useEffect(() => {
    if (!user) {
      findUser();
      return;
    }

    const courses = Courses.filter((course) =>
      user!.ownedCourseIds.includes(course.id)
    );

    setCourseList(courses);
  }, [user]);

  return (
    <UserContextProvider>
      <Container className='mt-2 py-5 text-center'>
        <h1>Continue with learning</h1>
        {isLoading && !user ? (
          <h2>Loading...</h2>
        ) : (
          <div className='d-flex flex-wrap justify-content-center'>
            {courseList.map((course) => (
              <div key={course.id} className='m-2'>
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  style={{ width: "200px", height: "200px" }}
                />
                <h3>{course.title}</h3>
                <ProgressBar
                  now={50}
                  striped
                  variant='success'
                  label={`Progress: 60 %`}
                />
                <Link href={"/users/" + user!.id + "/courses/" + course.id}>
                  View Course
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </UserContextProvider>
  );
}
