import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import { useNavigate, useParams } from "react-router-dom";
import { foods } from "../data.js";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StarIcon from "@mui/icons-material/Star";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
const Container = styled.div`
  margin-left: 1%;
  margin-right: 1%;
`;
const Body = styled.div`
  margin-top: 7%;
  margin-bottom: 10%;
`;
const ItemOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const DropdownOne = styled.select`
  outline: none;
  margin-left: 0;
  border: none;
  border: 5px solid rgb(194, 193, 193);
`;
const TextSearch = styled.div``;
const TextInDropdown = styled.option``;
const ControlFilter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SonOfFilter = styled.div`
  display: flex;
  gap: 20px;
`;
const Content = styled.div`
  display: flex;
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
const Buttoncontroller = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
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

const All = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Control = styled.div`
  cursor: pointer;
  border: 1px solid rgb(197, 194, 194);
  border-radius: 10px;

  padding: 5px;
  width: 98%;
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
const Manage = styled.div`
  position: relative;
  margin-top: 2%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const Error = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;
const Text = styled.h1``;
const Search = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const navigate = useNavigate();
  const { text } = useParams();
  const foodsPro = foods.filter((food) =>
    food.name.toLowerCase().includes(text.toLowerCase())
  );
  const [foodsList, setFilter] = useState(foodsPro);
  const [currentHour, setCurrentHour] = useState(null);
  const [address, setAddress] = useState(null);
  const [cat, setCategory] = useState(null);
  const [sort, setSort] = useState(null);
  const addRef = useRef(null);
  const catRef = useRef(null);
  const sortRef = useRef(null);
  useEffect(() => {
    addRef.current.selectedIndex = 0;
    catRef.current.selectedIndex = 0;
    sortRef.current.selectedIndex = 0;
    setCategory(null);
    setAddress(null);
    setSort(null);
    setFilter(foodsPro);
  }, [text]);

  useEffect(() => {
    const currentDate = new Date();
    const hour = currentDate.getHours();
  }, []);
  console.log(foods);

  useEffect(() => {
    const fetchData = () => {
      if (address && (!cat || cat === "") && (!sort || sort === "")) {
        setFilter(foodsPro.filter((food) => food.address === address));
      } else if (address && cat && (!sort || sort === "")) {
        setFilter(
          foodsPro.filter(
            (food) => food.address === address && food.type === cat
          )
        );
      } else if (address && cat && sort) {
        if (sort === "ascending") {
          setFilter(
            foodsPro
              .filter((food) => food.address === address && food.type === cat)
              .sort((a, b) => a.mark - b.mark)
          );
        } else if (sort === "descending") {
          setFilter(
            foodsPro
              .filter((food) => food.address === address && food.type === cat)
              .sort((a, b) => b.mark - a.mark)
          );
        }
      } else if ((!address || address === "") && cat && sort) {
        if (sort === "ascending") {
          setFilter(
            foodsPro
              .filter((food) => food.type === cat)
              .sort((a, b) => a.mark - b.mark)
          );
        } else if (sort === "descending") {
          setFilter(
            foodsPro
              .filter((food) => food.type === cat)
              .sort((a, b) => b.mark - a.mark)
          );
        }
      } else if (
        (!address || address === "") &&
        cat &&
        (!sort || sort === "")
      ) {
        setFilter(foodsPro.filter((food) => food.type === cat));
      } else if ((!address || address === "") && (!cat || cat === "") && sort) {
        if (sort === "ascending") {
          setFilter(foodsPro.sort((a, b) => a.mark - b.mark));
        } else if (sort === "descending") {
          setFilter(foodsPro.sort((a, b) => b.mark - a.mark));
        }
      } else if (address && (!cat || cat === "") && sort) {
        if (sort === "ascending") {
          setFilter(
            foodsPro
              .filter((food) => food.address === address)
              .sort((a, b) => a.mark - b.mark)
          );
        } else if (sort === "descending") {
          setFilter(
            foodsPro
              .filter((food) => food.address === address)
              .sort((a, b) => b.mark - a.mark)
          );
        }
      } else if (
        (!address || address === "") &&
        (!cat || cat === "") &&
        (!sort || sort === "")
      ) {
        setFilter(foodsPro);
      }
    };
    fetchData();
  }, [address, cat, sort]);

  const handleFilter = (address, cat, sort) => {
    setAddress(address);
    setCategory(cat);
    setSort(sort);
    console.log(address, cat, sort);
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
        <Body>
          <Content>
            <h1 style={{ fontSize: "55px" }}>Tìm kiếm</h1>
            <p style={{ textDecoration: "underline orange" }}>
              Có{" "}
              {foodsList?.length > 0 ? (
                <span style={{ color: "orange", fontWeight: "bolder" }}>
                  {foodsList?.length}{" "}
                </span>
              ) : (
                <span style={{ color: "orange", fontWeight: "bolder" }}>
                  0{" "}
                </span>
              )}
              sản phẩm
            </p>
          </Content>
          <div style={{ marginBottom: "30px" }}>
            <h6>
              Kết quả tìm kiếm của{" "}
              <span style={{ color: "orange", fontWeight: "bolder" }}>
                "{text}"
              </span>
            </h6>
          </div>
          <ControlFilter>
            <SonOfFilter>
              <ItemOne>
                <div>
                  <DropdownOne
                    style={{ textDecoration: "orange" }}
                    ref={addRef}
                    onChange={(e) => handleFilter(e.target.value, cat, sort)}
                  >
                    <TextInDropdown
                      selected
                      value=""
                      style={{ textAlign: "center" }}
                    >
                      Địa điểm
                    </TextInDropdown>
                    <TextInDropdown
                      style={{ textAlign: "center" }}
                      value="Thôn 1"
                    >
                      Thôn 1
                    </TextInDropdown>
                    <TextInDropdown
                      style={{ textAlign: "center" }}
                      value="Thôn 2"
                    >
                      Thôn 2
                    </TextInDropdown>
                    <TextInDropdown
                      style={{ textAlign: "center" }}
                      value="Thôn 3"
                    >
                      Thôn 3
                    </TextInDropdown>
                  </DropdownOne>
                </div>
              </ItemOne>
              <ItemOne>
                <div>
                  <DropdownOne
                    style={{ textDecoration: "orange" }}
                    ref={catRef}
                    onChange={(e) =>
                      handleFilter(address, e.target.value, sort)
                    }
                  >
                    <TextInDropdown
                      selected
                      value=""
                      style={{ textAlign: "center" }}
                    >
                      Phân loại
                    </TextInDropdown>
                    <TextInDropdown
                      style={{ textAlign: "center" }}
                      value="noodle"
                    >
                      Phở , bún , mỳ
                    </TextInDropdown>
                    <TextInDropdown
                      style={{ textAlign: "center" }}
                      value="rice"
                    >
                      Cơm
                    </TextInDropdown>
                    <TextInDropdown
                      style={{ textAlign: "center" }}
                      value="bread"
                    >
                      Bánh mì
                    </TextInDropdown>
                    <TextInDropdown
                      style={{ textAlign: "center" }}
                      value="fast"
                    >
                      Đồ uống , ăn vặt
                    </TextInDropdown>
                  </DropdownOne>
                </div>
              </ItemOne>
            </SonOfFilter>
            <ItemOne>
              <div>
                <TextSearch style={{ display: "inline-block" }}>
                  Sắp xếp&nbsp;&nbsp;
                </TextSearch>
                <DropdownOne
                  style={{ textDecoration: "orange" }}
                  ref={sortRef}
                  onChange={(e) => handleFilter(address, cat, e.target.value)}
                >
                  <TextInDropdown
                    selected
                    value=""
                    style={{ textAlign: "center" }}
                  >
                    Mặc định
                  </TextInDropdown>
                  <TextInDropdown
                    style={{ textAlign: "center" }}
                    value="ascending"
                  >
                    Điểm tăng dần
                  </TextInDropdown>
                  <TextInDropdown
                    style={{ textAlign: "center" }}
                    value="descending"
                  >
                    Điểm giảm dần
                  </TextInDropdown>
                </DropdownOne>
              </div>
            </ItemOne>
          </ControlFilter>
          <Manage>
            {foodsList?.length === 0 ? (
              <Error>
                <Text>Không có kết quả cho thông tin bạn vừa tìm kiếm !!!</Text>
              </Error>
            ) : (
              foodsList?.map((food) => (
                <Control onClick={() => navigate(`/food/${food.id}`)}>
                  <ImageController>
                    <Img src={require(`../asset/${food?.img}`)} alt="Food" />
                  </ImageController>
                  <All>
                    <Allchild>
                      <BodyController>
                        <h5>{food?.name}</h5>
                        <p>
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
                          <p>
                            <span style={{ color: "red" }}>
                              <DoorFrontIcon />
                            </span>
                            Đóng cửa đến {food?.open} giờ
                          </p>
                        ) : (
                          <p>
                            <span style={{ color: "green" }}>
                              <MeetingRoomIcon />
                            </span>
                            Mở cửa đến {food?.close} giờ
                          </p>
                        )}
                        <p>
                          <LocationOnIcon />
                          {food?.address}
                        </p>
                      </BodyController>
                      <Buttoncontroller>
                        <ButtonOrder>Đặt đồ</ButtonOrder>
                        {food?.reverse && <ButtonTable>Đặt bàn</ButtonTable>}
                      </Buttoncontroller>
                    </Allchild>
                  </All>
                </Control>
              ))
            )}
          </Manage>
        </Body>
      </Container>
      <Footer />
    </>
     )}
     </>
   );

};

export default Search;
