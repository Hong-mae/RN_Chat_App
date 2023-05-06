import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import styled from "styled-components";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRouters";
window.Buffer = window.Buffer || require("buffer").Buffer;

export default function SetAvatar() {
    const api = "https://api.multiavatar.com";
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        } else {
            createAvatar();
        }
    }, []);

    const createAvatar = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(
                `${api}/${Math.round(
                    Math.random() * 1000
                )}?apikey=BQ40fGYWKZjmIF`
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
    };

    const onSetProfile = async () => {
        if (selectedAvatar === undefined) {
            toast.error("아바타를 선택해주세요", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })

            if(data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/")
            } else {
                toast.error("아바타 설정 오류", toastOptions)
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>당신의 아바타를 선택하세요</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`avatar ${
                                        selectedAvatar === index
                                            ? "selected"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button className="submit-btn" onClick={onSetProfile}>
                        프로필 사진 설정하기
                    </button>
                </Container>
            )}
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
            color: white;
        }
    }

    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
            }
        }

        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }

    .submit-btn {
        background-color: #c28aff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        transition: 0.5s ease-in-out;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;

        &:hover {
            background-color: #4f00a3;
        }
    }
`;
