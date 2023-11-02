import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { location } from "../redux/Map.js";
import { useDispatch } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StarIcon from "@mui/icons-material/Star";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  cursor: pointer;
  border: 1px solid rgb(197, 194, 194);
  border-radius: 10px;

  padding: 5px;
  width: 97%;
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  gap: 20px;
  height: 500px;
  &:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2),
      /* Top shadow */ -2px 2px 5px rgba(0, 0, 0, 0.2),
      /* Right shadow */ 2px -2px 5px rgba(0, 0, 0, 0.2),
      /* Bottom shadow */ -2px -2px 5px rgba(0, 0, 0, 0.2); /* Left shadow */
  }
`;

const ImageController = styled.div`
  width: 95%;
  height: 50%; /* Set a fixed height for all images */
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Maintain aspect ratio and cover container */
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
const Buttoncontroller = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const All = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
const FoodBody = ({ food }) => {
  const [currentHour, setCurrentHour] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const currentDate = new Date();
    const hour = currentDate.getHours();
    setCurrentHour(hour);
  }, []);

  const dispatch = useDispatch();

  return (
    <Container
      onMouseEnter={() => dispatch(location(food.map))}
      onClick={() => navigate(`/food/${food.id}`)}
    >
      <ImageController>
        <Img src={require(`../asset/${food.img}`)} alt="Food" />
      </ImageController>
      <All>
        <Allchild>
          <BodyController>
            <h5>{food.name}</h5>
            <p>
              Đánh giá : {food.mark}
              <span style={{ color: "rgb(205, 205, 7)" }}>
                <StarIcon />
              </span>
              /10
              <span style={{ color: "rgb(205, 205, 7)" }}>
                <StarIcon />
              </span>
            </p>

            {!(food.open <= currentHour && food.close >= currentHour) ? (
              <p>
                <span style={{ color: "red" }}>
                  <DoorFrontIcon />
                </span>
                Đóng cửa đến {food.open} giờ
              </p>
            ) : (
              <p>
                <span style={{ color: "green" }}>
                  <MeetingRoomIcon />
                </span>
                Mở cửa đến {food.close} giờ
              </p>
            )}
            <p>
              <LocationOnIcon />
              {food.address}
            </p>
          </BodyController>
          <Buttoncontroller>
            <ButtonOrder>Đặt đồ</ButtonOrder>
            {food.reverse && <ButtonTable>Đặt bàn</ButtonTable>}
          </Buttoncontroller>
        </Allchild>
      </All>
    </Container>
  );
};

export default FoodBody;
