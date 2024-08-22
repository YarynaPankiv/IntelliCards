import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardSet } from "@/models/CardSet";
import { Progress } from "@/models/Progress";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  EffectCards,
} from "swiper/modules";
import ReactCardFlip from "react-card-flip";
import { useAuth } from "@/Contexts/AccountContext";
import AddFeedback from "@/components/Feedback";
import { UnfinishedCardsContext } from "@/components/UnfinishedCardsContext";
import Nav from "@/components/Navigation";

export default function StudyPage({ _id, cardSet, progresses }) {
  const [answer, setAnswer] = useState("");
  const set = cardSet;
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [result, setResult] = useState("");
  const [color, setColor] = useState("");
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [flips, setFlips] = useState({});
  const { unfinishedCards, setUnfinishedCards } = useContext(
    UnfinishedCardsContext
  );

  useEffect(() => {
    if (user && user.data) {
      const currentProgress = progresses.find(
        (prog) => prog.userId == user.data._id
      );
      setProgress(currentProgress);
    }
  }, [progresses, user]);

  useEffect(() => {
    if (set) {
      setAllCards(cardSet.cards);
    }
  }, [set._id]);

  useEffect(() => {
    setFilteredCards(unfinishedCards);
  }, [unfinishedCards]);

  const handleFlip = (index) => {
    setResult("");
    setFlips((prevFlips) => ({
      ...prevFlips,
      [index]: !prevFlips[index],
    }));
  };

  const handleAddProgress = async () => {
    if (progress) {
      let newCorrectCards = [
        ...progress.correctCards,
        filteredCards[currentCardIndex]._id,
      ];
      let newPassedCards = newCorrectCards.length;
      let newPassingPercentage = (newPassedCards / set.countCards) * 100;

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
        console.log("Progress updated successfully", response.data);
        await axios.put("/api/login", {
          _id: user.data._id,
          points: user.data.points + 5,
        });
  
        user.data.points += 5;
  
        if (response.data.data.passingPercentage === 100) {
          setShowFeedback(true);
        }
      } catch (error) {
        console.error("Error updating progress", error);
      }
    }
  };

  const handleOnButtonFlip = (index) => {
    if (!flips[index]) {
      setFlips((prevFlips) => ({
        ...prevFlips,
        [index]: !prevFlips[index],
      }));
    }

    if (
      answer.trim().toLowerCase() ===
      filteredCards[currentCardIndex].answer.trim().toLowerCase()
    ) {
      setResult("Правильно! +5 балів");
      setColor("green");
      handleAddProgress();
    } else {
      setResult("Не правильно!");
      setColor("red");
    }
  };

  const handleAnswerChange = (value) => {
    setAnswer(value);
    if (flips[currentCardIndex]) {
      setFlips((prevFlips) => ({
        ...prevFlips,
        [currentCardIndex]: !prevFlips[currentCardIndex],
      }));
    }
  };

  return (
    <Center>
      <Header />
      <Nav page={"Вивчення набору " + set.name} />
      <Wrapper>
        <Swiper
          effect={"coverflow"}
          spaceBetween={30}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, EffectCards]}
          className="swiper_container"
          onSlideChange={(swiper) => {
            setCurrentCardIndex(swiper.realIndex);
            setAnswer(""); // Clear the input field when the card is changed
          }}
        >
          {filteredCards.map((card, index) => (
            <SwiperSlide key={card._id}>
              <ReactCardFlip isFlipped={flips[index]} flipDirection="vertical">
                <FrontCard onClick={() => handleFlip(index)}>
                  <Card>
                    <CardCount>Карточка {index + 1}</CardCount>
                    <QuestionDiv>
                      <Question>{card.question}</Question>
                    </QuestionDiv>
                  </Card>
                </FrontCard>
                <BackCard onClick={() => handleFlip(index)}>
                  <Card>
                    <CardCount>Карточка {index + 1}</CardCount>
                    {result !== "" && <Result color={color}>{result}</Result>}
                    <QuestionDiv>
                      <Question>Відповідь: {card.answer}</Question>
                    </QuestionDiv>
                  </Card>
                </BackCard>
              </ReactCardFlip>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </div>
        </Swiper>
        <InputAndButton>
          <Input
            placeholder="Введіть відповідь..."
            value={answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
          ></Input>
          <ShowAnswerButton
            onClick={() => handleOnButtonFlip(currentCardIndex)}
          >
            Перевернути карточку
          </ShowAnswerButton>
        </InputAndButton>
      </Wrapper>
      {showFeedback && (
        <AddFeedback set={set} onClose={() => setShowFeedback(false)} />
      )}
    </Center>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.query;
  const cardSet = await CardSet.findById(_id).populate("cards");
  const progresses = await Progress.find({ cardSetsId: _id });

  return {
    props: {
      _id: JSON.parse(JSON.stringify(_id)),
      cardSet: JSON.parse(JSON.stringify(cardSet)),
      progresses: JSON.parse(JSON.stringify(progresses)),
    },
  };
}

const Wrapper = styled.div`
  width: 1000px;
  height: 619px;
  background: #f3f3f3;
  margin-top: 20px;
`;

const FrontCard = styled.div``;
const BackCard = styled.div``;

const Card = styled.div`
  width: 700px;
  height: 400px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 5px 20px;
`;

const CardCount = styled.p`
  position: absolute;
  color: #2d9b05;
  font-weight: 600;
  font-size: 24px;
  margin-top: 70px;
`;

const Question = styled.p`
  font-size: 24px;
  font-weight: 500;
`;

const QuestionDiv = styled.div`
  position: absolute;
  top: 39%;
`;

const InputAndButton = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Input = styled.textarea`
  width: 400px;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  outline: none;
  margin-left: 180px;
  margin-top: 25px;

  &::placeholder {
    color: #b0b0b0;
    font-family: "Montserrat", sans-serif;
  }
`;

const ShowAnswerButton = styled.button`
  width: 189px;
  height: 51px;
  background: #c5e898;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  cursor: pointer;
`;

const Result = styled.p`
  margin-top: 350px;
  font-weight: 800;
  color: ${(props) => props.color};
  align-self: flex-start;
  font-size: 20px;
`;
