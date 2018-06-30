import styled from "styled-components";

const TextInput = styled.textarea.attrs({
  type: "text",
  placeholder: "What's up Decipher?"
})`
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  font-size: 14px;
  font-family: Avenir;
  border: 1px solid ${props => (props.messageError ? "#e82929" : "#5bc94a")};
  outline: none;
`;

export default TextInput;
