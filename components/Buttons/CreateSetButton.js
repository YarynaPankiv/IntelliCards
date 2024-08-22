import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuth } from "@/Contexts/AccountContext";

export default function CreateSetButton({ children }) {
    const router = useRouter();
    const {user} = useAuth();

    const handleClick = () => {
        if(user){
            router.push("/sets/CreateSet"); 
        }
        else{
            router.push("/login"); 
        }

    };

    return (
        <StyledButton onClick={handleClick}>
            {children}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    width: 180px;
    height: 40px;
    margin-left: 40px;
    border-radius: 20px;
    border: none;
    font-weight: bold;
    font-size: 16px;
    border: 2px solid  #75c113;
    color: #75C113;
    cursor: pointer;
    transition: background-color 1.0 ease; /* Add transition effect to background-color */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    &:hover {
        background-color: #75C113;
        color: white;
    }
`;
