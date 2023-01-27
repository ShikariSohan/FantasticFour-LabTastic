import { Modal } from "@mantine/core";
import { Title } from "@mantine/core";
import { Text } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
export default function TaskScoreModel({ opened, setOpened, id }) {
  const [score, setScore] = useState(0);
  let data = {
    name: "abul",
    email: "abul@gmail.com",
    score: "2",
  };

  return (
    <Modal
      title="Invite Class Code"
      opened={opened}
      onClose={() => setOpened(false)}
      size="xl"
      centered
    >
      <Title order={3}>Completed Task List - </Title>
      <p>
        Name : {data.name} {"    "}email :{data.email} {"    "} Score :{ data.score}
      </p>
    </Modal>
  );
}
