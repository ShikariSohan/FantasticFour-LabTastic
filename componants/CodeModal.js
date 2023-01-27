import { Modal } from "@mantine/core";
import { Title } from "@mantine/core";
import { Text, mark } from "@mantine/core";
export default function CodeModal({ opened, setOpened,code }) {
  return (
    <Modal
      title="Invite Class Code"
      opened={opened}
      onClose={() => setOpened(false)}
      size="xs"
      centered
    >
      <Title order={3}>Class Code:</Title>
      <Text size="xl" weight={800} mark  color="blue.5">
        {code}
      </Text>
    </Modal>
  );
}
