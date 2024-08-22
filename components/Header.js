import styled from "styled-components";
import Center from "./Center";
import Logo from "./Logo";
import AccountSvg from "./svg/AccountSVG";
import CreateSetButton from "./Buttons/CreateSetButton";
import MySetsButton from "./Buttons/MySetButton";
import { useAuth } from "@/Contexts/AccountContext";

export default function Header() {

  return (
    <Center>
      <HeaderDiv>
        <Logo />
        <StyledButtons>
          <MySetsButton>Мої набори</MySetsButton>
          <CreateSetButton>Створити набір</CreateSetButton>
        </StyledButtons>

        <AccountSvg />
      </HeaderDiv>
    </Center>
  );
}

const HeaderDiv = styled.div`
  max-width: 100%;
  width: 1000px;
  height: 62px;
  background: linear-gradient(90deg, #c2e0f5 47.5%, #67aedf 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledButtons = styled.div`
  display: flex;
  align-items: center;
`;
