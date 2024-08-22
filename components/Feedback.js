import { useState, useEffect } from "react";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import { useAuth } from "@/Contexts/AccountContext";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddFeedback({ set, onClose }) {
    const router = useRouter();
    const [rate, setRate] = useState(0);
    const { user } = useAuth();
  
    const handleSubmit = async () => {
        try {
          const updatedRatings = [...set.ratings, rate];
          await axios.put(`/api/cardSet`, {
            _id: set._id,
            ratings: updatedRatings,
          });
    
          onClose();
          router.push("/sets/mySets");

        } catch (error) {
          console.error("Error submitting rating:", error);
        }
      };
  
    return (
      <ModalOverlay>
        <ModalContent>
          <FeedbackBox>
            <Title>Ви вивчити весь набір!</Title>
            <Title>Оцініть його!</Title>
            <Rating
              name="half-rating"
              value={rate}
              precision={0.5}
              onChange={(event, newValue) => setRate(newValue)}
            />
            <CenterButton>
              <Button onClick={handleSubmit}>Надіслати</Button>
            </CenterButton>
          </FeedbackBox>
        </ModalContent>
      </ModalOverlay>
    );
  }
  
  const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;
  
  const ModalContent = styled.div`
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `;
  
  const FeedbackBox = styled.div`
    width: 370px;
    height: auto;
    border: 1px solid rgba(0, 0, 0, 0.21);
    border-radius: 10px;
    padding: 10px 20px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  
  const Title = styled.p`
    font-size: 20px;
    font-weight: 600;
  `;
  
  const CenterButton = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `;
  
  const Button = styled.button`
    width: 155.51px;
    height: 37.13px;
    border-radius: 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 500;
    border: 2px solid #75C113;
    color: #75C113;
    margin-top: 25px;
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;
    &:hover{
        background-color: #C5E898;
        border: none;
        color: black;
    }
  `;