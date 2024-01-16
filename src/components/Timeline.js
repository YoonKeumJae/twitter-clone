import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";

const Wrapper = styled.div``;

const Timeline = () => {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, userName, photo } = doc.data();
      return {
        id: doc.id,
        tweet,
        createdAt,
        userId,
        userName,
        photo,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} {...tweet} />;
      })}
    </Wrapper>
  );
};

export default Timeline;
