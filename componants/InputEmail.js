import { TextInput, Tooltip, Center, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { IconAt } from "@tabler/icons";

export default function Inputemail(props) {
  const rightSection = (
    <Tooltip
      label="We store your data securely"
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
          class="icon icon-tabler icon-tabler-at"
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
          <circle cx="12" cy="12" r="4" />
          <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
        </svg>
      }
      mt="md"
      label="Email"
      placeholder="Your email"
      sx={{ width: 350 }}
      name = "email"
      onChange={ (e)=>{
        onChange(e);
      }}
    />
  );
}
