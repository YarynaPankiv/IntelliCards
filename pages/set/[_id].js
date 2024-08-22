import CardBox from "@/components/Card/CardsBox";
import CardsInSetGrid from "@/components/Card/CardsInSetGrid";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Nav from "@/components/Navigation";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Card } from "@/models/Card";
import { CardSet } from "@/models/CardSet";
import { User } from "@/models/User";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/Contexts/AccountContext";
import { Progress } from "@/models/Progress";
import { UnfinishedCardsContext } from "@/components/UnfinishedCardsContext";


export default function SetPage({ _id, cardSet, users, progresses }) {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [progress, setProgress] = useState(null);
  const { unfinishedCards, setUnfinishedCards } = useContext(UnfinishedCardsContext);
  const set = cardSet;
  const router = useRouter();

  useEffect(() => {
    if (set) {
      setCards(set.cards);
    }
  }, [set._id]);

  useEffect(() => {
    if (user && set) {
      setIsOwner(user.data._id === set.userId);
    }
  }, [user, set]);

  useEffect(() => {
    if (user && user.data) {
      const currentProgress = progresses.find(
        (prog) => prog.userId === user.data._id && prog.cardSetsId === set._id
      );
      setProgress(currentProgress);
    }
  }, [progresses, user, set._id]);

  const resetProgress = async () => {
    const newPassedCards = 0;
    const newPassingPercentage = 0;
    const newCorrectCards = [];

    try {
      const response = await axios.put("/api/progress", {
        _id: progress._id,
        passedCards: newPassedCards,
        passingPercentage: newPassingPercentage,
        correctCards: newCorrectCards,
        cardSetsId: set._id,
        userId: user.data._id,
      });
      setProgress(response.data.data);
      console.log("Progress reset successfully", response.data);
    } catch (error) {
      console.error("Error resetting progress", error);
    }
  };

  const filterCards = () => {
    if (set && progress) {
      if (progress.passingPercentage === 100) {
        resetProgress();
      } else {
        const sorted = set.cards.sort((a, b) => {
          const aIsCorrect = progress.correctCards.includes(a._id);
          const bIsCorrect = progress.correctCards.includes(b._id);
          if (aIsCorrect && !bIsCorrect) return 1;
          if (!aIsCorrect && bIsCorrect) return -1;
          return 0;
        });
        setUnfinishedCards(sorted);
      }
    } else if (set) {
      setUnfinishedCards(set.cards);
    }
  };

  const handleStartStudy = async () => {
    if (!progress) {
      await handleAddProgress();
    }
    filterCards();
  };

  const handleAddProgress = async () => {
    try {
      const response = await axios.post("/api/progress", {
        passedCards: 0,
        passingPercentage: 0,
        cardSetsId: _id,
        userId: user.data._id,
      });
      setProgress(response.data.data);
    } catch (error) {
      console.error("Error adding progress", error);
    }
  };

  const handleDeleteSet = async () => {
    try {
      await axios.delete(`/api/cardSet`, {
        data: { cardSetId: _id },
      });
      alert("Набір успішно видалено!");
      router.push("/");
    } catch (error) {
      alert("Помилка при видаленні набору");
    }
  };

  return (
    <Center>
      <Header />
      <Nav page={set.name} />
      <Container>
        <ButtonAndBox>
          <CardBox card={set} users={users} />
          <StyledLink href={"/set/study/" + _id}>
            <Button onClick={handleStartStudy}>
              Перейти до вивчення
            </Button>
          </StyledLink>
          {isOwner && (
            <>
              <StyledLink href={"/edit/" + _id}>
                <Button>Редагувати набір</Button>
              </StyledLink>
              <Button onClick={handleDeleteSet}>Видалити набір</Button>
            </>
          )}
        </ButtonAndBox>
        <CardsInSetGrid cards={cards} users={users} />
      </Container>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.query;
  const cardSet = await CardSet.findById(_id).populate("cards");
  const allCards = await Card.find({});
  const users = await User.find({});
  const progresses = await Progress.find({ cardSetsId: _id });

  return {
    props: {
      _id: _id.toString(),
      cardSet: JSON.parse(JSON.stringify(cardSet)),
      allCards: JSON.parse(JSON.stringify(allCards)),
      users: JSON.parse(JSON.stringify(users)),
      progresses: JSON.parse(JSON.stringify(progresses)),
    },
  };
}

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 200px;
  height: 51px;
  background: #c5e898;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #75c113;
    color: white;
  }
`;

const ButtonAndBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;