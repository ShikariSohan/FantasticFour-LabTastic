import styles from "../styles/sr.module.css";
import React, { useState, useEffect } from 'react';
function Mybutton({type,click}){
    if(type==="Start"){
      return(<div className={styles.Row} onClick={click}>
        <div className={styles.Start}>
      
        </div>
        Start recording
        </div>)
    }else{
      return(<div className={styles.Row}
      onClick={click}>
      <div className={styles.Stop}>
      
      </div>
      Stop recording</div>)
    }
  
  }
export  function ScrereRecording (){
    const [state, setState] = useState({mode:0,start:null,stop:null});
    const  handleClick = (e) => {
      navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: 'screen',
        },
        audio: true,
    })
    .then(async (stream) => {
      let data=[];
      let audio = await navigator.mediaDevices.getUserMedia({ 
      audio: true, video: false }) 
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
        let url = URL.createObjectURL(blobData);
        const mediaBlob = await fetch(url)
            .then(response => response.blob());

            const myFile = new File(
                    [mediaBlob],
                    "demo.mp4",
                    { type: 'video/mp4' }
            );
        let alink = document.createElement('a');
          alink.href = url;
          var mydate=new Date().toLocaleTimeString();
          alink.download = 'Lab Practice'+mydate+'.mp4';
          alink.click();
          stream.getTracks().forEach(function(track) {
            if (track.readyState == 'live') {
                track.stop();
            }
        });
        audio.getTracks().forEach(function(track) {
          if (track.readyState == 'live') {
              track.stop();
          }
      }); 
          setState({mode:0,start:null,stop: null});
        };
      });

  console.log('The link was clicked.');
}
    if(state.mode===1){
      return (
        <div className={styles.Row}><Mybutton type="Start" click={state.start}>start</Mybutton><Mybutton type="Stop" click={state.stop}>start</Mybutton></div>
        
      )
    }else{
      return (
          <div className={styles.Recorder} onClick={handleClick} ></div>
      )
    }
}