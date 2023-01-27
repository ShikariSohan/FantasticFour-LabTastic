import { Card, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";

export default function CourseCard(props) {
  const router = useRouter();
  const { course } = props;

  return (
    <>
      <Card
        shadow="xl"
        p="xl"
        radius="lg"
        component="a"
        target="_blank"
        withBorder
        sx={{
          width: 300,
          margin: 20,
          minHeight: 320,
          maxHeight: 320,
          border: "1.5px solid blue",
          "&:hover": {
            transform: "scale(1.10)",
            transition: "0.2s ease-in-out",
            border: "2px solid blue",
          },
        }}
        onClick={() => {
          if (props.isTeacher) router.push(`/courses/${course._id}`);
          else router.push(`/student/${course._id}`);
        }}
      >
        <Card.Section>
          <Image src={`\\${course.subject}.jpg`} height={160} alt="No way!" />
        </Card.Section>

        <Text weight={800} size="lg" mt="md">
          {course.name}
        </Text>
        <Text weight={600} size="md" mt="md">
          {course.subject}
        </Text>
        <Text weight={400} size="sm" mt="md">
          {course.session}
        </Text>
      </Card>
    </>
  );
}
