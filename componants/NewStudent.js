import { Modal, TextInput, Button } from "@mantine/core";

export default function NewStudent({ opened, setOpened }) {
  return (
    
      <Modal
        title="Add New Student"
        opened={opened}
        onClose={() => setOpened(false)}
        size="xs"
        centered
      >
        <div style={{ padding: 20 }}>
          <TextInput
            placeholder="ex : Shikari Sohan"
            label="Student Name"
          />
          <TextInput placeholder="ex : 2018331068" label="Registration No" />
          <Button
            size="xs"
            sx={{ marginTop: 10 }}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Add Student
          </Button>
        </div>
      </Modal>
  );
}
