import styled from "styled-components";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Wrapper = styled.div``;
const TextInput = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const Submit = styled.button``;
const Cancel = styled.button``;

const EditTweetForm = ({ tweet, photo, id, endEdit, userId }) => {
  const [text, setText] = useState(tweet);
  const [file, setFile] = useState(photo);

  const onTextChange = (e) => {
    setText(e.target.value);
  };
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmit = async () => {
    try {
      const tweetRef = doc(db, "tweets", id);
      if (!file) {
          await updateDoc(tweetRef, {
              tweet: text,
            });
      } else {
        const storageRef = ref(storage, `tweets/${userId}/${id}`)
        const result = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(tweetRef, {
          tweet: text,
          photo: url,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      endEdit();
    }
  };
  const onCancel = (e) => {
    e.preventDefault();
    endEdit();
  };
  return (
    <Wrapper>
      <TextInput onChange={onTextChange} value={text}></TextInput>
      <AttachFileButton htmlFor="edit">
        {file ? "Photo changed" : "Change photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="edit"
        accept="image/*"
      />
      <Submit onClick={onSubmit}>Submit</Submit>
      <Cancel onClick={onCancel}>Cancel</Cancel>
    </Wrapper>
  );
};

export default EditTweetForm;
