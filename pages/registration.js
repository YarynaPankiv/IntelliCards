import Header from "@/components/Header";
import React, { useState } from "react";
import styled from "styled-components";
import LoginButton from "@/components/Login/LoginButton";
import MyInput from "@/components/Login/MyInput";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/Contexts/AccountContext";
import Nav from "@/components/Navigation";
import Center from "@/components/Center";

const RegisterPage = ({ toggleDarkMode, categories, subcategories }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, isLogin } = useAuth();

  async function registerUser() {
    setEmailError("");
    setPasswordError("");

    if (!name.trim()) {
      setEmailError("Please enter your name.");
      return;
    }

    if (!surname.trim()) {
      setEmailError("Please enter your surname.");
      return;
    }

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      return;
    }

    // Regular expression to check if email is Gmail
    const gmailRegex = /@gmail.com$/i;
    if (!gmailRegex.test(email)) {
      setEmailError("Please enter a Gmail address.");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      return;
    }

    try {
      const checkUser = await axios.get(`/api/register`, {
        email: email,
      });
      if (!checkUser.data.success) {
        alert("User with this email already exists.");
        return;
      }
      const newUser = await axios.post("/api/register", {
        name: name,
        surname: surname,
        email: email,
        password: password,
        points: 0,
      });
      login(newUser.data);
      console.log(newUser);
      router.push("/user-profile/user-info");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <Center>
      <Header />
      <Nav page={"Зареєструватись"} />
      <Page>
        <Container>
          <FirstHalf>
            <Text>Це ваш перший візит?</Text>
            <InputWrapper>
              <MyInput
                text={"Електронна пошта"}
                type={"email"}
                value={email}
                setValue={setEmail}
                theme="auth"
                required
              />
              <ErrorMessage>{emailError}</ErrorMessage>
            </InputWrapper>
            <NameWrap>
              <MyInput
                text={"Ім'я"}
                type={"text"}
                value={name}
                setValue={setName}
                theme="auth"
                required
              />
              <MyInput
                text={"Прізвище"}
                type={"text"}
                value={surname}
                setValue={setSurname}
                theme="auth"
                required
              />
            </NameWrap>
            <InputWrapper>
              <MyInput
                text={"Пароль"}
                type={"password"}
                value={password}
                setValue={setPassword}
                theme="auth"
                required
              />
              <ErrorMessage>{passwordError}</ErrorMessage>
            </InputWrapper>
            <Wrapper>
              <LoginButton onClick={registerUser}>ЗАРЕЄСТРУВАТИСЬ</LoginButton>
            </Wrapper>
          </FirstHalf>
          <SecondHalf>
            <Text>Ви користувач?</Text>
            <Wrapper>
              <LoginButton onClick={goToLogin}>УВІЙТИ</LoginButton>
            </Wrapper>
          </SecondHalf>
        </Container>
      </Page>
    </Center>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  max-width: 500px;
  width: 100%;
`;

const Wrapper = styled.div``;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  flex: 1;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const FirstHalf = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px;

  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
`;

const SecondHalf = styled.div`
  flex: 1;
  background: #d9d9d93d;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px;

  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
`;

const Text = styled.div`
  font-size: 20px;
  text-align: left;
`;

const NameWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  max-width: 500px;
`;

const ErrorMessage = styled.span`
  margin-top: 5px;
  color: red;
`;

export default RegisterPage;
