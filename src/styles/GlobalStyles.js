import reset from "styled-reset";
import createGlobalStyle from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  h1{
    background-color: black;
    color: white;
    font-family: system-ui;
  }
`;

export default GlobalStyles;