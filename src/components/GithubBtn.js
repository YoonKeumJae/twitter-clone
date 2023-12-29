import styled from "styled-components";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  width: 100%;
  background-color: white;
  font-weight: 500;
  padding: 10px 20px;
  margin-top: 50px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  color: black;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 25px;
`;

const GithubBtn = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="./GithubLogo.svg" />
      Continue with Github
    </Button>
  );
};
export default GithubBtn;
