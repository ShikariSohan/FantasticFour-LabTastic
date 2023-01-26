import { useState } from "react";
import { PasswordInput, Tooltip } from "@mantine/core";
export default function InputPassword(props) {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const valid = value.trim().length >= 6;
  const {onChange} = props;
  return (
    <>
      <Tooltip
        label={
          valid ? "All good!" : "Password must include at least 6 characters"
        }
        position="bottom-start"
        withArrow
        opened={opened}
        color={valid ? "teal" : undefined}
      >
        <PasswordInput
          label="Password"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-key"
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
              <circle cx="8" cy="15" r="4" />
              <line x1="10.85" y1="12.15" x2="19" y2="4" />
              <line x1="18" y1="5" x2="20" y2="7" />
              <line x1="15" y1="8" x2="17" y2="10" />
            </svg>
          }
          placeholder="Your password"
          onFocus={() => setOpened(true)}
          onBlur={() => setOpened(false)}
          mt="md"
          value={value}
          sx={{ width: 350 }}
          name="password"
          onChange={(event) =>{
            setValue(event.currentTarget.value)
            onChange(event)
          }}
        />
      </Tooltip>
    </>
  );
}
