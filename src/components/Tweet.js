import styled from "styled-components";

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

const Tweet = ({ userName, photo, tweet }) => {
  return (
    <Wrapper>
      <Column>
        <UserName>{userName}</UserName>
        <Payload>{tweet}</Payload>
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
};

export default Tweet;