import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { Accordion, TypographyStylesProvider } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import CenteredContainer from "../componants/CenteredContainer";
import Link from "next/link";
import { useRouter } from "next/router";
export default function StreamStudent({ stream }) {
  const router = useRouter();
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
        <Button
          color="red"
          onClick={() => {
            router.push(`/task/${stream._id}`);
          }}
        >
          See task
        </Button>
      </Card>
    </div>
  );
}

