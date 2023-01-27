import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { Accordion ,TypographyStylesProvider} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import CenteredContainer from "../componants/CenteredContainer";
import Link from "next/link";

export default function Stream({ stream }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card shadow="s" p="lg" radius="md" withBorder>
        <Card.Section>
          <iframe src={stream.url} height={400} width={800} allowFullScreen />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{stream.name}</Text>
          <Badge color="cyan" variant="light">
            <Link href={stream.url} download>
              Download Video
            </Link>
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          <TypographyStylesProvider>
            <div
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(stream.instruction),
              }}
            />
          </TypographyStylesProvider>
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
