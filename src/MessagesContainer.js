import styled from "styled-components";

const MessagesContainer = styled.div`
  display: flex;
  flex: 0 1 500px;
  margin: 0 25px;
  height: 100%;
  overflow: scroll;
  flex-direction: column;
  justify-content: flex-start;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`;

export default MessagesContainer;
