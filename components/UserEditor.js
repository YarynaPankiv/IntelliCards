import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import MyInput from "./Login/MyInput";
import LoginButton from "./Login/LoginButton";
import { useAuth } from "@/Contexts/AccountContext";
import Center from "./Center";
import Nav from "./Navigation";

const UserEditor = () => {
  const { user } = useAuth(); 
  const { setUser } = useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [emailField, setEmailField] = useState("");
  const [userId, setUserId] = useState("");
  console.log("soso");

  useEffect(() => {
    if (user) {
      console.log(user);
      setName(user.data.name);
      setSurname(user.data.surname);
      setPassword(user.data.password);
      setEmailField(user.data.email);
      setUserId(user.data._id);
    }
  }, [user]);

  const saveData = async () => {
    try {
      const response = await axios.put(`/api/login?_id=${userId}`, {
        _id: userId,
        email: emailField,
        name,
        surname,
        password,
      });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("User data updated:", response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const savePassword = async () => {
    try {
      const response = await axios.put(`/api/login?_id=${userId}`, {
        _id: userId,
        email: emailField,
        name,
        surname,
        password: newPassword,
      });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("Password updated:", response.data);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <Center>
      <Page>
        
        <InputWrapper>
          <Text>Дані користувача</Text>
          <InputContainer>
            <MyInput
              text={"Адреса електронної пошти"}
              type={"email"}
              value={emailField}
              setValue={setEmailField}
              theme="common"
            />
          </InputContainer>
          <InputContainer>
            <NameWrap>
              <MyInput
                text={"Ім'я"}
                type={"text"}
                value={name}
                setValue={setName}
                theme="common"
              />
              <MyInput
                text={"Прізвище"}
                type={"text"}
                value={surname}
                setValue={setSurname}
                theme="common"
                placeholder="Прізвище"
              />
            </NameWrap>
          </InputContainer>
        </InputWrapper>
        <LoginButton onClick={saveData}>Змінити дані користувача</LoginButton>
        <InputWrapper>
          <InputContainer>
            <Text>Пароль</Text>
            <MyInput
              text={"Поточний пароль"}
              type={"text"}
              value={password}
              setValue={setPassword}
              theme="common"
            />
          </InputContainer>
          <InputContainer>
            <MyInput
              text={"Новий пароль"}
              type={"password"}
              value={newPassword}
              setValue={setNewPassword}
              theme="common"
            />
          </InputContainer>
          <InputContainer>
            <MyInput
              text={"Повторити новий пароль"}
              type={"password"}
              value={checkPassword}
              setValue={setCheckPassword}
              theme="common"
            />
          </InputContainer>
        </InputWrapper>
        <LoginButton onClick={savePassword}>Змінити пароль</LoginButton>
      </Page>
    </Center>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 230px;
  margin-left: 20%;
  font-family: "Montserrat", sans-serif;
  @media only screen and (max-width: 600px) {
    width: 364px;
    margin-left: 8px;
    margin-right: 5px;
  }
`;

const NameWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  max-width: 500px;
`;

const InputWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 30px 0;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 20px;
`;

const InputContainer = styled.div`
  padding: 10px 0;
`;

const ButtonWrapper = styled.div`
  padding-top: 20px;
`;

export default UserEditor;
