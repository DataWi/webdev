import { useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import PurchaseList from "@/components/courses/purchase";
import AuthForm from "@/components/auth/auth-form";
import {
  UserContextProvider,
  useUser,
} from "@/components/users/singleUserContext";

const Content = () => {
  const { user, isLoading } = useUser();
  const [show, setShow] = useState(false);

  const handleSubmit = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6}>
          <h1>Account Information</h1>
          <Button variant='outline-primary' onClick={() => handleShow()}>
            Show / Edit
          </Button>

          <Modal show={show} onHide={handleClose}>
            <AuthForm inModal={true} />
          </Modal>
        </Col>
      </Row>
      <hr />
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6}>
          <h1>Purchases</h1>
          {!isLoading && user ? (
            <PurchaseList purchaseIds={user.purchaseIds} />
          ) : (
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default function Home() {
  return (
    <UserContextProvider>
      <Content />
    </UserContextProvider>
  );
}
