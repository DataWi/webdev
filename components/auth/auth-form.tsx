import { useState, useRef, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

async function createUser(email: string, password: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export default function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail: string = emailInputRef.current
      ? emailInputRef.current.value
      : "";
    const enteredPassword: string = passwordInputRef.current
      ? passwordInputRef.current.value
      : "";

    // optional: Add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (result && !result.error) {
        // set some auth state
        router.replace("/users/");
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6}>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <FloatingLabel
                controlId='floatingEmail'
                label='Email Address'
                className='mb-3'>
                <Form.Control
                  type='email'
                  placeholder='Email Address'
                  id='email'
                  required
                  ref={emailInputRef}
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
                  ref={passwordInputRef}
                />
              </FloatingLabel>
            </Form.Group>
            {!isLogin && (
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
                    ref={confirmPasswordInputRef}
                  />
                </FloatingLabel>
              </Form.Group>
            )}
            <br />
            <ButtonGroup aria-label='Sign in'>
              <Button className='btn-outline-primary' variant='lightdark'>
                {isLogin ? "Login" : "Create Account"}
              </Button>
              <Button
                variant='white'
                className='btn-outline-secondary'
                onClick={switchAuthModeHandler}>
                {isLogin ? "Create new account" : "Login with existing account"}
              </Button>
            </ButtonGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
