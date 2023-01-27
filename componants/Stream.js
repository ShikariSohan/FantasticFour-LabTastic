import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Accordion } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import CenteredContainer from "../componants/CenteredContainer";
import Link from 'next/link'

export default function Stream(props) {
  return (
    <div style={{
        
        display: "flex",
        justifyContent: "center"
      }}>
        <Card shadow="s"  p="lg" radius="md" withBorder>
        <Card.Section>
            <iframe 
            src="https://firebasestorage.googleapis.com/v0/b/labtastic-bb2ce.appspot.com/o/1674821547540.mp4?alt=media&token=324947d6-809f-4df9-81fc-397828c5b18e"
            height={400}
            width={800}
            allowFullScreen
            />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>props.caption</Text>
            <Badge color="cyan" variant="light">
            <Link href='https://firebasestorage.googleapis.com/v0/b/labtastic-bb2ce.appspot.com/o/1674821547540.mp4?alt=media&token=324947d6-809f-4df9-81fc-397828c5b18e' download>
            Download Video
            </Link>
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