import { Course } from "@/pages/courses";
import Courses from "../../assets/course.json";
import { Accordion, Col, Container, Row, Stack } from "react-bootstrap";
import { CourseItem } from "../courses/form";
import Link from "next/link";

export type User = {
  id: number;
  ownedCourseIds: number[];
  name: string;
  email: string;
  admin: boolean;
  purchaseIds: number[];
  cart: Course[];
};

type UsersListProps = {
  users: User[];
};

export default function UsersList({ users }: UsersListProps) {
  return (
    <Accordion>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </Accordion>
  );
}

type UserItemProps = {
  user: User;
};

const UserItem = ({ user }: UserItemProps) => {
  const courses = [] as Course[];

  user.ownedCourseIds.forEach((courseId) => {
    const course = Courses.find((course) => course.id === courseId);
    if (course) {
      courses.push(course);
    }
  });

  return (
    <Accordion.Item eventKey={user.id.toString()}>
      <Accordion.Header>
        {user.admin ? "👑 Admin " : ""}
        {user.name}
      </Accordion.Header>
      <Accordion.Body>
        <Container fluid>
          <Row>
            <Col>
              <p>
                <strong>Id:</strong> {user.id}
              </p>
            </Col>
            <Col xs={6}>
              <p>
                <strong>Name:</strong> {user.email}
              </p>
            </Col>
            <Col>
              <Link href={`/users/${user.id}/`}> Edit User </Link>
            </Col>
          </Row>
          <h4>Courses:</h4>
          <Stack gap={1}>{courses.map((course) => CourseItem(course))}</Stack>
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
};
