import styles from "../styles/sr.module.css";
import React, { useState, useEffect } from 'react';
import { BackgroundImage } from "@mantine/core";
import { sendRenderResult } from "next/dist/server/send-payload";
function Mybutton({type,click}){
    if(type==="Start"){
      return(<div onClick={click}>
        <div className={styles.Start}>
      
        </div>
        
        </div>)
    }else{
      return(<div 
      onClick={click}>
      <div className={styles.Stop}>
      
      </div>
      </div>)
    }
  
  }
const download = (url)=>{

    let alink = document.createElement('a');
    alink.href = url;
    var mydate=new Date().toLocaleTimeString();
    alink.download = 'Lab Practice'+mydate+'.mp4';
    alink.click();

}
const upload = (file)=>{
      console.log(file);
}
export  function ScrereRecording (){
    const [state, setState] = useState({mode:0,start:null,stop:null});
    let mystream;
    let myaudio;
    const [myfile,setFile]= useState(null);
    const [myurl,setUrl]= useState(null);
    const  handleClick = (e) => {
      navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: 'screen',
        },
        audio: true,
    })
    .then(async (stream) => {
      let data=[];
      mystream=stream;
      
      let audio = await navigator.mediaDevices.getUserMedia({ 
      audio: true, video: false }) 
      myaudio=audio;
      // Combine both video/audio stream with MediaStream object
      let combine = new MediaStream(
      [...stream.getTracks(), ...audio.getTracks()])
      let recorder = new MediaRecorder(combine);
      setState({mode:1,start:(e) => {
              recorder.start();
              alert("recording started")
              data = []
        },stop: (e) => {  
              recorder.stop();
              alert("recording stopped")
          }
        });
        stream.getVideoTracks()[0].onended = function () {
            audio.getTracks().forEach(function(track) {
            if (track.readyState == 'live') {
                track.stop();
            }
      }); 
          setState({mode:0,start:null,stop: null});
        };
      recorder.ondataavailable = (e) => {
        data.push(e.data);
        };
      recorder.onstop = async () => {
      let blobData = new Blob(data, { type: 'video/mp4' });
      setUrl(URL.createObjectURL(blobData))
      // url = URL.createObjectURL(blobData);

      const mediaBlob = await fetch(myurl)
            .then(response => response.blob());

       const b  = new File(
                    [mediaBlob],
                    "demo.mp4",
                    { type: 'video/mp4' }
                    
            );

        setFile(b);
        };
      });
}
    if(state.mode===1){
      return (
        <div >
          <Mybutton type="Start" click={state.start}>start</Mybutton><Mybutton type="Stop" click={state.stop}>start</Mybutton>
          <div style={{ 
      backgroundImage: `url("/download.png")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      height: "50px",
      width: "50px" 
    }}  onClick ={()=>{
              download(myurl);
          }}></div>
          <div style={{ 
      backgroundImage: `url("/upload.png")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      height: "50px",
      width: "50px" 
    }} onClick={()=>{
              upload(myfile);
          }}></div>
          
        </div>
        
      )
    }else{
      return (
          <div className={styles.Recorder} onClick={handleClick} ></div>
      )
    }
}