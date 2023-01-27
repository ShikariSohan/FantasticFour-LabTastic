import { Modal } from "@mantine/core";
import { Title } from "@mantine/core";
import { Text } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskScoreModel({ opened, setOpened, score }) {

  return (
    <Modal
      title="Score Show"
      opened={opened}
      onClose={() => setOpened(false)}
      size="xl"
      centered
    >
      <Title order={3}>Score Show - </Title>
      <Text>Your score is {score}!!</Text>
    </Modal>
  );
}
