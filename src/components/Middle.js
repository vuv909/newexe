import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import { foods } from "../data.js";
import FoodBody from "./FoodBody";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 5%;
  width: 100%;
  overflow: hidden;
`;
const Body = styled.div`
  flex-basis: 33.3%;
  display: flex;
  flex-direction: column;
  width: 100%;
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
const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: 5%;
`;
const TextInDropdown = styled.option``;
const Control = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const ControlF = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  align-items: center;
  justify-content: center;
`;
const Middle = () => {
  const [sortedFoods, setSortedFoods] = useState([...foods]); // State to manage sorted foods
  const [sortOption, setSortOption] = useState("default"); // State to manage sorting option
  const navigate = useNavigate()
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "ascending") {
      const sortedAscending = [...sortedFoods].sort((a, b) => a.mark - b.mark);
      setSortedFoods(sortedAscending);
      setSortOption("ascending");
    } else if (selectedOption === "descending") {
      const sortedDescending = [...sortedFoods].sort((a, b) => b.mark - a.mark);
      setSortedFoods(sortedDescending);
      setSortOption("descending");
    } else {
      // Reset to default order
      setSortedFoods([...foods]);
      setSortOption("default");
    }
  };
  return (
    <Container>
      <Header />
      <Body style={{ textAlign: "center" }}>
        <Control>
          <h3>Những món ăn hiện có</h3>
          <ItemOne>
            <div>
              <TextSearch style={{ display: "inline-block" }}>
                Sắp xếp&nbsp;&nbsp;
              </TextSearch>
              <DropdownOne
                style={{ textDecoration: "orange" }}
                onChange={handleSortChange}
              >
                <TextInDropdown value="default" style={{ textAlign: "center" }}>
                  Mặc định
                </TextInDropdown>
                <TextInDropdown
                  value="ascending"
                  style={{ textAlign: "center" }}
                >
                  Điểm tăng dần
                </TextInDropdown>
                <TextInDropdown
                  value="descending"
                  style={{ textAlign: "center" }}
                >
                  Điểm giảm dần
                </TextInDropdown>
              </DropdownOne>
            </div>
          </ItemOne>
        </Control>
        <ControlF>
          {sortedFoods.map((food) => (
            <FoodBody key={food.id} food={food} />
          ))}
        </ControlF>
      </Body>

    </Container>
  );
};

export default Middle;
