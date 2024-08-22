import styled from "styled-components"
import FlipSvg from "../svg/FlipSvg"

export default function CardsInSetGrid({cards}){
    return(
        <Div>
            <StyledP>Попередній перегляд</StyledP>
            {cards.map((card, index) => (
                <CardsDiv key={card._id}>
                    <Card>
                        <CardNumberP>Карточка {index + 1}</CardNumberP>
                        <StyledTextDiv>
                           <StyledText>{card.question}</StyledText>
                        </StyledTextDiv>
                        
                    </Card>
                    <SvgDiv>
                        <FlipSvg />
                    </SvgDiv>
                    <Card>
                        <CardNumberP>Карточка {index + 1}</CardNumberP>
                        <StyledTextDiv>
                           <StyledText>Відповідь: {card.answer}</StyledText>
                            
                        </StyledTextDiv>

                    </Card>
                </CardsDiv>
            ))}

        </Div>

    )
}

const Div = styled.div`
 width: 739px;
 height: auto;
 background: #F3F3F3;
 border-radius: 10px;
`
const StyledP = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-top: 25px;
  margin-left: 25px;
`
const CardsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 25px;

`
const Card = styled.div`
  width: 282px;
  height: 160px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center;

`
const SvgDiv = styled.div`
  margin: 0px 35px;
`

const CardNumberP = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #2D9B05;
`

const StyledTextDiv = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
  
`

const StyledText = styled.p`
  
`