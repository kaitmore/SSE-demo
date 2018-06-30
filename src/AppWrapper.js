import styled, { injectGlobal } from "styled-components";

injectGlobal`
 * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  max-width: 1000px;
  font-family: Avenir;
  height: 100vh;
  width: 100%;
  flex-wrap: wrap;

  :after {
    content: "";
    bottom: 0;
    height: 20%;
    width: 100%;
    position: absolute;

    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

export default AppWrapper;
