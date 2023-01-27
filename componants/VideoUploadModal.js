import { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { FileInput } from "@mantine/core";
import { storage } from "../middleware/Firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export default function VideoUploadModal({ opened, setOpened }) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const uploadImage = () => {
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
            console.log(url);
          });
        }
      );
    } else return;
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Upload Video"
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
        <Button color="green" onClick={uploadImage}>
          Upload
        </Button>
      </Modal>
    </>
  );
}
