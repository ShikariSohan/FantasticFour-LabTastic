import { Modal } from "@mantine/core";
import { Title } from "@mantine/core";
import { Text } from "@mantine/core";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons";

export default function LabSelectModal({ opened, setOpened, subject }) {
  const labs = {
    physics: ["Physics Lab 1", "Physics Lab 2", "P Lab 3"],
    chemistry: ["Lab 1", "P Lab 2", "Lab 3"],
    biology: ["Lab 1", "Lab 2", "Lab 3"],
  };

  return (
    <Modal
      title="Select Lab To Demonstrate :"
      opened={opened}
      onClose={() => setOpened(false)}
      size="lg"
      withPadding
      centered
    >
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        {labs[subject] == undefined ? (
          <List.Item>No Labs Available</List.Item>
        ) : (
          labs[subject].map((lab) => {
            return <List.Item>{lab}</List.Item>;
          })
        )}
      </List>
    </Modal>
  );
}
