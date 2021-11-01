import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: #964BF0;
    --scd-color: #8260D5;
    --error: #c0392b;
    --bg-color: #EDECEE;
  }

  * {
    box-sizing: border-box;
  }

  *:focus {
    outline: 1px solid var(--main-color);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    color: #333;
    min-height: 100vh;
    background-color: #a4508b;
    background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
    background-repeat: no-repeat;
    background-size: cover;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
`;

export const Button = styled.button`
  background-color: var(--main-color);
  border: 0;
  border-radius: 3px;
  color: white;
  padding: .6em 1em;
  letter-spacing: 1px;
  cursor: pointer;
`;
