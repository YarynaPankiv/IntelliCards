import { use, useMemo, useState } from "react";
import styled from "styled-components";

const MyInput = ({ text, type, value, setValue, theme }) => {
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const ThemedInput = useMemo(() => {
    switch (theme) {
      case "auth":
        return AuthInput;
      case "common":
        return CommonInput;
      default:
        return CommonInput;
    }
  }, [theme]);

  return (
    <Label>
      <div>{text}</div>
      <ThemedInput onChange={handleOnChange} value={value} type={type} />
    </Label>
  );
};

const Label = styled.label`
  width: 100%;
`;

const CommonInput = styled.input`
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  height: 36px;
  margin-top: 10px;
  text-align: center;
`;

const AuthInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 20px 20px 5px 20px;
  outline: none;
  width: 100%;
  font-size: 20px;
`;

export default MyInput;