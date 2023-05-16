import * as React from "react";
import { useState, useEffect } from "react";
import "./Appliances.css";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
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
  // { field: "id", headerName: "ID", type: "number" },
  { field: "name", headerName: "Name", width: 300 },
  {
    field: "consumption",
    headerName: "Consumption",
    width: 300,
    type: "number",
  },
  { field: "price", headerName: "Price", width: 300, type: "number" },
  {
    field: "dateStart",
    headerName: "dateStart",
    width: 300,
    type: "date",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "dateEnd",
    headerName: "dateEnd",
    width: 300,
    type: "date",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "Flat",
    headerName: "Flat",
    width: 300,
  },
];

export default function Appliances() {
  const [applianceName, setApplianceName] = useState("");
  const [applianceConsumption, setApplianceConsumption] = useState("");
  const [appliancePrice, setAppliancePrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userId, setUserId] = useState("");

  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [flatId, setFlatId] = useState("");
  const [flatUser, setFlatUser] = useState("");

  const [tableData, setTableData] = useState([]);
  const [selectedIndexs, setSelectedIndexes] = useState([]);
  const [initialValue, setInitialValue] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState({});
  const [tableDataFlat, setTableDataFlat] = useState([]);
  const [chosenFlat, setChosenFlat] = useState("");

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };
  const handleChosenFlat = (e) => {
    setChosenFlat(e.target.value);
  };
  const handleApplianceName = (e) => {
    setApplianceName(e.target.value);
  };
  const handleApplianceConsumption = (e) => {
    setApplianceConsumption(e.target.value);
  };
  const handleAppliancePrice = (e) => {
    setAppliancePrice(e.target.value);
  };
  const handleStartDate = (e) => {
    setStartDate(e.$d);
  };
  const handleEndDate = (e) => {
    setEndDate(e.$d);
  };
  //get appliances by flat id;

  // const handleGetAllAppliancesByFlatId = async () => {
  //   await fetch(`http://localhost:5000/flat/appliances/:${flatId}`, {
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
  //       console.log("getAllAppliancesByFlatId", data);
  //       const selectOptions = data.data.map(
  //         ({ _id, name, consumption, price, dateStart, dateEnd, flatId }) => ({
  //           // id: index + 1,
  //           id: _id,
  //           name: name,
  //           consumption: consumption,
  //           dateStart: dateStart,
  //           dateEnd: dateEnd,
  //           price: price,
  //           flatId: flatId,
  //         })
  //       );
  //       console.log("aiciiiiiii", selectOptions);
  //       setTableDataFlat(selectOptions);
  //       //setFlatId(data.data[0]._id);
  //     });
  // };

  // useEffect(() => {
  //   console.log("table data name", tableDataFlat);
  // }, [tableDataFlat]);

  // useEffect(() => {
  //   handleGetAllAppliancesByFlatId();
  // }, []);

  //get flats by user ID

  useEffect(() => {
    let flatUser = localStorage.getItem("user");
    if (flatUser) {
      setFlatUser(flatUser);
      console.log("flatUserId", flatUser);
    }
  }, []);

  const handleGetFlatsByUserId = async () => {
    await fetch(
      `http://localhost:5000/user/flats/${localStorage.getItem("user")}`,
      {
        method: "GET",
        headers: {
          Authorization: "state.token",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("getFlatsByUserId", data);
        const selectOptions = data.data.map(({ name, _id }) => ({
          // id: index + 1,
          name: name,
          id: _id,
        }));
        console.log("selectOptions", selectOptions);
        setTableDataFlat(selectOptions);
        setFlatId(data.data[0]._id);
      });
  };

  useEffect(() => {
    console.log("table data name", tableDataFlat);
  }, [tableDataFlat]);

  useEffect(() => {
    handleGetFlatsByUserId();
  }, []);

  // create appliance
  const handleCreateAppliance = async (e) => {
    e.preventDefault();
    const applianceCall = await fetch(
      "http://localhost:5000/appliance/newAppliance",
      {
        method: "POST",
        headers: {
          Authorization: "state.token",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: applianceName,
          consumption: applianceConsumption,
          price: appliancePrice,
          dateStart: startDate,
          dateEnd: endDate,
          flatId: flatId,
          userId: flatUser,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("create", data));
  };

  //get appliances by user id

  const handleGetAppliancesByUserId = async () => {
    await fetch(
      `http://localhost:5000/user/appliances/${localStorage.getItem("user")}`,
      {
        method: "GET",
        headers: {
          Authorization: "state.token",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("datadadadadadadad", data);
        const transformed = data.data.map(
          ({ _id, name, consumption, price, dateStart, dateEnd, flatId }) => ({
            // id: index + 1,
            id: _id,
            name: name,
            consumption: consumption,
            dateStart: dateStart,
            dateEnd: dateEnd,
            price: price,
            flatId: flatId,
            userId: flatUser,
          })
        );
        console.log("transformed appliances", transformed);
        setTableData(transformed);
      });
  };

  useEffect(() => {
    console.log("table data user id appliances", tableData);
  }, [tableData]);

  useEffect(() => {
    handleGetAppliancesByUserId();
  }, []);

  // // //get appliances

  // const handleGetAppliances = async () => {
  //   const applianceCall = await fetch(
  //     "http://localhost:5000/appliance/getAllAppliances",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: "state.token",
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformed = data.appliances.map(
  //         (
  //           { _id, name, consumption, price, dateStart, dateEnd, flatId },
  //           index
  //         ) => ({
  //           // id: index + 1,
  //           id: _id,
  //           name: name,
  //           consumption: consumption,
  //           dateStart: dateStart,
  //           dateEnd: dateEnd,
  //           price: price,
  //           flatId: flatId,
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
  //   handleGetAppliances();
  // }, []);

  //delete appliance
  const handleDeleteAppliance = async (e) => {
    //e.preventDefault();
    selectedIndexs.map(async (index) => {
      await fetch(`http://localhost:5000/appliance/deleteAppliance/${index}`, {
        method: "DELETE",
        headers: {
          Authorization: "state.token",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: applianceName,
          consumption: applianceConsumption,
          price: appliancePrice,
          dateStart: startDate,
          dateEnd: endDate,
          flatId: flatId,
          userId: flatUser,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("dataDelete", data));
    });
  };
  //update appliance
  const handleUpdateAppliance = async (e) => {
    //e.preventDefault();
    selectedIndexs.map(async (index) => {
      await fetch(`http://localhost:5000/appliance/updateAppliance/${index}`, {
        method: "PATCH",
        headers: {
          Authorization: "state.token",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: applianceName,
          consumption: applianceConsumption,
          price: appliancePrice,
          dateStart: startDate,
          dateEnd: endDate,
          flatId: flatId,
          userId: flatUser,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("dataUpdate", data));
      setSelectedAppliance(index);
    });
  };

  return (
    <form>
      <div className="space">
        <h1>Welcome, you can create, update and delete appliances!</h1>
      </div>
      <div className="buttonAppliance">
        <Button className="btn" onClick={handleOpen}>
          New Appliance
        </Button>
        <Button className="btn" onClick={handleDeleteAppliance}>
          Delete Appliance
        </Button>
        <Button className="btn" onClick={handleOpenUpdate}>
          Update Appliance
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleM}>
          <div id="content-appliance">
            <header></header>
            <Grid align="center" marginTop={5}>
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Name"
                defaultValue="aaaa"
                type="text"
                onChange={handleApplianceName}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Consumption/hour"
                defaultValue=""
                type="text"
                onChange={handleApplianceConsumption}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment disableTypography position="end">
                      Watt
                    </InputAdornment>
                  ),
                }}
                helperText="Standard consumption, you can modify"
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Price/hour"
                defaultValue=""
                type="text"
                onChange={handleAppliancePrice}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment disableTypography position="end">
                      $
                    </InputAdornment>
                  ),
                }}
                helperText="Standard price, you can modify"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="date-pick">
                  <label className="lab">Date Start</label>
                  <DatePicker
                    selected={setStartDate}
                    onChange={handleStartDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                  />
                  <label className="lab">Date End</label>
                  <DatePicker
                    selected={setEndDate}
                    onChange={handleEndDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                  />
                </div>
              </LocalizationProvider>
              <FormControl sx={{ m: 5, minWidth: 30 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Flat
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  defaultValue=""
                  value={chosenFlat}
                  label="Flat"
                  onChange={handleChosenFlat}
                >
                  {tableDataFlat.map((flat) => (
                    <MenuItem value={flat.flatId}>{flat.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select the flat</FormHelperText>
              </FormControl>

              <Button
                style={btnStyle}
                type="submit"
                variant="contained"
                onClick={handleCreateAppliance}
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
          <div id="content-appliance">
            <header></header>
            <Grid align="center" marginTop={5}>
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Name"
                defaultValue={initialValue}
                type="text"
                onChange={handleApplianceName}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Consumption/hour"
                defaultValue=""
                type="text"
                onChange={handleApplianceConsumption}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment disableTypography position="end">
                      Watt
                    </InputAdornment>
                  ),
                }}
                helperText="Standard consumption, you can modify"
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Price/hour"
                defaultValue=""
                type="text"
                onChange={handleAppliancePrice}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment disableTypography position="end">
                      $
                    </InputAdornment>
                  ),
                }}
                helperText="Standard price, you can modify"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="date-pick">
                  <label className="lab">Date Start</label>
                  <DatePicker
                    selected={setStartDate}
                    onChange={handleStartDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                  />
                  <label className="lab">Date End</label>
                  <DatePicker
                    selected={setEndDate}
                    onChange={handleEndDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                  />
                </div>
              </LocalizationProvider>
              <Button
                style={btnStyle}
                type="submit"
                variant="contained"
                onClick={handleUpdateAppliance}
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
