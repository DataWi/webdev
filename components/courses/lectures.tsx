import { useEffect, useState } from "react";
import Lectures from "../../assets/lectures.json";
import { Accordion, Container, Form, Stack } from "react-bootstrap";

type Section = {
  sectionName: string;
  index: number;
  lectures: Lecture[];
};

type LectureList = {
  courseId: number;
  lastOpened: number;
  sections: Section[];
};

type Lecture = {
  lectureName: string;
  lectureUrl: string;
  index: number;
  completed: boolean;
};

export default function LectureList({ courseId }: { courseId: number }) {
  const [sections, setSections] = useState([] as Section[]);
  const [lastOpened, setLastOpened] = useState(0);

  const handleChange = (sectionIndex: number, lectureIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].lectures[lectureIndex].completed =
      !newSections[sectionIndex].lectures[lectureIndex].completed;
    setSections(newSections);
  };

  useEffect(() => {
    const sectionList = (Lectures as LectureList[]).find(
      (course) => course.courseId === courseId
    );
    if (!sectionList) return;
    setLastOpened(sectionList.lastOpened);
    setSections(sectionList.sections);
  }, []);

  return (
    <Container>
      <h3>Course Content</h3>
      <hr />
      <Accordion defaultActiveKey={lastOpened.toString()}>
        <Form>
          {sections.map((section, sectionIndex) => (
            <Accordion.Item
              eventKey={sectionIndex.toString()}
              key={sectionIndex}>
              <Accordion.Header>{section.sectionName}</Accordion.Header>
              <Accordion.Body>
                <Stack>
                  {section.lectures.map((lecture, lectureIndex) => (
                    <Lectureitem
                      lecture={lecture}
                      handleChange={() =>
                        handleChange(sectionIndex, lectureIndex)
                      }
                    />
                  ))}
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Form>
      </Accordion>
    </Container>
  );
}

type LectureitemProps = {
  lecture: Lecture;
  handleChange: () => void;
};

const Lectureitem = ({ lecture, handleChange }: LectureitemProps) => (
  <Form.Check
    type='checkbox'
    id={lecture.lectureName + lecture.index}
    label={lecture.lectureName}
    checked={lecture.completed}
    onChange={() => handleChange()}
  />
);
