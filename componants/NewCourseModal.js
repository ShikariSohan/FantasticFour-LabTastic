import { Modal, TextInput, Button, Group } from "@mantine/core";
import { forwardRef } from "react";
import { Avatar, Text, Select } from "@mantine/core";
import { useState } from "react";
const data = [
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    label: "Physics",
    value: "physics",
  },

  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "Biology",
    value: "biology",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "Chemistry",
    value: "chemistry",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
    label: "Mathematics",
    value: "mathematics",
  },
];
const SelectItem = forwardRef(
  ({ image, label, description, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

export default function NewCourseModal({ opened, setOpened }) {
  const [classroom, setClassroom] = useState({
    name: "",
    session: "",
    subject: "",
    code: "123123",
  });
  return (
    <Modal
      title="Add New Classroom"
      opened={opened}
      onClose={() => setOpened(false)}
      size="xs"
      centered
    >
      <div style={{ padding: 20 }}>
        <TextInput
          placeholder="ex : Ratan Sir Biology Lab"
          label="Classroom Title"
          onChange={(e) => {
            setClassroom({ ...classroom, name: e.target.value });
          }}
        />
        <TextInput
          placeholder="ex : 2018-19"
          label="Session"
          onChange={(e) => {
            setClassroom({ ...classroom, session: e.target.value });
          }}
        />
        <Select
          label="Choose A Subject"
          placeholder="Pick one"
          itemComponent={SelectItem}
          data={data}
          searchable
          maxDropdownHeight={400}
          nothingFound="Nobody here"
          filter={(value, item) =>
            item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.description.toLowerCase().includes(value.toLowerCase().trim())
          }
          onChange={(value) => {
            setClassroom({ ...classroom, subject: value });
          }}
        />
        <Group position="right">
          <Button
            size="xs"
            sx={{ marginTop: 30 }}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            onClick={() => {
              console.log(classroom);
            }}

          >
            Add Course
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
