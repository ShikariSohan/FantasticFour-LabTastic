import { useState } from "react";
import { Modal, Button, Title } from "@mantine/core";
import { FileInput } from "@mantine/core";
import { storage } from "../middleware/Firebase";
import axios from "axios";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { TypographyStylesProvider } from "@mantine/core";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@mantine/rte"), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});

export default function VideoUploadModal({ opened, setOpened, id }) {
  const [files, setFiles] = useState([]);
  const [instruction, setInstruction] = useState("");

  const uploadImage = (props) => {
    console.log(files);
    if (files.length !== 0) {
      const imageRef = ref(storage, `/${Date.now()}.mp4`);
      const uploadTask = uploadBytesResumable(imageRef, files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress
          console.log(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const task = {
              url: url,
              question: qset,
              instruction: instruction,
              classroom: id,
              name: "New Task",
            };
            try {
              axios.post("/api/task", task).then((res) => {
                setQset([]);
                setOpened(false);
              });
            } catch (err) {
              console.log(err);
            }
          });
        }
      );
    } else return;
  };
  const configureRte = [
    ["bold", "italic", "underline", "link", "image"],
    ["unorderedList", "h1", "h2", "h3"],
    ["sup", "sub"],
    ["alignLeft", "alignCenter", "alignRight"],
  ];
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qset, setQset] = useState([]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Set Task"
        size="lg"
      >
        <FileInput
          placeholder="Upload Session"
          label="Upload "
          variant="filled"
          radius="md"
          size="md"
          multiple
          onChange={(files) => setFiles(files)}
        />
      
        <Title order={4}>Instruction</Title>
        <Editor
          value={instruction}
          onChange={setInstruction}
          id="rte"
          controls={configureRte}
        />
        <Title order={4}>Quiz</Title>
        {qset.length !== 0 &&
          qset.map((q) => (
            <div>
              <div>
                <p>Question:</p>
                <TypographyStylesProvider>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(q.question),
                    }}
                  />
                </TypographyStylesProvider>
              </div>
              <div>
                <p>Answer:</p>
                <TypographyStylesProvider>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(q.answer),
                    }}
                  />
                </TypographyStylesProvider>
              </div>
            </div>
          ))}
        <Title order={6}>Question: </Title>
        <Editor
          value={question}
          onChange={setQuestion}
          id="rte2"
          controls={configureRte}
        />
        <Title order={6}>Answer: </Title>
        <Editor
          value={answer}
          onChange={setAnswer}
          id="rte1"
          controls={configureRte}
        />
        <Button
          variant="outline"
          size="xs"
          onClick={() => {
            setQset((oldArray) => [...oldArray, { question, answer }]);
          }}
        >
          Add Question
        </Button>
        <Button color="teal" onClick={uploadImage}>
          Submit
        </Button>
      </Modal>
    </>
  );
}
