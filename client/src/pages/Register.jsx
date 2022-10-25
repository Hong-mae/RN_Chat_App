import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRouters";

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (onValidation()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
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
        const { password, confirmPassword, username, email } = values;

        if (password !== confirmPassword) {
            toast.error(
                "비밀번호와 비밀번호 확인이 맞지 않습니다.",
                toastOptions
            );

            return false;
        } else if (username.length < 3) {
            toast.error("이름은 3글자 이상이여야합니다.", toastOptions);

            return false;
        } else if (password.length < 8) {
            toast.error("비밀번호는 8글자 이상이여야합니다.", toastOptions);

            return false;
        } else if (email === "") {
            toast.error("이메일은 필수 입력값입니다.", toastOptions);

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
                        placeholder="Username"
                        name="username"
                        onChange={onChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={onChange}
                    />
                    <button type="submit">Create User</button>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
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

export default Register;
