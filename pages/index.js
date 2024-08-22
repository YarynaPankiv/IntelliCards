import CardSetsGrid from "@/components/Card/CardSetsGrid";
import CategoriesBox from "@/components/Categories";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Search from "@/components/Search";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { mongooseConnect } from "@/lib/mongoose";
import { CardSet } from "@/models/CardSet";
import { User } from "@/models/User";


export default function Home({ cardSets, users }) {
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  console.log(cardSets);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  

  return (
    <Center>
      <Header />
      <Search setSearchQuery={setSearchQuery}/>
      <CategoriesAndGridDiv>
        <CategoriesAndButton>
          <CategoriesBox
            cardSets={cardSets}
            onClick={handleCategoryClick}
          />
          <StyledLink href={"/top_users"}>
            <Button>Топ користувачів</Button>
          </StyledLink>
        </CategoriesAndButton>
        <CardSets>
           <CardSetsGrid allCardSets={cardSets} category={selectedCategory} users={users} title={"Набори карточок"} searchQuery={searchQuery}/>
        </CardSets>
      </CategoriesAndGridDiv>
    </Center>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  
  const cardSets = await CardSet.find({ IsPublic: true });
  const users = await User.find({});

  return {
    props: {
      cardSets: JSON.parse(JSON.stringify(cardSets)),
      users: JSON.parse(JSON.stringify(users)),
      search: context.query?.search || "",
    },
  };
}

const CardSets = styled.div`
  width: 730px;
 
`

const CategoriesAndGridDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategoriesAndButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  width: 200px;
  height: 45px;
  background: #c5e898;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  font-size: 17px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-top: 25px;
  transition: background-color 1 ease; /* Add transition effect to background-color */
  &:hover {
    background-color: #75c113;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
