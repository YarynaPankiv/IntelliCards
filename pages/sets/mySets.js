import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Nav from "@/components/Navigation";

import { useAuth } from "@/Contexts/AccountContext";
import { useEffect, useState } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { CardSet } from "@/models/CardSet";
import CardSetsGrid from "@/components/Card/CardSetsGrid";
import { User } from "@/models/User";
import { Progress } from "@/models/Progress";

export default function MySets({ cardSets, users, progresses }) {
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);
  const [myCardSets, setMyCardSets] = useState([]);
  const [isMySetsClicked, setIsMySetsClicked] = useState(false);
  const [progressSet, setProgressSet] = useState([]);

  useEffect(() => {
    if (user && user.data) {
      setUserId(user.data._id);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const filteredCardSets = cardSets.filter(
        (cardSet) => cardSet.userId === userId
      );
      setMyCardSets(filteredCardSets);
    }
  }, [userId, cardSets]);

  useEffect(() => {
    if (user && user.data) {
      const filteredProgress = progresses.filter(
        (progress) => progress.userId === user.data._id
      );
      const sets = filteredProgress.map((progress) => progress.cardSetsId).filter(set => set);
      setProgressSet(sets);
    }
  }, [user, progresses]);

  const handleShowMySets = () => {
    setIsMySetsClicked(true);
  };

  const handleShowLearningProgress = () => {
    setIsMySetsClicked(false);
  };

  return (
    <>
      <Header />
      <Nav page={"Мої набори"} />
      <Center>
        <Wrapper>
          <Menu>
            <Button onClick={handleShowMySets} isActive={isMySetsClicked}>
              Створені мною
            </Button>
            <Button
              onClick={handleShowLearningProgress}
              isActive={!isMySetsClicked}
            >
              Прогрес вивчення
            </Button>
          </Menu>
          <MySetsDiv>
            {isMySetsClicked && myCardSets && (
              <GridDiv>
                <CardSetsGrid
                  allCardSets={myCardSets}
                  category={""}
                  users={users}
                  title={"Мої набори"}
                />
              </GridDiv>
            )}
            {!isMySetsClicked && progressSet && (
              <GridDiv>
                <CardSetsGrid
                  allCardSets={progressSet}
                  category={""}
                  users={users}
                  title={"Прогрес вивчення"}
                  progresses={progresses}
                />
              </GridDiv>
            )}
          </MySetsDiv>
        </Wrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  const cardSets = await CardSet.find({}).populate("cards");
  const users = await User.find({});
  const progresses = await Progress.find({}).populate("cardSetsId");

  return {
    props: {
      cardSets: JSON.parse(JSON.stringify(cardSets)),
      users: JSON.parse(JSON.stringify(users)),
      progresses: JSON.parse(JSON.stringify(progresses)),
      search: context.query?.search || "",
    },
  };
}

const Wrapper = styled.div`
  display: flex;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 55px;
`;

const Button = styled.button`
  background-color: ${({ isActive }) => (isActive ? "#c5e898" : "#D9D9D9")};
  border: none;
  font-family: "Montserrat", sans-serif;
  border-radius: 20px;
  font-size: 16px;
  width: 200px;
  height: 40px;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  &:hover {
    background-color: ${({ isActive }) => (isActive ? "green" : "#75c113")};
    color: ${({ isActive }) => (isActive ? "white" : "black")};
  }
`;

const MySetsDiv = styled.div`
  width: 730px;
  border-radius: 15px;
  margin-left: 25px;
  margin-top: 30px;
  height: auto;
`;

const GridDiv = styled.div`
  width: 740px;
`;
