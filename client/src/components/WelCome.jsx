import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.png";

export default function WelCome({ currentUser }) {
    return (
        <Container>
            <img src={Robot} alt="Robot" />
            <h1>
                Welcome, <span>{currentUser.username}</span>
            </h1>
            <h3>Plase select a chat to start message</h3>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 20rem;
        padding: 3rem;
    }
    span {
        color: #4e00ff;
    }
`;
