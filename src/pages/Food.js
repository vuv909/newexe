import React, { useEffect, useRef, useState } from "react";
import { foods } from "../data.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import Navbar from "../components/Navbar.js";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../components/Footer.js";
import RiseLoader from "react-spinners/RiseLoader";
const Container = styled.div`
  margin-top: 80px;
  margin-bottom: 2%;
  margin-left: 15%;
  margin-right: 15%;
`;

const ImageController = styled.div`
  width: 95%;
  height: 350px; /* Set a fixed height for all images */
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ButtonOrder = styled.button`
  width: 50%;
  border: none;
  border-radius: 1%;
  padding: 10px;
  background-color: rgb(201, 199, 199);
  &:hover {
    background-color: grey;
  }
`;

const All = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BodyController = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 200px;
  width: 100%;
  font-size: smaller;
`;
const Allchild = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 20px;
  height: 200px;
  width: 90%;
`;
const ButtonTable = styled.button`
  width: 50%;
  border: none;
  border-radius: 1%;
  padding: 10px;
  background-color: orange;
  color: white;
  &:hover {
    background-color: rgb(200, 151, 59);
  }
`;
const Buttoncontroller = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
`;
const Body = styled.div`
  background-color: rgb(235, 235, 235);
  padding-bottom: 5%;
`;
const BodyControl = styled.div`
  margin-left: 15%;
  margin-right: 15%;
`;
const Title = styled.div`
  display: flex;
  justify-content: start;
`;
const MenuController = styled.div`
  display: flex;
  gap: 20px;
`;
const Menu = styled.div`
  flex-basis: 55%;
`;
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  33.33% {
    transform: rotate(20deg);
  }
  66.66% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;
const QRCode = styled.div`
  flex-basis: 40%;
  animation: rotate-animation 3s forwards;
  &.rotate-animation {
    animation: ${rotateAnimation} 3s forwards;
  }
`;
const Item = styled.div`
  margin-top: 2%;
  display: grid;
  grid-template-columns: 20% 55% 15% 10%;
  border: 1px solid rgb(251, 208, 127);
`;
const Dad = styled.div`
  color: red;
  &:hover {
    color: rgb(245, 142, 142);
  }
`;

const Food = () => {
  const initialTime = 0;
  const [selectedTime, setSelectedTime] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const [currentHour, setCurrentHour] = useState(null);
  const [textSearch, setTextSearch] = useState(null);
  const [filterSearch, setFilterSearch] = useState(foods);
  const qrCodeRef = useRef(null);
  const notify = (text) => {
    toast.success(text, {
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
  const error = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    const currentDate = new Date();
    const hour = currentDate.getHours();
  }, []);
  const { id } = useParams();
  const food = foods?.find((food) => food.id === Number(id));
  useEffect(() => {
    if (textSearch && textSearch.trim() !== "") {
      const data = foods.filter((foodItem) =>
        foodItem.name.toLowerCase().includes(textSearch.trim().toLowerCase())
      );
      setFilterSearch(data);
    } else {
      setFilterSearch(foods);
    }
  }, [textSearch]);

  const scrollToQRCode = () => {
    notify("Thêm sản phẩm thành công bạn vui lòng quét Qr để thanh toán !!!");
    if (qrCodeRef && qrCodeRef.current) {
      qrCodeRef.current.scrollIntoView({ behavior: "smooth" });
      qrCodeRef.current.classList.add("rotate-animation");
      setTimeout(() => {
        qrCodeRef.current.classList.remove("rotate-animation");
      }, 3000);
    }
  };
  const handleTimeChange = (time) => {
    notify("Chọn đặt trước " + time + " phút thành công !!!");
    setSelectedTime(time); // Update the selected time
  };
  const handleReset = () => {
    notify("Hủy đặt trước thành công !!!");
    setSelectedTime(initialTime); // Reset selected time to initial value
  };

  return (
    <>
      {loading ? (
        <Container
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RiseLoader color={"orange"} size={30} loading={loading} />
        </Container>
      ) : (
        <>
          <Navbar />
          <Container>
            <Header>
              <ImageController>
                <Img src={require(`../asset/${food?.img}`)} alt="Food" />
              </ImageController>
              <All>
                <Allchild>
                  <BodyController>
                    <div>
                      <button
                        style={{
                          border: "none",
                          display: "inline-block",
                          backgroundColor: "red",
                          color: "white",
                          padding: "10px",
                          borderRadius: "50px",
                        }}
                      >
                        <span style={{ color: "white" }}>
                          <FavoriteIcon />
                        </span>{" "}
                        Yêu thích
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <p
                        style={{
                          display: "inline-block",
                          fontWeight: "bolder",
                        }}
                      >
                        QUÁN ĂN
                      </p>
                    </div>
                    <h3 style={{ height: "100%" }}>{food?.name}</h3>
                    <p style={{ height: "100%" }}>
                      <LocationOnIcon />
                      {food?.address}
                    </p>
                    <p style={{ height: "100%" }}>
                      Đánh giá : {food?.mark}
                      <span style={{ color: "rgb(205, 205, 7)" }}>
                        <StarIcon />
                      </span>
                      /10
                      <span style={{ color: "rgb(205, 205, 7)" }}>
                        <StarIcon />
                      </span>
                    </p>

                    {!(
                      food?.open <= currentHour && food.close >= currentHour
                    ) ? (
                      <p style={{ height: "100%" }}>
                        <span style={{ color: "red" }}>
                          <DoorFrontIcon />
                        </span>
                        Đóng cửa đến {food?.open} giờ
                      </p>
                    ) : (
                      <p style={{ height: "100%" }}>
                        <span style={{ color: "green" }}>
                          <MeetingRoomIcon />
                        </span>
                        Mở cửa đến {food?.close} giờ
                      </p>
                    )}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "bolder",
                            fontSize: "15px",
                            marginBottom: "10px",
                          }}
                        >
                          Đặt trước
                        </div>
                        <button
                          onClick={handleReset}
                          style={{
                            border: "none",
                            color: "white",
                            backgroundColor: "red",
                            marginBottom: "10px",
                          }}
                        >
                          Hủy đặt trước
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          marginBottom: "10px",
                        }}
                      >
                        <div>
                          <input
                            type="radio"
                            id="5min"
                            name="time"
                            value={5}
                            checked={selectedTime === 5}
                            onChange={() => handleTimeChange(5)}
                          />
                          <label htmlFor="5min">5 phút</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="10min"
                            name="time"
                            value={10}
                            checked={selectedTime === 10}
                            onChange={() => handleTimeChange(10)}
                          />
                          <label htmlFor="10min">10 phút</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="15min"
                            name="time"
                            value={15}
                            checked={selectedTime === 15}
                            onChange={() => handleTimeChange(15)}
                          />
                          <label htmlFor="15min">15 phút</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="20min"
                            name="time"
                            value={20}
                            checked={selectedTime === 20}
                            onChange={() => handleTimeChange(20)}
                          />
                          <label htmlFor="20min">20 phút</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="25min"
                            name="time"
                            value={25}
                            checked={selectedTime === 25}
                            onChange={() => handleTimeChange(25)}
                          />
                          <label htmlFor="25min">25 phút</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="30min"
                            name="time"
                            value={30}
                            checked={selectedTime === 30}
                            onChange={() => handleTimeChange(30)}
                          />
                          <label htmlFor="30min">30 phút</label>
                        </div>
                      </div>
                    </div>
                  </BodyController>
                </Allchild>
              </All>
            </Header>
          </Container>
          <Body>
            <BodyControl>
              <Title>
                <h4 style={{ marginTop: "2%" }}>Thực đơn của quán </h4>
              </Title>
              <MenuController>
                <Menu>
                  <div
                    style={{
                      backgroundColor: "white",
                      width: "100%",
                      marginTop: "3%",
                      marginBottom: "5%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <span style={{ width: "5%" }}>
                      <SearchIcon />
                    </span>
                    <input
                      style={{
                        outline: "none",
                        border: "none",
                        width: "94%",
                        display: "inline-block",
                      }}
                      placeholder="search food ..."
                      onChange={(e) => setTextSearch(e.target.value)}
                    />
                  </div>

                  {filterSearch?.map((food) => (
                    <Item>
                      <div>
                        <img
                          src={require(`../asset/${food?.img}`)}
                          width="100%"
                          height="70px"
                        />
                      </div>
                      <div>
                        <p style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                          {food?.name}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            color: "orange",
                            fontWeight: "bolder",
                          }}
                        >
                          {food?.price?.toLocaleString("vi-VN")} đ
                        </p>
                      </div>
                      <Dad
                        onClick={scrollToQRCode}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>
                          <LocalHospitalIcon />
                        </span>
                      </Dad>
                    </Item>
                  ))}
                </Menu>
                <QRCode ref={qrCodeRef}>
                  <img
                    src={require(`../asset/qr.png`)}
                    style={{ marginTop: "20%" , height:'300px'}}
                  />
                </QRCode>
              </MenuController>
            </BodyControl>
          </Body>
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
          <Footer />
        </>
      )}
    </>
  );
};

export default Food;
