import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CardSet } from "@/models/CardSet";
import axios from "axios";
import styled from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Nav from "@/components/Navigation";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditSetPage({ _id, cardSet }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cards, setCards] = useState([{ question: "", answer: "" }]);
  const [isPublic, setIsPublic] = useState(false);
  const [ratings, setRatings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (cardSet) {
      setName(cardSet.name);
      setCategory(cardSet.category);
      setCards(cardSet.cards);
      setIsPublic(cardSet.IsPublic);
      setRatings(cardSet.ratings || []);
    }
  }, [cardSet]);

  console.log(cards);

  const handleEditSet = async () => {
    const newCardsIds = [];
    try {
      // Оновлення існуючих карток
      try {
        for (const card of cards) {
          if (card._id) {
       
            const updatedCard = await axios.put("/api/newCard", {
              _id: card._id,
              question: card.question,
              answer: card.answer,
              image: "",
            });
            console.log(updatedCard);
            newCardsIds.push(card._id); 
          } else {
      
            const newCard = await axios.post("/api/newCard", {
              question: card.question,
              answer: card.answer,
              image: "",
            });
            console.log(newCard);
            newCardsIds.push(newCard.data.data._id); 
          }
        }
      } catch (error) {
        console.error("Error during editing  cards", error);
      }
      await axios.put(`/api/cardSet`, {
        _id,
        name,
        category,
        cards: newCardsIds,
        countCards: cards.length,
        IsPublic: isPublic,
        ratings
      });
    } catch (error) {
      console.error("Error editing set:", error);
    }
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

  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };
  const handleDeleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };
  

  return (
    <Center>
      <Header />
      <Nav page="Редагувати набір" />

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

      <StyledText>Редагувати питання та відповіді</StyledText>

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
      <StyledAddCard>
        <AddCard onClick={handleAddCard}>Додати ще одну картку</AddCard>
      </StyledAddCard>
      <CheckBoxDiv>
        <CheckBox
          type="checkbox"
          id="isPublic"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />

        <label htmlFor="isPublic">Зробити публічним</label>
      </CheckBoxDiv>
 
      <AddSet onClick={handleEditSet}>Зберегти зміни</AddSet>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.query;
  const cardSet = await CardSet.findById(_id).populate("cards");

  return {
    props: {
      _id: _id.toString(),
      cardSet: JSON.parse(JSON.stringify(cardSet)),
    },
  };
}
const StyledAddCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const DeleteIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 555;
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

const StyledQuestionDiv = styled.div`
  display: flex;
  justify-content: space-between; // Aligns question and answer inputs
  align-items: center; // Aligns vertically within each question div
  height: 110px;
  background-color: #f3f3f3;
  width: 1000px;
  border-radius: 10px;
  gap: 20px; // Spacing between question and answer inputs
  margin-bottom: 30px;
  position: relative;
  font-family: "Montserrat", sans-serif;
`;

const StyledCardInput = styled.input`
  padding: 20px 5px;
  width: 400px;
  font-size: 16px;
  height: 36px;
  border: none;
  border-bottom: 0.5px solid black;
  outline: none;
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

const StyledText = styled.p`
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  margin-top: 30px;
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
