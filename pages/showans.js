import Head from "next/head";
import Navbar from "../componants/Navbar";
import { useEffect, useState } from "react";
import { ScrereRecording } from "../componants/ScreneRecording";
import {VideoPlayer} from "../componants/VideoPlayer";
import CenteredContainer from "../componants/CenteredContainer";
import styles from "../styles/sr.module.css";
import { Button, Card, Stack, Text, Dialog, Alert, Flex, Center } from "@mantine/core";
import Image from "next/image";
function Ans({question,ans,actual}){
    return (
        <Card
            
            shadow="lg"
            p="xl"
            radius="lg"
            withBorder
            sx={{
              width: "700px",
              height:"900px"
            }}
          
        >
        <div  className={styles.Row}><h3 > {question}</h3></div>
        <div  className={styles.Row}><p> "Submited Answer :{ans}</p></div>
        <div  className={styles.Row}><p> "Actual Answer :{actual}</p></div>
        <div></div>
        </Card>
    )
}
export default function Profile() {
  
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
      <Navbar/>
      <main>
        <p>hiii</p>

      </main>
    </div>
  );
}
