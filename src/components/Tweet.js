import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import EditTweetForm from "./EditTweetForm";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;
const UserName = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;
const Column = styled.div``;
const Delete = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
const Update = styled.button`
  background-color: skyblue;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const Tweet = ({ userName, photo, tweet, userId, id }) => {
  const user = auth.currentUser;

  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    if (user.uid !== userId) return;
    setIsEditing(true);
  };

  const endEdit = () => {
    setIsEditing(false);
  };

  const onDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (!ok || user.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  return (
    <Wrapper>
      <Column>
        <UserName>{userName}</UserName>
        {isEditing ? (
          <EditTweetForm
            tweet={tweet}
            photo={photo}
            userId={userId}
            id={id}
            endEdit={endEdit}
          />
        ) : (
          <>
            <Payload>{tweet}</Payload>
            {photo ? (
              <Column>
                <Photo src={photo} />
              </Column>
            ) : null}
          </>
        )}
        {user.uid === userId ? (
          <>
            <Delete onClick={onDelete}>Delete</Delete>
            <Update onClick={onEdit}>Update</Update>
          </>
        ) : null}
      </Column>
    </Wrapper>
  );
};

export default Tweet;
