import { redirect, usePathname } from "next/navigation";
import Users from "../../../assets/users.json";
import { useEffect, useState } from "react";
import { User } from "@/components/users/usersList";
import { Container, Form } from "react-bootstrap";

export default function Home() {
  console.log("RENDERING");
  const [user, setUser] = useState({} as User);
  const pathname = usePathname()!;

  const userId = typeof pathname === "string" ? pathname.split("/")[2] : "";

  useEffect(() => {
    if (!userId) return;
    const user = Users.find((user) => user.id === Number(userId));
    if (!user) redirect("/404");
    setUser(user);
  }, [userId]);

  return (
    <Container className='mt-2'>
      <Form>
        <h1>Edit Data</h1>
        <Form.Control value={user.name} />
        <Form.Control value={user.email} />
        {/* <Form.Control value={user.admin} /> */}
      </Form>
    </Container>
  );
}
