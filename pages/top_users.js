import Center from "@/components/Center";
import Header from "@/components/Header";
import Nav from "@/components/Navigation";
import styled from "styled-components";
import { User } from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";
import { useAuth } from "@/Contexts/AccountContext";

export default function TopUsersPage({ users }) {
  const { user: currentUser } = useAuth();

  return (
    <Center>
      <Header />
      <Nav page={"Топ користувачів"} />
      <UsersDiv>
        {users &&
          users.map((user, index) => (
            <UserDiv
              key={user._id}
              isCurrentUser={currentUser && currentUser.data._id === user._id}
            >
              <StyledOrder>{index + 1}.</StyledOrder>
              <StyledName>{user.name}</StyledName>
              <StyledSurname>{user.surname}</StyledSurname>
              <StyledPoints>{user.points}</StyledPoints>
              <StyledStar
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6328 1.07585L12.7359 5.6443C12.815 5.81623 12.9412 5.96479 13.1011 6.07446C13.2611 6.18414 13.449 6.25091 13.6453 6.26781L18.7687 6.70531C19.3484 6.78567 19.5797 7.46275 19.1594 7.85263L15.3 10.9404C14.9875 11.1904 14.8453 11.5833 14.9312 11.9628L16.0531 16.9642C16.1516 17.5133 15.5469 17.933 15.0281 17.6726L10.5562 15.1785C10.3876 15.0842 10.1956 15.0345 9.99999 15.0345C9.80443 15.0345 9.6124 15.0842 9.44374 15.1785L4.97187 17.6711C4.45468 17.93 3.84843 17.5119 3.94687 16.9628L5.06874 11.9613C5.15312 11.5818 5.01249 11.1889 4.69999 10.9389L0.839054 7.85412C0.420304 7.46573 0.651554 6.78716 1.22968 6.7068L6.35312 6.2693C6.54942 6.2524 6.73735 6.18562 6.89731 6.07595C7.05727 5.96627 7.18338 5.81772 7.26249 5.64579L9.36562 1.07733C9.62655 0.577335 10.3734 0.577335 10.6328 1.07585Z"
                  fill="#FDD835"
                />
                <path
                  d="M10.4797 5.91821L10.1234 2.55214C10.1094 2.36464 10.0687 2.04321 10.3844 2.04321C10.6344 2.04321 10.7703 2.53875 10.7703 2.53875L11.8391 5.24113C12.2422 6.2694 12.0766 6.62208 11.6875 6.83042C11.2406 7.06851 10.5812 6.8825 10.4797 5.91821Z"
                  fill="#FFFF8D"
                />
                <path
                  d="M14.8875 10.6414L17.9531 8.36313C18.1047 8.2426 18.3781 8.05063 18.1594 7.83188C17.986 7.65927 17.5172 7.90778 17.5172 7.90778L14.8344 8.90629C14.0344 9.16968 13.5031 9.55956 13.4563 10.0506C13.3953 10.7054 14.0125 11.2099 14.8875 10.6414Z"
                  fill="#F4B400"
                />
              </StyledStar>
            </UserDiv>
          ))}
      </UsersDiv>
    </Center>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  const users = await User.find({});
  users.sort((a, b) => b.points - a.points);

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}

const StyledStar = styled.svg`
  margin-right: 15px;
`;
const StyledOrder = styled.span`
  margin-left: 10px;
  font-weight: bold;
`;
const StyledName = styled.span`
  margin-left: 20px;
  margin-right: 10px;
  font-weight: 600;
`;
const StyledSurname = styled.span`
  font-weight: 600;
`;
const StyledPoints = styled.span`
  margin-left: auto;
  margin-right: 10px;
`;
const UsersDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`;
const UserDiv = styled.div`
  width: 743.85px;
  height: 61px;
  background: #f3f3f3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  border: ${(props) =>
    props.isCurrentUser
      ? "2px solid #C5E898"
      : "none"}; 
`;
