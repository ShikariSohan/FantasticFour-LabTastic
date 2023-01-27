import Head from "next/head";
import { Button, Card, Stack, Text, Dialog, Alert } from "@mantine/core";
import styles from "../styles/Home.module.css";
import { Tabs } from "@mantine/core";
import InputEmail from "../componants/InputEmail";
import InputPassword from "../componants/InputPassword";
import InputName from "../componants/InputName";
import Logo from "../componants/Logo";
import CenteredContainer from "../componants/CenteredContainer";
import Image from "next/image";
import { Radio } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { IconAlertCircle } from "@tabler/icons";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthProvider";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

export default function Home() {
  const router = useRouter();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "default.png",
    role: "student",
  });
  const onChangeLogin = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const onChangeSignup = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };
  const loginSubmit = async () => {
    try {
      await axios.post("/api/auth/login", loginInfo).then(function (res) {
        console.log(res.data);
        const userData = {
          isLoggedIn: true,
          ...res.data.data,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/");
      });
    } catch (e) {
      console.log(e);
      setLoginError(true);
    }
  };

  const signupSubmit = async () => {
    await axios
      .post("/api/auth/signup", signupInfo)
      .then(function (res) {
        if (res.status === 201) {
          console.log(res.data);
        }
        window.location.reload();
      })
      .catch(function (e) {
        console.log(e);
        setLoginError(true);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage:
          "linear-gradient(135deg, rgba(186, 186, 186, 0.03) 0%, rgba(186, 186, 186, 0.03) 10%,rgba(133, 133, 133, 0.03) 10%, rgba(133, 133, 133, 0.03) 14%,rgba(38, 38, 38, 0.03) 14%, rgba(38, 38, 38, 0.03) 17%,rgba(93, 93, 93, 0.03) 17%, rgba(93, 93, 93, 0.03) 25%,rgba(80, 80, 80, 0.03) 25%, rgba(80, 80, 80, 0.03) 45%,rgba(239, 239, 239, 0.03) 45%, rgba(239, 239, 239, 0.03) 100%),linear-gradient(135deg, rgba(236, 236, 236, 0.03) 0%, rgba(236, 236, 236, 0.03) 47%,rgba(182, 182, 182, 0.03) 47%, rgba(182, 182, 182, 0.03) 63%,rgba(223, 223, 223, 0.03) 63%, rgba(223, 223, 223, 0.03) 81%,rgba(86, 86, 86, 0.03) 81%, rgba(86, 86, 86, 0.03) 89%,rgba(23, 23, 23, 0.03) 89%, rgba(23, 23, 23, 0.03) 90%,rgba(226, 226, 226, 0.03) 90%, rgba(226, 226, 226, 0.03) 100%),linear-gradient(45deg, rgba(52, 52, 52, 0.03) 0%, rgba(52, 52, 52, 0.03) 31%,rgba(246, 246, 246, 0.03) 31%, rgba(246, 246, 246, 0.03) 63%,rgba(188, 188, 188, 0.03) 63%, rgba(188, 188, 188, 0.03) 71%,rgba(15, 15, 15, 0.03) 71%, rgba(15, 15, 15, 0.03) 87%,rgba(127, 127, 127, 0.03) 87%, rgba(127, 127, 127, 0.03) 93%,rgba(234, 234, 234, 0.03) 93%, rgba(234, 234, 234, 0.03) 100%),linear-gradient(90deg, #ffffff,#ffffff)",
      }}
    >
      <Head>
        <title>Authentication Page</title>
        <meta name="description" content="LabTastic Login Page" />
      </Head>

      <div
        style={
          {
            // marginTop:"10%",
          }
        }
      >
        <CenteredContainer>
          <Card
            shadow="lg"
            p="xl"
            radius="lg"
            withBorder
            sx={{
              width: "400px",
            }}
          >
            <div
              style={{
                marginBottom: "2rem",
              }}
            >
              <Logo size={40} weight={800} logoSize={"100px"} />
            </div>
            <Tabs defaultValue="login">
              <Tabs.List position="center" grow>
                <Tabs.Tab value="login">
                  <Text size="lg" variant="gradient" weight="semibold">
                    Login
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab value="signup">
                  <Text size="lg" variant="gradient" weight="semibold">
                    Signup
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab value="reset">
                  <Text size="lg" variant="gradient" weight="semibold">
                    Reset Password
                  </Text>
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="login" pt="xs">
                <Stack
                  align="center"
                  spacing="sm"
                  // sx={(theme) => ({
                  //   backgroundColor:
                  //     theme.colorScheme === "dark"
                  //       ? theme.colors.dark[8]
                  //       : theme.colors.gray[0],
                  //   height: 300,
                  // })}
                >
                  <InputEmail onChange={onChangeLogin} />
                  <InputPassword onChange={onChangeLogin} />
                  <CustomButton
                    click={loginSubmit}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-login"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#ffffff"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                      </svg>
                    }
                  >
                    Login
                  </CustomButton>
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="signup" pt="xs">
                <Stack
                  align="center"
                  spacing="sm"
                  // sx={(theme) => ({
                  //   backgroundColor:
                  //     theme.colorScheme === "dark"
                  //       ? theme.colors.dark[8]
                  //       : theme.colors.gray[0],
                  //   height: 300,
                  // })}
                >
                  <InputName onChange={onChangeSignup} />
                  <InputEmail onChange={onChangeSignup} />
                  <InputPassword onChange={onChangeSignup} />
                  <Radio.Group
                    name="role"
                    defaultValue="student"
                    spacing="sm"
                    onChange={(val) => {
                      setSignupInfo({
                        ...signupInfo,
                        role: val,
                      });
                    }}
                  >
                    <Radio name="role" value="student" label="Student" />
                    <Radio name="role" value="teacher" label="Teacher" />
                  </Radio.Group>
                  <CustomButton
                    click={signupSubmit}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-login"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#ffffff"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                      </svg>
                    }
                  >
                    Signup
                  </CustomButton>
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="reset" pt="xs">
                <Stack
                  align="center"
                  spacing="sm"
                  // sx={(theme) => ({
                  //   backgroundColor:
                  //     theme.colorScheme === "dark"
                  //       ? theme.colors.dark[8]
                  //       : theme.colors.gray[0],
                  //   height: 300,
                  // })}
                >
                  <InputEmail />
                  <CustomButton
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-rotate-rectangle"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#ffffff"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M16.3 5h.7a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h5l-2.82 -2.82m0 5.64l2.82 -2.82"
                          transform="rotate(-45 12 12)"
                        />
                      </svg>
                    }
                  >
                    Reset Password
                  </CustomButton>
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Card>
        </CenteredContainer>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            margin: "4rem",
          }}
        >
          <Image
            src="/homeAnimation.svg"
            alt="LabTastic"
            width={700}
            height={700}
          />

          {signUpSuccess == true && (
            <Notification
              icon={<IconCheck size={18} />}
              color="teal"
              title="Teal notification"
              onAbort={() => {
                setSignUpSuccess(false);
              }}
            >
              This is teal notification with icon
            </Notification>
          )}
          {loginError == true && (
            <Notification
              icon={<IconX size={18} />}
              color="red"
              onAbort={() => {
                setSignUpSuccess(false);
              }}
            >
              Bummer! Notification without title
            </Notification>
          )}
        </div>
      </div>
    </div>
  );
}

const CustomButton = ({ children, icon, click }) => (
  <Button
    color="cyan"
    radius="sm"
    mt={20}
    fullWidth
    leftIcon={icon}
    uppercase
    onClick={click}
  >
    {children}
  </Button>
);

const MessageDialog = ({ color, type, opened, setOpen }) => (
  <Dialog
    opened={opened}
    withCloseButton
    onClose={() =>
      setOpen({
        [type]: !opened[type],
      })
    }
    size="lg"
    radius="md"
    shadow="xl"
    transition="slide-up"
    transitionDuration={1000}
    transitionTimingFunction="ease"
    position={{ bottom: 50, right: 50 }}
  >
    <Alert
      icon={<IconAlertCircle size={16} />}
      title={type}
      color={color}
      variant="outline"
    >
      {type === "Success" ? "Hurray , You are legit" : "Oops , Try again"}
    </Alert>
  </Dialog>
);
