import UsersList from "@/components/users/usersList";
import Users from "../../assets/users.json";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { User } from "@/components/users/usersList";

export default function Home() {
  const [usersList, setUserslist] = useState([] as User[]);

  useEffect(() => {
    setUserslist(Users);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = (e.target as HTMLInputElement).value;
    const usersListFiltered = Users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setUserslist(usersListFiltered);
  };

  return (
    <Container className='mt-2'>
      <Row className='m-2'>
        <Col md='auto'>
          <h2>Filter</h2>
        </Col>
        <Col>
          <Form>
            <Form.Control
              type='text'
              placeholder='Search'
              onChange={handleSearch}
            />
            <br />
          </Form>
        </Col>
      </Row>
      <UsersList users={usersList} />
    </Container>
  );
}
