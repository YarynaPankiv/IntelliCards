import styled from "styled-components";

const LoginButton = ({ onClick, children }) => {
  const handleOnClick = () => {
    onClick();
  };

  return <Button onClick={handleOnClick}>{children}</Button>;
};

const Button = styled.button`
  border: 2px solid #75C113;
  background-color: #ffffff;
  padding: 10px 10px;
  font-size: 16px;
  color: #75C113;
  cursor: pointer;
  width: 300px;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;


  &:hover {
    background: #75C113;
    color: #ffffff;
  }
  @media only screen and (max-width: 600px) {
    font-size: 14px;
    padding: 10px 10px;
    width: 97%;
  }
`;

export default LoginButton;