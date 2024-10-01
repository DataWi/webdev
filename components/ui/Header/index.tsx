import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSession, signOut } from "next-auth/react";
import Cart from "@/components/courses/cart";

export const Header = () => {
  // const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  const mockSession = { userId: 1, isAdmin: true };

  return (
    <Navbar className='bg-body-tertiary' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>EduQuest</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/courses'>Courses</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title='Menu' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/auth'>Login</NavDropdown.Item>
              {mockSession && (
                <NavDropdown.Item href={"/users/" + mockSession.userId}>
                  Account
                </NavDropdown.Item>
              )}
              {mockSession && (
                <NavDropdown.Item
                  href={"/users/" + mockSession.userId + "/courses"}>
                  My Learning
                </NavDropdown.Item>
              )}
              {mockSession && (
                <NavDropdown.Item onClick={handleSignOut} href='/logout'>
                  Logout
                </NavDropdown.Item>
              )}
              <Cart name='Cart' placement='end' />

              {mockSession && mockSession.isAdmin && (
                <NavDropdown.Item href='/users'>
                  User Management
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
