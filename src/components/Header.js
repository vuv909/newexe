import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popular } from "../data.js";
import Carousel from "react-bootstrap/Carousel";
import StarIcon from "@mui/icons-material/Star";
import "bootstrap/dist/css/bootstrap.min.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%; /* Adjust the width as needed */
  /* overflow: hidden; */
  margin-top: 5%;
  margin-bottom: 8%;
`;
const ControlSilde = styled.div``;
const Buttoncontroller = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const ButtonOrder = styled.button`
  border: none;
  padding: 5px;
  border-radius: 1%;
  width: 45%;
  background-color: rgb(201, 199, 199);
  &:hover {
    background-color: grey;
  }
`;
const ButtonTable = styled.button`
  border: none;
  padding: 5px;
  width: 45%;
  border-radius: 1%;
  background-color: orange;
  color: white;
  &:hover {
    background-color: rgb(200, 151, 59);
  }
`;

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "orange",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const Header = () => {
  const [currentHour, setCurrentHour] = useState(null);
  const navigate = useNavigate()
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    pauseOnHover: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  useEffect(() => {
    const currentDate = new Date();
    const hour = currentDate.getHours();
    setCurrentHour(hour);
  }, []);

  return (
    <Container style={{ height: "auto", width: "100%" }}>
      <div className="container" style={{ width: "85%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ color: "orange" }}>
            <LocalFireDepartmentIcon style={{ fontSize: "40px" }} />
          </span>
          &nbsp; Những quán ăn đang hot ở Hòa Lạc &nbsp;
          <span style={{ color: "orange" }}>
            <LocalFireDepartmentIcon style={{ fontSize: "40px" }} />
          </span>
        </h2>
        <Slider {...settings}>
          {popular.map((p, index) => (
            <div
              onClick={()=>navigate(`/food/${p.id}`)}
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <ControlSilde
                style={{
                  width: "98%",
                  cursor: "pointer",
                  borderRadius: "3%",
                  marginRight: "auto",
                  marginLeft: "auto",
                  border: "1px solid rgb(181, 179, 179)",
                }}
              >
                <img
                  src={require(`../asset/${p.img}`)}
                  alt={p.name}
                  style={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "3%",
                    borderTopRightRadius: "3%",
                  }}
                />
                <div
                  style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginTop: "10px",
                    marginRight: "auto",
                  }}
                >
                  <h5>{p.name}</h5>
                  <p>
                    Đánh giá : {p.mark}
                    <span style={{ color: "rgb(205, 205, 7)" }}>
                      <StarIcon />
                    </span>
                    /10
                    <span style={{ color: "rgb(205, 205, 7)" }}>
                      <StarIcon />
                    </span>
                  </p>
                  {p.open > currentHour ? (
                    <p>
                      <span style={{ color: "red" }}>
                        <DoorFrontIcon />
                      </span>
                      Đóng cửa đến {p.open} giờ
                    </p>
                  ) : (
                    <p>
                      <span style={{ color: "green" }}>
                        <MeetingRoomIcon />
                      </span>
                      Mở cửa đến {p.close} giờ
                    </p>
                  )}
                  <p>
                    <LocationOnIcon />
                    {p.address}
                  </p>

                  <Buttoncontroller>
                    <ButtonOrder>Đặt đồ</ButtonOrder>
                    {p.reverse && <ButtonTable>Đặt bàn</ButtonTable>}
                  </Buttoncontroller>
                </div>
              </ControlSilde>
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default Header;
