import styled from "styled-components";

const NameInput = styled.input.attrs({
  type: "text",
  placeholder: "Name"
})`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-family: Avenir;
  border: 1px solid #5bc94a;
  outline: none;
`;

export default NameInput;
