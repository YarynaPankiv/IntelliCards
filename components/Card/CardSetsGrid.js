import styled from "styled-components";
import CardBox from "./CardsBox";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Center from "../Center";
import { MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";

export default function CardSetsGrid({ allCardSets, category, users, title, progresses, searchQuery }) {
  const [cardSets, setCardSets] = useState(allCardSets);
  const [ratingFilter, setRatingFilter] = useState("");
  const [numCardsFilter, setNumCardsFilter] = useState("");

  useEffect(() => {
    let filteredCardSets = allCardSets;

    if (category) {
      filteredCardSets = filteredCardSets.filter((set) => set.category === category);
    }

    if (ratingFilter) {
      filteredCardSets = filteredCardSets.filter((set) => set.rating >= ratingFilter);
    }

    if (numCardsFilter) {
      filteredCardSets = filteredCardSets.filter((set) => set.cards.length >= numCardsFilter);
    }

    if (searchQuery) {
      filteredCardSets = filteredCardSets.filter((set) =>
        set.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setCardSets(filteredCardSets);
  }, [allCardSets, category, ratingFilter, numCardsFilter, searchQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalPages = cardSets ? Math.ceil(cardSets.length / productsPerPage) : 0;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentCardSets = cardSets ? cardSets.slice(startIndex, endIndex) : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Center>
      <SetsDiv>
        <StyledP>{title}</StyledP>
        <FiltersDiv>
          <FormControl variant="outlined" sx={formControlStyles}>
            <InputLabel>Рейтинг</InputLabel>
            <Select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              label="Rating"
            >
              <MenuItem value="">Всі</MenuItem>
              <MenuItem value={1}>1+</MenuItem>
              <MenuItem value={2}>2+</MenuItem>
              <MenuItem value={3}>3+</MenuItem>
              <MenuItem value={4}>4+</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Мінімум карточок"
            variant="outlined"
            type="number"
            value={numCardsFilter}
            onChange={(e) => setNumCardsFilter(e.target.value)}
            sx={{ minWidth: 120 }}
          />
        </FiltersDiv>
        <Grid>
          {currentCardSets.map((set) => {
            let foundProgress = null;
            if (progresses) {
              foundProgress = progresses.find((progress) => progress.cardSetsId?._id === set._id) || null;
            }
            return (
              <CardBox key={set._id} card={set} users={users} progress={foundProgress} />
            );
          })}
        </Grid>
        <PaginationDiv>
          <Pagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            color="primary"
            onChange={(event, page) => handlePageChange(page)}
          />
        </PaginationDiv>
      </SetsDiv>
    </Center>
  );
}

const formControlStyles = {
  minWidth: 120,
  marginRight: 2,
  height: 40,
  fontFamily: 'Montserrat, sans-serif',
  height: '40px', // Set the desired height here
  '& .MuiInputBase-root': {
    fontFamily: 'Montserrat, sans-serif', // Ensures the font family is applied to the input
  },
};


const SetsDiv = styled.div`
  margin-top: 20px;
  width: 98%;
  margin-left: 16px;
  height: auto;
  background: #f3f3f3;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 18px;
  margin-bottom: 20px;
`;

const StyledP = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 28px;
`;

const FiltersDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 21px;
`;

const PaginationDiv = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
