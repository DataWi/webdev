import { useEffect, useState } from "react";
import Courses from "../../../../../assets/course.json";
import { useRouter, usePathname } from "next/navigation";
import { Course } from "../../../../courses";
import { Col, Container, Row, Stack } from "react-bootstrap";
import LectureList from "@/components/courses/lectures";
import { useUser } from "@/components/users/singleUserContext";

export default function Home() {
  const pathName = usePathname()!;
  const courseId = typeof pathName === "string" ? pathName.split("/")[4] : "";
  const [course, setCourse] = useState({} as Course);
  const router = useRouter();
  const { findUser } = useUser();

  useEffect(() => {
    findUser();
    if (!courseId) return;
    const course = Courses.find((course) => course.id === Number(courseId));
    if (!course) return router.push("/404");
    setCourse(course);
  }, [courseId]);

  return (
    <Container className='mt-2'>
      <Row>
        <Col md={8}>
          <Stack>
            <video
              src={course.imageUrl}
              controls
              style={{ width: "100%", height: "auto" }}
            />
            <h1>{course.title}</h1>
            <p>{course.description}</p>
          </Stack>
        </Col>
        <Col>
          <LectureList courseId={course.id} />
        </Col>
      </Row>
    </Container>
  );
}
