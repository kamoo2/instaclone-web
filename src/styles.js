import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "black",
  bgColor: "lightgray",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  body{
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.fontColor};
  }
`;
