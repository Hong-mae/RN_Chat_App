import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRouters";

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
      if(localStorage.getItem("chat-app-user")) {
        navigate('/');
      }
    },[])
    
    const onSubmit = async (event) => {
        event.preventDefault();
        if (onValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }

            if (data.status === true) {
                localStorage.setItem(
                    "chat-app-user",
                    JSON.stringify(data.user)
                );

                navigate("/");
            }
        }
    };

    const onValidation = () => {
        const { password, username } = values;

        if (password === "") {
            toast.error(
                "이메일, 닉네임 및 비밀번호는 필수 입력값입니다.",
                toastOptions
            );

            return false;
        } else if (username.length === "") {
            toast.error(
                "이메일, 닉네임 및 비밀번호는 필수 입력값입니다.",
                toastOptions
            );

            return false;
        }

        return true;
    };

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormConainer>
                <form onSubmit={onSubmit}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>Moong-Bee</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        name="username"
                        onChange={onChange}
                        min={3}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={onChange}
                    />
                    <button type="submit">Login</button>
                    <span>
                        Don't have an account? <Link to="/register">register</Link>
                    </span>
                </form>
            </FormConainer>
            <ToastContainer />
        </>
    );
}

const FormConainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #392151;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        img {
            height: 5rem;
        }

        h1 {
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
    }

    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4f00a3;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;

        &:focus {
            border: 0.1rem solid #c28aff;
            outline: none;
        }
    }

    button {
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

    span {
        text-transform: uppercase;
        color: white;

        a {
            color: #c28aff;
            font-weight: bold;
            text-decoration: none;
        }
    }
`;

export default Login;
