import styled from "styled-components";
import SearchSvg from "./svg/SearchSvg";
import FilterSvg from "./svg/FilterSvg";

export default function Search({setSearchQuery}) {
  return (
    <Div>
      <SearchBar placeholder="Пошук.." onChange={(e) => setSearchQuery(e.target.value)}/>
      {/* <FilterButton>
        <FilterSvg />
        <ButtonText>Фільтри</ButtonText>
      </FilterButton> */}
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 37px;
  background: rgba(209, 220, 202, 0.24);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  padding: 0px 20px;
  outline: none;

  &::placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; 
  }
`;

const FilterButton = styled.button`
  display: flex; 
  align-items: center; 
  width: 189px;
  height: 37px;
  background: #C5E898;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin-left: 32px;
  margin-right: 0;
  padding: 0;
  cursor: pointer;
  
  transition: background-color 1.0 ease; /* Add transition effect to background-color */
    &:hover {
        background-color: #75C113;
    }
`;

const ButtonText = styled.span`
  margin-left: 35px; 
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
`;
