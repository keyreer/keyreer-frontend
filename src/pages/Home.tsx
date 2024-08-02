import React, { useEffect, useState, MouseEvent } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";

import { useTheme, styled } from "@mui/material/styles";
import {
  Container,
  Box,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
} from "@mui/icons-material";

import Header from "../components/Header";

interface JobPost {
  platform: string;
  company: string;
  title: string;
  url: string;
  inserted_at: string;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) {
  const theme = useTheme();

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [data, setData] = useState<JobPost[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isTableVisible, setIsTableVisible] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.keyreer.com/posts");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCellClick = () => { 
    setIsTableVisible(false);
  };  

  return (
    <Container>
      <Header user={user} signOut={signOut} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ marginTop: "20px" }}
      >
        <Typography
          style={{
            textAlign: "left",
            fontSize: "25px",
            fontWeight: "bold",
            margin: "40px",
          }}
        >
          Newly udpated job postings
        </Typography>
        {isTableVisible ? (
        <TableContainer component={Paper}>
          <Table
            aria-label="custom pagination table"
            style={{ tableLayout: "fixed" }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: "15%" }}>
                  Platform
                </StyledTableCell>
                <StyledTableCell style={{ width: "20%" }}>
                  Company
                </StyledTableCell>
                <StyledTableCell style={{ width: "50%" }}>
                  Title
                </StyledTableCell>
                <StyledTableCell style={{ width: "15%" }}>
                  Updated_at
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{row.platform}</StyledTableCell>
                  <StyledTableCell>{row.company}</StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      throw new Error(
                        "Table cell click error for Datadog RUM test"
                      );
                      handleCellClick();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell>{row.inserted_at}</StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>) : (
          <Typography>
          Table is hidden. Refresh the page to see it again.
        </Typography>
        )}
      </Box>
    </Container>
  );
}
