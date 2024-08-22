import styled from "styled-components";

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}

const StyledDiv = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;