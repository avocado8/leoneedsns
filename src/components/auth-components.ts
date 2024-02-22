import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;
export const Title = styled.h1`
  font-size: 42px;
  font-family: "Courier Prime", monospace;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
  margin-top: 20px;
`;

export const Input = styled.input`
  border-radius: 20px;
  font-size: 16px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid white;
  &[type="submit"]{
    cursor: pointer;
    &:hover {
      opacity: .9;
    }
  }
  &:focus {
    outline:none;
  }
`;

export const Error = styled.span`
  margin-top: 16px;
  color: #C5E898;
`;

export const Switcher = styled.span`
  margin-top: 16px;
  a {
    color: #C5E898;
  }
`;