import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoginButton from "@/components/Login/LoginButton";
import MyInput from "@/components/Login/MyInput";
import { useRouter } from "next/router";
import Nav from "@/components/Navigation";
import Center from "@/components/Center";
import axios from "axios";
import { useAuth } from "@/Contexts/AccountContext";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // Новий стан для повідомлення про невдалий вхід

  const { login, isLogin } = useAuth();

  useEffect(() => {
    if (isLogin) {
      router.push("/user-profile/user-info");
    }
  }, [isLogin]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const loginUser = async () => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    
    if (!email.trim()) {
      setEmailError("Будь ласка введіть свою пошту.");
      return;
    } else if (!validateEmail(email.trim())) {
      setEmailError("Будь ласка введіть правильний формат пошти.");
      return;
    }
  
    if (!password.trim()) {
      setPasswordError("Будь ласка введіть свій пароль.");
      return;
    }
  
    try {
      const response = await axios.post("/api/login", {
        email: email,
        password: password,
      });
  
      if (response.data.success) {
        login(response.data);
        router.push({
          pathname: "/user-profile/user-info",
          query: { email: email },
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Даний акаунт не зареєстрований!");
    }
  };

  const goToRegister = () => {
    router.push("/registration");
  };

  return (
    <Center>
      <Header />
      <Nav page={"Увійти"} />
      <Page>
        <Container>
          {!isLogin && (
            <>
              <FirstHalf>
                <Text>Ви користувач?</Text>
                <InputWrapper>
                  <MyInput
                    text={"Електронна пошта"}
                    type={"email"}
                    value={email}
                    setValue={setEmail}
                    theme="auth"
                  />
                  <ErrorMessage>{emailError}</ErrorMessage>
                </InputWrapper>
                <InputWrapper>
                  <MyInput
                    text={"Пароль"}
                    type={"password"}
                    value={password}
                    setValue={setPassword}
                    theme="auth"
                  />
                  <ErrorMessage>{passwordError}</ErrorMessage>
                </InputWrapper>
                <ErrorMessage>{loginError}</ErrorMessage>{" "}
                {/* Відображення повідомлення про невдалий вхід */}
                <Wrapper>
                  <LoginButton onClick={loginUser} href={"/"}>
                    УВІЙТИ
                  </LoginButton>
                </Wrapper>
              </FirstHalf>
              <SecondHalf>
                <Text>Це ваш перший візит?</Text>
                <Wrapper>
                  <LoginButton onClick={goToRegister}>
                    ЗАРЕЄСТРУВАТИСЬ
                  </LoginButton>
                </Wrapper>
              </SecondHalf>
            </>
          )}
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
  max-width: 1200px;
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

const ErrorMessage = styled.span`
  margin-top: 5px;
  color: red;
`;

export default LoginPage;
