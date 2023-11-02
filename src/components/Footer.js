import React, { useEffect } from "react";
import styled from "styled-components";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Aos from "aos";
import "aos/dist/aos.css";
import { mobile } from "../responsive";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 500;
  width: 100%;
  gap: 10px;
`;

const Left = styled.div`
  text-align: center;
  font-size: xx-large;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 3;
  color: black;

  border-radius: 20%;
  mix-blend-mode: darken;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  z-index: 3;
  color: black;

  border-radius: 20%;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  padding: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  &:hover {
    text-decoration: underline teal;
    transition: 0.5s ease;
    transform: translateX(5px);
  }
`;

const Right = styled.div`
  flex: 1;
  z-index: 3;

  color: black;

  border-radius: 10%;
`;

const Logo = styled.h1`
  font-family: "myFont", sans-serif;
`;
const DESC = styled.div`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-self: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline teal;
    transform: translateX(10px);
  }
`;

const VideoUpdate = styled.video`
  height: 100%;
  width: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  opacity: 0.8;
`;

const ContentAll = styled.div`
  width: 60%;
  margin: 50px;
  display: flex;
  background-color: white;
  z-index: 5;
  opacity: 0.7;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: orange;
  opacity: 0.5;
`;
const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Container style={{ backgroundColor: "teal", zIndex: 15 }}>
      <VideoUpdate muted autoPlay loop>
        <source src={require(`../asset/video.mp4`)} />
      </VideoUpdate>
      <Overlay></Overlay>
      <ContentAll>
        <Left>
          <div>
            <img src={require("../asset/logo.png")} width="8%" />
            <Logo>Măm Măm</Logo>
          </div>
          <DESC>
            Chúng tôi không đơn thuần là DỊCH VỤ mà chúng tôi là NGƯỜI BẠN của
            bạn
          </DESC>
        </Left>
      </ContentAll>
    </Container>
  );
};

export default Footer;
