import styled from "styled-components";
import Lamp from "./svg/LampSVG";
import { useRouter } from "next/router";

export default function Logo() {
  const router = useRouter();

  const goToMainPage = async () => {
    router.push("/");
  };
  return (
    <Div>
      <Lamp />
      <Name onClick={goToMainPage}>IntelliCards</Name>
    </Div>
  );
}

const Name = styled.p`
  font-family: "Assistant", sans-serif;
  font-weight: 900;
  font-size: 24px;
  cursor: pointer;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
`;
