import Head from "next/head";
import Navbar from "../componants/Navbar";
import { useEffect, useState } from "react";
import { ScrereRecording } from "../componants/ScreneRecording";
import {VideoPlayer} from "../componants/VideoPlayer";
import CenteredContainer from "../componants/CenteredContainer";
import styles from "../styles/sr.module.css";
import { Button, Card, Stack, Text, Dialog, Alert, Flex, Center, JsonInput } from "@mantine/core";
import Image from "next/image";
import axios from "axios";
function Ans({question,ans,actual,myid}){
    return (
        <Card
            
            shadow="lg"
            p="xl"
            radius="lg"
            withBorder
            sx={{
              width: "700px",
              margin:"20px"
            }}
          
        >

            <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center"
            }}>
            <div  className={styles.Row}><h3 > {question}</h3></div>
            <input id={myid} style={{margin:"5px"}} type="text"></input>
        </div>
            <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center"
            }}>
            <div  className={styles.Row}><p> Submited Answer :{ans}</p></div>
            <div  className={styles.Row}><p> Actual Answer :{actual}</p></div>
        </div>
        </Card>
    )
}
const json=[
    {
        "_id": "63d3e81b748ec1f25e01b65e",
        "student": "1002",
        "task": "1002",
        "questionSet": [
            {
                "_id": "63d3f413154dfab6da18e5a9",
                "question": "1001",
                "title": "What is your name ?",
                "answer": "sohan",
                "actual": "kawsar"
            },
            {
                "_id": "63d3f413154dfab6da18e5aa",
                "question": "1002",
                "title": "What is your hobby ?",
                "answer": "blanla",
                "actual": "blanla"
            }
        ]
    }
];

let apiReq ={
    taskId:"1001",
    studentId:"1001"
};
export default function Showans() {

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
      <main style={{        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", 
        }}>
    
      <div className={styles.Row}><h1>Quiz:01</h1><div style={{margin:"100px"}}></div><div id="result" > <h1>Marks :00</h1></div></div>
      <div>
        <Ans myid={json[0].questionSet[0].question} question={json[0].questionSet[0].title} ans={json[0].questionSet[0].answer} actual={json[0].questionSet[0].actual}></Ans>
        <Ans myid={json[0].questionSet[1].question} question={json[0].questionSet[1].title} ans={json[0].questionSet[1].answer} actual={json[0].questionSet[1].actual}></Ans>
      </div>
      
      <div className={styles.Row}>
      <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
            margin='5px'
            onClick={()=>{
                let ans=0;
                let js=json[0].questionSet;
                for(let i=0;i<js.length;i++){

                    if(js[i].answer.trim()==js[i].actual.trim()){
                        ans++;
                    }
                }
            document.getElementById("result").innerHTML="<h1>Marks:"+ans+" out of "+js.length+"</h1>"
            }}
          >Auto Calculate</Button>
          <div style={{margin:"20px"}}></div>
              <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
            onClick={()=>{
                let ans=0;
                let js=json[0].questionSet;
                for(let i=0;i<js.length;i++){
                    ans=ans+parseInt(document.getElementById(js[i].question).value);
                    document.getElementById(js[i].question).value="";
                }
                document.getElementById("result").innerHTML="<h1>Marks:"+ans+" out of "+js.length+"</h1>"

            }}
          >Calculate</Button>
      </div>

      </main>
    </div>
  );
}
