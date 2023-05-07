import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoute } from "../utils/APIRouters";
import Contacts from "../components/Contacts";
import WelCome from "../components/WelCome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    // const

    const getCurrentUser = async () => {
        const currentUser = await JSON.parse(
            localStorage.getItem("chat-app-user")
        );
        setCurrentUser(currentUser);
    };

    const getCurrentUserAvatar = async () => {
        const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
        setContacts(data.data);
        setIsLoaded(true);
    };

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            getCurrentUser();
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                getCurrentUserAvatar();
            } else {
                navigate("/setAvatar");
            }
        }
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <Container>
            <div className="container">
                <Contacts
                    contacts={contacts}
                    currentUser={currentUser}
                    changeChat={handleChatChange}
                />
                {isLoaded && currentChat === undefined ? (
                    <WelCome currentUser={currentUser} />
                ) : (
                    <ChatContainer currentChat={currentChat} />
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (min-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat;
