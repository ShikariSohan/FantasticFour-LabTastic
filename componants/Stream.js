import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Accordion } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import CenteredContainer from "../componants/CenteredContainer";

export default function Stream(props) {
  return (
    <div style={{
        
        display: "flex",
        justifyContent: "center"
      }}>
        <Card shadow="s"  p="lg" radius="md" withBorder>
        <Card.Section>
            <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={360}
            width={800}
            alt="Thumbnail"
            />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>props.caption</Text>
            <Badge color="cyan" variant="light">
            Visit Link
            </Badge>
        </Group>

        <Text size="sm" color="dimmed">
            Learn it fast buddys, exam is tomorrow
        </Text>

        <Accordion chevronPosition="left" defaultValue="See quizes">
        <Accordion.Item value="customization">
            <Accordion.Control>See quizes</Accordion.Control>
            <Accordion.Panel>----Table of quize----</Accordion.Panel>
        </Accordion.Item>
        </Accordion>

        </Card>
    </div>
  );
}