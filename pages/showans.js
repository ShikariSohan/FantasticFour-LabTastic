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
    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await axios.post("/api/courses/result",{
                taskId : taskId,
                
            })
        }
    })
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
            <div  className={styles.Row}><p> "Submited Answer :{ans}</p></div>
            <div  className={styles.Row}><p> "Actual Answer :{actual}</p></div>
        </div>
        </Card>
    )
}
const json=[{id:"1001",question:"Q1:What is your name? lalalalalal sjbdjshajashsxhjkawkhdhdhjn ",ans:"sohan",actual:"kawsar"},
{id:"1002",question:"Q1:What is your Hobby? lalalalalal sjbdjshajashsxhjkawkhdhdhjn ",ans:"blablabla",actual:"klaklakla"}]
export default function Profile() {
  var marks=[];
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
      <Ans myid="1001" question="Q1:What is your name? lalalalalal sjbdjshajashsxhjkawkhdhdhjn " ans="sohan" actual="kawsar"></Ans>
      
      <Ans myid="1002" question="Q1:What is your Hobby? lalalalalal sjbdjshajashsxhjkawkhdhdhjn " ans="blablabla" actual="klaklakla"></Ans>
    
      
      <div className={styles.Row}>
      <Button
            variant="gradient"
            gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            size="lg"
            radius="md"
            mt="xl"
            margin='5px'
            onClick={()=>{
                marks=[];
                let ans=0;
                for(let i=0;i<json.length;i++){

                    if(json[i].ans.trim()==json[i].actual.trim()){
                        marks.push({id:json[0].id,marks:1});
                        ans++;
                    }else{
                        marks.push({id:json[0].id,marks:0});
                    }
                }
                console.log(marks)
            document.getElementById("result").innerHTML="<h1>Marks:"+ans+" out of "+json.length+"</h1>"
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
                marks=[];
                let ans=0;
                
                for(let i=0;i<json.length;i++){
                    marks.push({id:json[0].id,marks:parseInt(document.getElementById(json[i].id).value)});
                    ans=ans+parseInt(document.getElementById(json[i].id).value);
                    document.getElementById(json[i].id).value="";
                }
                document.getElementById("result").innerHTML="<h1>Marks:"+ans+" out of "+json.length+"</h1>"

            console.log(marks)
            }}
          >Calculate</Button>
      </div>

      </main>
    </div>
  );
}
