import { useState } from "react";
import { Modal, Button, Title, TextInput, Radio } from "@mantine/core";
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
  const [type, setType] = useState("mcq");
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
              questionSet: qset,
              instruction: instruction,
              classroom: id,
              name: "New Task",
            };
            try {
              let qq = [];
              for (let i = 0; i < qset.length; i++) {
                let questionText = qset[i].question;
                let options = [
                  {
                    answerText: qset[i].answer,
                    isCorrect: true,
                  },
                ];
                for (let j = 0; j < qset[i].options.length; j++) {
                  options.push({
                    answerText: qset[i].options[j],
                    isCorrect: false,
                  });
                }
                qq.push({
                  questionText: questionText,
                  options: options,
                });
              }
              localStorage.setItem("questions", JSON.stringify(qq));
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
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const [checked, setChecked] = useState(false);
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
        <Title order={5}>Type: {type}</Title>

        <Title order={6}>Question: </Title>
        <TextInput
          label="enter question"
          placeholder="Enter question"
          inputWrapperOrder={["label", "error", "input", "description"]}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <Title order={6}>Answer: </Title>
        <TextInput
          label="Enter Answer"
          placeholder="Enter Answer"
          inputWrapperOrder={["label", "error", "input", "description"]}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <Title order={6}>Add Options </Title>
        {options.map((op, key) => (
          <p>
            {key + 1}
            {"  "}
            {op}
          </p>
        ))}
        <TextInput
          label="enter option 1"
          placeholder="Enter option 1"
          inputWrapperOrder={["label", "error", "input", "description"]}
          onChange={(e) => {
            setOption(e.target.value);
          }}
        />

        <Button
          onClick={() => {
            setOptions((oldArray) => [...oldArray, option]);
            console.log(options);
          }}
        >
          Add Option
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => {
            setQset((oldArray) => [...oldArray, { question, options, answer }]);
            setOptions([]);
          }}
        >
          Add Question
        </Button>
        <Title order={6}>Question Set </Title>
        {qset.map((q, key) => (
          <div>
            <p>
              Q{key + 1}
              {" : "}
              {q.question}
            </p>
            <p>
              A{" : "}
              {q.answer}
            </p>
            {q.options.map((op, key) => (
              <p>
                {key + 1}
                {"  "}
                {op}
              </p>
            ))}
          </div>
        ))}
        <Button color="teal" onClick={uploadImage}>
          Submit
        </Button>
      </Modal>
    </>
  );
}
