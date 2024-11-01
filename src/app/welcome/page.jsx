"use client";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ThaiDatePicker } from "thaidatepicker-react";
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export default function Welcome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/welcome");
        if (!response.ok) {
          throw new Error("Network response was not ok!!");
        }
        const data = await response.json();
        console.log("ee", data.result)
        setData(data.result);
      } catch (err) {
        setData(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page when rows per page changes
  };

  const handleSearch = async () => {
    try {
      const response = await fetch("/api/welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate: selectedDate }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setData(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  const handleDatePickerChange = (christDate, buddhistDate) => {
    setSelectedDate(christDate);
  };

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div>
      {/* <Navbar session={session} /> */}
      <div className="mx-auto mb-6">
        <h3 className="text-2xl font-bold">Welcome Employee </h3>
        <hr className="mb-3" />
        <div className="grid grid-cols-12 gap-2 mb-3">
          <div className="col-span-4 mt-0.5 text-right">Work start date : </div>
          <div className="col-span-4">
            <ThaiDatePicker
              clearable={false}
              inputProps={{ displayFormat: "DD/MM/YYYY", readOnly: true, className: `disabled:bg-gray-200` }}
              value={selectedDate}
              onChange={handleDatePickerChange}
            />
          </div>
          <div className="col-span-4 text-left">
            <button
              type="submit"
              className="main-button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Name (TH)</TableCell>
                  <TableCell>Genger</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <StyledTableRow key={item.emp_code}>
                      <StyledTableCell component="th" scope="row">
                        {item.emp_code}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.efname} {item.elname}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.tfname} {item.tlname}
                      </StyledTableCell>
                      <StyledTableCell>{item.gender_code}</StyledTableCell>
                      <StyledTableCell>{item.email}</StyledTableCell>
                      <StyledTableCell>{moment(item.start_date).add(543, 'years').format('DD/MM/YYYY')}</StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]} // ตัวเลือกจำนวนแถวต่อหน้า
            component="div"
            count={data.length} // จำนวนข้อมูลทั้งหมด
            rowsPerPage={rowsPerPage} // จำนวนแถวที่แสดงต่อหน้า
            page={page} // หน้าแรก
            onPageChange={handleChangePage} // ฟังก์ชันเปลี่ยนหน้า
            onRowsPerPageChange={handleChangeRowsPerPage} // ฟังก์ชันเปลี่ยนจำนวนแถวต่อหน้า
          />
        </Paper>
      </div>
    </div>
  );
}
