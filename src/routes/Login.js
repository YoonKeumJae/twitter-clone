import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {
  Wrapper,
  Title,
  Form,
  Input,
  Error,
  Switcher,
} from "../components/AuthComponents";
import GithubBtn from "../components/GithubBtn";
import styled from "styled-components";

const PasswordReset = styled.span``;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    const target = e.target;
    if (target.name === "email") {
      setEmail(target.value);
    } else if (target.name === "password") {
      setPassword(target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // prevent refresh
    setError(""); // reset error
    if (isLoading || email === "" || password === "") {
      return;
    }
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // redirect to homepage
      navigate("/");
    } catch (e) {
      setError(e.message);
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onClickReset = () => {
    setReset(!reset);
  };

  const onClickResetSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("email sent");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create Account &rarr;</Link>
      </Switcher>
      <PasswordReset>
        Forgot your password?{" "}
        <button onClick={onClickReset}>Reset &rarr;</button>
        {reset ? (
          <form>
            <input
              type="email"
              placeholder="input your email"
              onChange={onChange}
              name="email"
            ></input>
            <button type="submit" onClick={onClickResetSubmit}>
              Send
            </button>
          </form>
        ) : null}
      </PasswordReset>
      <GithubBtn />
    </Wrapper>
  );
};
export default Login;
