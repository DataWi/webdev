import { Course } from "@/pages/courses";
import { useRef } from "react";
import { Form, FloatingLabel, ButtonGroup, Button } from "react-bootstrap";
import { User } from "./usersList";

type UserDataFormProps = {
  user: User;
};

const UserDataForm = ({ user }: UserDataFormProps) => {
  const userEmailref = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {};
  const firstname = user.name.split(" ")[0];
  const lastname = user.name
    .split(" ")
    .map((name) => name)
    .slice(1)
    .join(" ");

  return (
    <Form onSubmit={() => submitHandler}>
      <Form.Group>
        <FloatingLabel
          controlId='floatingEmail'
          label='Email Address'
          className='mb-3'>
          <Form.Control
            type='email'
            placeholder={user.email}
            id='email'
            required
            ref={userEmailref}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId='floatingPassword'
          label='Password'
          className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            id='password'
            required
            ref={passwordRef}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId='floatingPasswordConfirm'
          label='Confirm Password'
          className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            id='confirmPassword'
            required
            ref={confirmPasswordRef}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId='floatingFirstName'
          label='First Name'
          className='mb-3'>
          <Form.Control
            type='text'
            placeholder={firstname}
            id='firstName'
            required
            ref={firstNameRef}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId='floatingLastName'
          label='Last Name'
          className='mb-3'>
          <Form.Control
            type='text'
            placeholder={lastname}
            id='lastName'
            required
            ref={lastNameRef}
          />
        </FloatingLabel>
      </Form.Group>
      <br />
      <ButtonGroup aria-label='Sign in'>
        <Button className='btn-outline-primary' variant='lightdark'>
          Update Account
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default UserDataForm;
