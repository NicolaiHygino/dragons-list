import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: #e74c3c;
    --error: #c0392b;
    --bg-color: #EDECEE;
  }

  * {
    box-sizing: border-box;
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
