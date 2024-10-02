import { Course } from "@/pages/courses";
import { useState } from "react";
import { Button, Container, Form, NavDropdown, Stack } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useCart } from "./cartContext";

interface CartProps {
  name: string;
  [key: string]: any;
}

export default function Cart({ name, ...props }: CartProps) {
  const [show, setShow] = useState(false);
  const { cartItems, removeFromCart, price } = useCart()!;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item onClick={handleShow} className='me-2'>
        {name}
      </NavDropdown.Item>
      <Offcanvas
        style={{ overflow: "scroll" }}
        scroll={true}
        backdrop={false}
        show={show}
        onHide={handleClose}
        {...props}>
        <Container>
          <Form>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <hr />
            <Offcanvas.Body>
              <Stack>
                {cartItems.map((item) => CartItem(item, removeFromCart))}
              </Stack>
            </Offcanvas.Body>
            <br />
            <Stack direction='horizontal'>
              <h3>Total: {price} €</h3>
              <Button
                type='button'
                variant='outline-primary'
                className='ms-auto'>
                Checkout
              </Button>
            </Stack>
          </Form>
        </Container>
      </Offcanvas>
    </>
  );
}

const CartItem = (course: Course, handleRemove: (id: number) => void) => (
  <div key={course.id} className='d-flex flex-column justify-content-between'>
    <h3>{course.title}</h3>
    <p className='text-secondary'>{course.instructor}</p>
    <p className='fs-5 text-muted'>{course.price} €</p>
    <Button variant='outline-danger' onClick={() => handleRemove(course.id)}>
      Remove
    </Button>
    <hr />
  </div>
);
