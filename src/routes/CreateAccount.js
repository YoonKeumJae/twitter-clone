import styled from "styled-components";

const Wrapper = styled.div``;
const Form = styled.form``;
const Input = styled.input``;

const CreateAccount = () => {
  return (
    <Wrapper>
      <Form>
        <Input name="name" placeholder="name" type="text" required />
        <Input name="email" placeholder="email" type="email" required />
        <Input name="password" placeholder="Password" type="password" required />
        <Input type="submit" value="Create Account" />
      </Form>
    </Wrapper>
  );
};
export default CreateAccount;
