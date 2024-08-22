import { useEffect, useState } from "react";
import styled from "styled-components";

export default function CategoriesBox({ cardSets, onClick }) {
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("");
  useEffect(() => {
    const catArray = [];
    cardSets.forEach((set) => {
      if (!catArray.includes(set.category)) {
        catArray.push(set.category);
      }
    });

    setCategories(catArray);
  }, [cardSets]);

  const handleCategoryClick = (category) => {
    onClick(category);
    setChosenCategory(category);
  };
  return (
    <CategoriesDiv>
      <Div>
        <StyledP>Категорії</StyledP>
        <CategoriesP
          $chosenCategory={chosenCategory === ""}
          onClick={() => handleCategoryClick("")}
        >
          Всі
        </CategoriesP>
        {categories.map((category) => {
          return (
            <CategoriesP
              key={category}
              $chosenCategory={chosenCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </CategoriesP>
          );
        })}
      </Div>
    </CategoriesDiv>
  );
}

const CategoriesDiv = styled.div`
  width: 247px;
  max-height: 500px;
  overflow-y: scroll;
  background: #f3f3f3;
  border-radius: 10px;
  margin-top: 20px;
  padding: 0;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
`;
const StyledP = styled.p`
  font-size: 20px;
  margin: 0;
  font-weight: 600;
  margin-bottom: 10px;
`;
const CategoriesP = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 5px;
  color: ${(props) => (props.$chosenCategory ? "#2D9B05" : "black")};
  user-select: none;
  cursor: pointer;
`;
