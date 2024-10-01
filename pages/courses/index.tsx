import { useEffect, useState } from "react";
import courses from "../../assets/course.json";
import { Col, Container, Row, Stack, Form } from "react-bootstrap";
import { CategoryChecks, CourseItem } from "@/components/courses/form";
import { useCart } from "@/components/courses/cartContext";

export type Course = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  price: number;
  category: string;
};
export type CategoryCheck = {
  checked: boolean;
  category: string;
};

export default function Courses() {
  const [courseList, setCourseList] = useState([] as Course[]);
  const [categories, setCategories] = useState([] as CategoryCheck[]);
  const { addToCart } = useCart()!;

  const handleCategoryChange = (category: string, check: boolean) => {
    const newCategories = categories.map((cat) =>
      cat.category === category ? { ...cat, checked: check } : cat
    );
    setCategories(newCategories);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = (e.target as HTMLInputElement).value;
    const courseListFiltered = courses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
    setCourseList(courseListFiltered);
  };

  useEffect(() => {
    if (categories.length === 0) {
      setCategories(
        courses
          .map((course) => ({ checked: false, category: course.category }))
          .reduce((acc, curr) => {
            if (!acc.find((cat) => cat.category === curr.category)) {
              acc.push(curr);
            }
            return acc;
          }, [] as CategoryCheck[])
      );
      setCourseList(courses);
      return;
    }

    if (categories.every((cat) => !cat.checked)) return setCourseList(courses);

    const courseListFiltered = courses.filter((course) =>
      categories.some((cat) => cat.checked && cat.category === course.category)
    );
    setCourseList(courseListFiltered);
  }, [categories]);

  return (
    <Container>
      <Row>
        <Col md={2} className='pt-5 mt-5'>
          <h2>Filter</h2>
          <Form>
            <Form.Control
              type='text'
              placeholder='Search'
              onChange={handleSearch}
            />
            <br />
            <CategoryChecks
              categories={categories}
              handleCategoryChange={handleCategoryChange}
            />
          </Form>
        </Col>
        <Col className='flex-grow-1'>
          <Stack gap={2}>
            {courseList.map((course) => CourseItem(course, addToCart))}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
