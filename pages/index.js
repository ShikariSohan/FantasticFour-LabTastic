import Head from "next/head";
import Navbar from "../componants/Navbar";
import CenteredContainer from "../componants/CenteredContainer";
import { createStyles, Title, SimpleGrid, Text, Button, ThemeIcon, Grid, Col } from '@mantine/core';
import { IconFlask,IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons';
import { useEffect, useState } from "react";
import {useRouter} from "next/router";
const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

const features = [
  {
    icon: IconFlask,
    title: 'Experiment demonstrations',
    description: 'Our platform will provide experiments according to the syllabus. Teachers will demonstrate those experiments to students.',
  },
  {
    icon: IconFileCode,
    title: 'Quizzes and assignments',
    description: 'Teachers can create quizzes and assignments based on the experiments and other course material, and students can submit their answers through the platform.',
  },
  {
    icon: IconReceiptOff,
    title: 'Grading and feedback',
    description:
      'Teachers can grade quizzes and assignments and provide feedback to students through the platform.',
  },
  {
    icon: IconFlame,
    title: 'Interactive elements',
    description:
      'The platform will include interactive experiments so that students can visualize the practicals.',
  },
];


export default function Home() {

  const [isLogged, setIsLogged] = useState(false);
  const router  = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if (user.isLoggedIn === undefined || user.isLoggedIn === false) {
                setIsLogged(false);
            }
            else {
                setIsLogged(true);
            }
        } 
    }, []);

  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));
  
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
        <title>LabTastic | Home</title>
        <meta name="description" content="LabTastic Homepage" />
      </Head>
      <Navbar />
      <main>

      <CenteredContainer>
      
      <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
          Welcome to LabTastic: Online Practical Class Platform for Schoolgoers!
          </Title>
          <Text color="dimmed">
          It aims to significantly improve the education experience for students, particularly those with limited access to equipment and resources, and level the playing field for students at different schools.
          </Text>

          {isLogged && (<Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
            onClick={()=>{
              router.push('/courses');
            }}
          >
            Go To Dashboard
          </Button>)}

          { !isLogged && (<Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
            onClick={()=>{
              router.push('/auth');
            }}
          >
            Sign Up
          </Button>)}

          
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </div>
      
      
      </CenteredContainer>

      </main>

    </div>
  );
}