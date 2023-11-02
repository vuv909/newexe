import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  background-color: white;
  width: 100%;
  z-index: 4;
  display: flex;
  justify-content: space-evenly;
  height: 70px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Add box shadow here */
  position: fixed;
  top: 0;
`;

const Left = styled.div`
  flex-basis: 70%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Logo = styled.div`
  cursor: pointer;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const TextLogo = styled.h5`
  font-family: "myFont", sans-serif;
`;

const Right = styled.div`
  flex-basis: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const LoginControler = styled.div`
  width: 25%;
`;
const SignupControler = styled.div`
   width: 25%;
`;

const ButtonL = styled.button`
  padding: 8px;
  font-weight: bolder;
  border: 0.5px solid rgb(192, 192, 192);
  background-color: white;
  border-radius: 5%;
  cursor: pointer;
  width: 100%;
  &:hover{
    background-color: rgb(209, 205, 205);
  }
`;

const ButtonS = styled.button`
font-weight: bolder;
  padding: 8px;
  border: none;
  color: white;
  background-color: orange;
  border-radius: 5%;
  cursor: pointer;
  width: 100%;
  &:hover{
    background-color:rgb(245, 191, 92);
  }
`;

const InputController = styled.div`
  width: 30%;
  display: flex;
  border: 1px solid rgb(217, 212, 212);
  height: 60%;
`;

const InputOne = styled.div`
  width: 100%;
`;

const InputTwo = styled.div`
  width: 100%;
`;

const One = styled.input`
  outline: none;
  height: 100%;
  width: 100%;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-color: rgb(217, 212, 212);
`;

const Two = styled.input`
  height: 100%;
  width: 100%;
  border: none;
`;

const Icon = styled.div`
  cursor: pointer;
  width: 20%;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
const ImgLogo = styled.img`
  width: auto;
  height: 80px;
  animation: rotate 4s  infinite; /* Define animation properties */

  @keyframes rotate {
    100% {
      transform: rotate(360deg); /* Rotate the image 360 degrees */
    }
  }
`;
const Navbar = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const notify = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleSearch = () => {
    if (text.trim() === "") {
      notify("Vui lòng không để trống trường tìm kiếm !!! ");
    } else {
      navigate(`/search/${text}`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (text.trim() === "") {
        notify("Vui lòng không để trống trường tìm kiếm !!! ");
      } else {
        handleSearch();
      }
    }
  };
  return (
    <Container>
      <Left>
        <Logo onClick={() => navigate('/')}>
          <ImgLogo src={require("../asset/logo.png")} />
          <TextLogo>Măm Măm</TextLogo>
        </Logo>

        <InputController>
          <InputOne onKeyDown={handleKeyDown}>
            <One
              placeholder="Điền tên món ăn , quán ăn..."
              onChange={(e) => setText(e.target.value)}
            />
          </InputOne>
          <Icon onClick={handleSearch} onKeyDown={handleKeyDown}>
            <SearchIcon />
          </Icon>
        </InputController>
      </Left>
      <Right>
        <LoginControler>
          <ButtonL>Đăng nhập</ButtonL>
        </LoginControler>
        <SignupControler>
          <ButtonS>Đăng kí</ButtonS>
        </SignupControler>
      </Right>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Container>
  );
};

export default Navbar;
