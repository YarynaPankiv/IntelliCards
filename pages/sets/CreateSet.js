import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Nav from "@/components/Navigation";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useAuth } from "@/Contexts/AccountContext";
import { userAgent } from "next/server";

export default function CreateSet() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cards, setCards] = useState([{ question: "", answer: "" }]);
  const [userId, setUserId] = useState(null);

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      setUserId(user.data._id);
    }
  }, [user]);

  const newCardsId = [];

  async function addCards() {
    try {
      for (const card of cards) {
        const newCard = await axios.post("/api/newCard", {
          question: card.question,
          answer: card.answer,
          image: "",
        });
        newCardsId.push(newCard.data.data._id);
      }
    } catch (error) {
      console.error("Error during adding cards", error);
    }
  }

  const handleCreateSet = async () => {
    await addCards();

    try {
      const ispublic = document.getElementById("checkboxId").checked;
      const newCardSet = await axios.post("/api/cardSet", {
        name,
        category,
        cards: newCardsId,
        countCards: newCardsId.length,
        userId,
        rating: 0,
        IsPublic: ispublic, 
        ratings: []
      });
      setName("");
      setCategory("");
      setCards([{ question: "", answer: "" }]);
    } catch (error) {
      console.error("Error creating card set", error);
    }
  };

  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  const handleQuestionChange = (index, value) => {
    const newCards = [...cards];
    newCards[index].question = value;
    setCards(newCards);
  };

  const handleAnswerChange = (index, value) => {
    const newCards = [...cards];
    newCards[index].answer = value;
    setCards(newCards);
  };

  const handleDeleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  return (
    <Center>
      <Header />
      <Nav page="Створити набір" />

      <StyledDiv>
        <StyledInput
          placeholder="Введіть назву..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledInput
          placeholder="Введіть категорію..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </StyledDiv>

      <StyledText>Додати карточки</StyledText>

      {cards.map((card, index) => (
        <StyledQuestionDiv key={index}>
          <DeleteIcon onClick={() => handleDeleteCard(index)}>
            <FontAwesomeIcon icon={faTimes} />
          </DeleteIcon>
          <StyledCardInput
            placeholder="Питання"
            value={card.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
          />
          <StyledCardInput
            placeholder="Відповідь"
            value={card.answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </StyledQuestionDiv>
      ))}
      <ButtonDiv>
        <AddCard onClick={handleAddCard}>Додати ще одну картку</AddCard>
      </ButtonDiv>
      <CheckBoxDiv>
        <CheckBox type="checkbox" id="checkboxId" />
        <label htmlFor="checkboxId">Зробити публічним</label>
      </CheckBoxDiv>

      <AddSet onClick={handleCreateSet}>Створити набір</AddSet>
    </Center>
  );
}
const DeleteIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 555;
`;

const CheckBoxDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

const AddCard = styled.button`
  width: 300px;
  height: 50px;
  text-align: center;
  font-weight: bold;
  background-color: #f3f3f3;
  border: none;
  margin-top: 20px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  border: 2px solid #75c113;
  color: #75c113;
  transition: background-color 1 ease;
  &:hover {
    background-color: #75c113;
    color: white;
  }
`;
const AddSet = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 15px;
  margin-top: 50px;
  background-color: #c5e898;
  font-weight: bold;
  margin-left: 350px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 1 ease;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 25px;
  &:hover {
    background-color: #75c113;
  }
`;
const StyledText = styled.p`
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;
const StyledInput = styled.input`
  width: 800px;
  height: 50px;
  border-radius: 15px;
  background-color: #f3f3f3;
  border: none;
  outline: none;
  padding-left: 10px;

  &::placeholder {
    font-family: "Montserrat", sans-serif;
    line-height: 50px;
    font-size: 15px;
  }
`;

const StyledCardInput = styled.input`
  padding: 20px 5px;
  width: 400px;
  font-size: 16px;
  height: 36px;
  margin-top: 30px;
  border: none;
  border-bottom: 0.5px solid black;
  outline: none;
  margin-left: 20px;
  background-color: #f3f3f3;
  &::placeholder {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    padding-bottom: 20px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  margin-top: 20px;
  width: 1000px;
  & > ${StyledInput}:first-child {
    margin-right: 50px;
  }
`;
const StyledQuestionDiv = styled.div`
  display: flex;
  height: 110px;
  background-color: #f3f3f3;
  width: 1000px;
  border-radius: 10px;
  gap: 95px;
  margin-bottom: 30px;
  position: relative;
  font-family: "Montserrat", sans-serif;
`;

const ButtonDiv = styled.div``;
