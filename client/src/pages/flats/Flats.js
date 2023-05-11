import * as React from "react";
import { useState, useEffect } from "react";
import "./Flats.css";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Link,
  TextField,
  Button,
  ButtonBase,
  Grid,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import { useModal } from "../../components/Modal";
import Login from "../../auth/login/Login";
import { DataGrid } from "@mui/x-data-grid";

const styleM = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const paperStyle = {
  padding: 20,
  heigth: "50vh",
  width: 300,
  margin: "5px auto",
};
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const style = { margin: "10px" };
const btnStyle = { margin: "8px 0px" };
const columns = [
  //{ field: "userId", headerName: "userId", type: "number" },
  { field: "name", headerName: "Name", width: 300 },
  {
    field: "city",
    headerName: "City",
    width: 300,
  },
  {
    field: "street",
    headerName: "Street",
    width: 300,
  },
  {
    field: "county",
    headerName: "County",
    width: 300,
  },
];

export default function Flats() {
  const [flatName, setFlatName] = useState("");
  const [flatCity, setFlatCity] = useState("");
  const [flatStreet, setFlatStreet] = useState("");
  const [flatCounty, setFlatCounty] = useState("");
  const [flatUser, setFlatUser] = useState("");

  const [tableData, setTableData] = useState([]);
  const [selectedIndexs, setSelectedIndexes] = useState([]);
  const [initialValue, setInitialValue] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState({});
  //pt modala
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFlatName = (e) => {
    setFlatName(e.target.value);
  };
  const handleFlatCity = (e) => {
    setFlatCity(e.target.value);
  };
  const handleFlatStreet = (e) => {
    setFlatStreet(e.target.value);
  };
  const handleFlatCounty = (e) => {
    setFlatCounty(e.target.value);
  };

  useEffect(() => {
    let flatUser = localStorage.getItem("user");
    if (flatUser) {
      setFlatUser(flatUser);
      console.log("flatUserId", flatUser);
    }
  }, []);
  // create flat
  const handleCreateFlat = async (e) => {
    //e.preventDefault();
    const flatCall = await fetch("http://localhost:5000/flat/newflat", {
      method: "POST",
      headers: {
        Authorization: "state.token",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: flatName,
        city: flatCity,
        street: flatStreet,
        county: flatCounty,
        userId: flatUser,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("dataFlats", data));
  };

  //get flats
  // const handleGetFlats = async () => {
  //   const flatsCall = await fetch("http://localhost:5000/flat/getAllFlats", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "state.token",
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformed = data.flats.map(
  //         ({ _id, name, city, street, county }, index) => ({
  //           // id: index + 1,
  //           id: _id,
  //           name: name,
  //           city: city,
  //           street: street,
  //           county: county,
  //           // userId: flatUser,
  //         })
  //       );
  //       //console.log(transformed);
  //       setTableData(transformed);
  //     });
  // };

  // useEffect(() => {
  //   //console.log("table data", tableData);
  // }, [tableData]);

  // useEffect(() => {
  //   handleGetFlats();
  // }, []);

  //get flats by userID
  //get flats
  const handleGetFlatsByUserId = async () => {
    let flatUser = localStorage.getItem("user");
    await fetch(`http://localhost:5000/user/flats/${flatUser}`, {
      method: "GET",
      headers: {
        Authorization: "state.token",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("datadadadadadadad", data);
        const transformed = data.data.map(
          ({ _id, name, city, street, county }) => ({
            // id: index + 1,
            id: _id,
            name: name,
            city: city,
            street: street,
            county: county,
            userId: flatUser,
          })
        );
        console.log("transformed", transformed);
        setTableData(transformed);
      });
  };

  useEffect(() => {
    console.log("table data", tableData);
  }, [tableData]);

  useEffect(() => {
    handleGetFlatsByUserId();
  }, []);

  //delete flats
  const handleDeleteFlat = async (e) => {
    //e.preventDefault();
    selectedIndexs.map(async (index) => {
      await fetch(`http://localhost:5000/flat/deleteFlat/${index}`, {
        method: "DELETE",
        headers: {
          Authorization: "state.token",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: flatName,
          city: flatCity,
          street: flatStreet,
          county: flatCounty,
          userId: flatUser,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("dataDelete", data));
    });
  };

  //update flat
  const handleUpdateFlat = async (e) => {
    //e.preventDefault();
    selectedIndexs.map(async (index) => {
      await fetch(`http://localhost:5000/flat/updateFlat/${index}`, {
        method: "PATCH",
        headers: {
          Authorization: "state.token",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: flatName,
          city: flatCity,
          street: flatStreet,
          county: flatCounty,
          userId: flatUser,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("dataUpdate", data));
      setSelectedFlat(index);
    });
  };

  return (
    <form>
      <div className="space">
        <h1>Welcome, you can create, update and delete flats!</h1>
      </div>
      <div className="buttonFlat">
        <Button className="btn" onClick={handleOpen}>
          New flat
        </Button>
        <Button className="btn" onClick={handleDeleteFlat}>
          Delete flat
        </Button>
        <Button className="btn" onClick={handleOpenUpdate}>
          Update flat
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleM}>
          <div id="content-flat">
            <header></header>
            <Grid align="center" marginTop={5}>
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Name"
                defaultValue=""
                type="text"
                onChange={handleFlatName}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="City"
                defaultValue=""
                type="text"
                onChange={handleFlatCity}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="County"
                defaultValue=""
                type="text"
                onChange={handleFlatCounty}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Street"
                defaultValue=""
                type="text"
                onChange={handleFlatStreet}
                fullWidth
              />
              <Button
                style={btnStyle}
                type="submit"
                variant="contained"
                onClick={handleCreateFlat}
              >
                Add
              </Button>
            </Grid>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleM}>
          <div id="content-flat">
            <header></header>
            <Grid align="center" marginTop={5}>
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Name"
                defaultValue=""
                type="text"
                onChange={handleFlatName}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="City"
                defaultValue=""
                type="text"
                onChange={handleFlatCity}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="County"
                defaultValue=""
                type="text"
                onChange={handleFlatCounty}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Street"
                defaultValue=""
                type="text"
                onChange={handleFlatStreet}
                fullWidth
              />
              <Button
                style={btnStyle}
                type="submit"
                variant="contained"
                onClick={handleUpdateFlat}
              >
                Update
              </Button>
            </Grid>
          </div>
        </Box>
      </Modal>

      <div styleM={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(itm) => {
            setSelectedIndexes(itm);
            console.log("indexes: " + itm);
          }}
        />
      </div>
    </form>
  );
}
