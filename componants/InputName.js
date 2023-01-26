import { TextInput, Tooltip, Center, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { IconAt } from "@tabler/icons";

export default function Inputemail(props) {
  const rightSection = (
    <Tooltip
      label="Please enter your name"
      position="top-end"
      withArrow
      transition="pop-bottom-right"
    >
      <Text color="dimmed" sx={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle size={18} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );
  const {onChange} = props;
  return (
    <TextInput
      rightSection={rightSection}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-letter-n"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 20v-16l10 16v-16" />
        </svg>
      }
      mt="md"
      label="Name"
      placeholder="Your name"
      sx={{ width: 350 }}
      name="name"
      onChange={(e)=>{
        onChange(e);
      }}
    />
  );
}
