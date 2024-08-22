import styled from "styled-components";
import Center from "./Center";
import Link from "next/link";

export default function Nav({ page }) {
  return (
    <Center>
      <UrlsDiv>
        <StyledLink href="/">Головна</StyledLink>
        <StyledSvg
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.46875 0L0 1.46875L4.77083 6.25L0 11.0312L1.46875 12.5L7.71875 6.25L1.46875 0Z"
            fill="black"
            fillOpacity="0.61"
          />
        </StyledSvg>
        <StyledP>{page}</StyledP>
      </UrlsDiv>
    </Center>
  );
}
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  opacity: 60%;
  margin-right: 10px;
`;
export const StyledSvg = styled.svg`
  margin-left: 10px;
  fill: ${(props) => (props.showSort ? "#AD88C6" : "black")};
`;

export const UrlsDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
 
  @media only screen and (max-width: 600px) {
    margin-top: 5px;
  }
`;
export const StyledP = styled.span`
  color: black;
  opacity: 60%;
  margin-left: 15px;
`;