import * as React from "react";
import { useState, useEffect } from "react";
import "./Appliances.css";
import { styled } from "@mui/material/styles";
import ReactSelect from "react-select";
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
const stylem = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto", // Added property for scrollability
};
const paperStyle = {
  padding: 20,
  heigth: "50vh",
  width: 300,
  margin: "5px auto",
  overflow: "auto",
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
    headerName: "Putere (watt)",
    width: 300,
    type: "number",
  },
  {
    field: "price",
    headerName: "Total Price(selected days)",
    width: 300,
    type: "number",
  },
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
];

export default function Appliances() {
  const [applianceName, setApplianceName] = useState("");
  const [applianceConsumption, setApplianceConsumption] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userId, setUserId] = useState("");

  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [flatId, setFlatId] = useState([]);
  const [flatUser, setFlatUser] = useState("");

  const [tableData, setTableData] = useState([]);
  const [selectedIndexs, setSelectedIndexes] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState([]);
  const [initialValue, setInitialValue] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState({});
  const [tableDataFlat, setTableDataFlat] = useState([]);
  const [chosenFlat, setChosenFlat] = useState("");
  const [hours, setHours] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const handleCalculatedPrice = (event) => {
    setCalculatedPrice(event.target.value);
  };
  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };
  const handleUserId = (e) => {
    setUserId(e.target.value);
  };
  const handleChosenFlat = (e) => {
    setChosenFlat(e.target.value);
  };
  const renderSelectedFlat = () => {
    const selectedFlat = tableDataFlat.find(
      (flat) => flat.flatId === chosenFlat
    );
    return selectedFlat ? selectedFlat.name : "";
  };

  const handleApplianceName = (e) => {
    setApplianceName(e.target.value);
  };
  const handleApplianceConsumption = (e) => {
    setApplianceConsumption(e.target.value);
  };
  const handleStartDate = (e) => {
    setStartDate(e.$d);
  };
  const handleEndDate = (e) => {
    setEndDate(e.$d);
  };
  const calculateSelectedDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = Math.abs(end.getTime() - start.getTime());
      const selectedDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return selectedDays + 1;
    }
    return 0;
  };
  const calculateTotalHours = () => {
    const selectedDays = calculateSelectedDays();
    return selectedDays * hours;
  };
  const calculatePrice = () => {
    const selectedDays = calculateSelectedDays();
    const totalHours = calculateTotalHours();
    const consumption = parseFloat(applianceConsumption);
    const total = (consumption * hours) / 1000;
    // Calculate the price based on consumption and total hours
    const price = total * 0.80 * selectedDays;

    return price;
  };
  const [appliancePrice, setAppliancePrice] = useState("");
  useEffect(() => {
    setAppliancePrice(calculatePrice());
  }, [applianceConsumption, hours, startDate, endDate]);

  const handleAppliancePrice = (e) => {
    setAppliancePrice(e.target.value);
  };
  //get flats by user ID
  useEffect(() => {
    let flatUser = localStorage.getItem("user");
    if (flatUser) {
      setFlatUser(flatUser);
    }
  }, []);

  const handleGetFlatsByUserId = async () => {
    await fetch(
      `http://backend-licenta-eight.vercel.app/user/flats/${localStorage.getItem("user")}`,
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
        const selectOptions = data.data.map(({ name, _id }) => ({
          label: name,
          value: _id,
        }));
        setTableDataFlat(selectOptions);
      });
  };

  useEffect(() => {}, [tableDataFlat]);

  useEffect(() => {
    handleGetFlatsByUserId();
  }, []);

  // create appliance
  const handleCreateAppliance = async (e) => {
    e.preventDefault();
    await fetch("http://backend-licenta-eight.vercel.app/appliance/newAppliance", {
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
        flatId: selectedFlat,
        userId: flatUser,
      }),
    }).then((res) => res.json());
  };

  //get appliances by user id

  const handleGetAppliancesByUserId = async () => {
    await fetch(
      `http://backend-licenta-eight.vercel.app/user/appliances/${localStorage.getItem("user")}`,
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
        const transformed = data.data.map(
          ({
            _id,
            name,
            consumption,
            price,
            dateStart,
            dateEnd,
            flatId,
            userId,
          }) => ({
            // id: index + 1,
            id: _id,
            name: name,
            consumption: consumption,
            dateStart: dateStart,
            dateEnd: dateEnd,
            price: price,
            flatId: flatId,
            userId: userId,
          })
        );
        setTableData(transformed);
      });
  };

  useEffect(() => {}, [tableData]);

  useEffect(() => {
    handleGetAppliancesByUserId();
  }, []);

  //delete appliance
  const handleDeleteAppliance = async (e) => {
    //e.preventDefault();
    selectedIndexs.map(async (index) => {
      await fetch(`http://backend-licenta-eight.vercel.app/appliance/deleteAppliance/${index}`, {
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
      }).then((res) => res.json());
    });
  };
  //update appliance
  const handleUpdateAppliance = async (e) => {
    //e.preventDefault();
    selectedIndexs.map(async (index) => {
      await fetch(`http://backend-licenta-eight.vercel.app/appliance/updateAppliance/${index}`, {
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
          flatId: selectedFlat,
          userId: flatUser,
        }),
      }).then((res) => res.json());
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={stylem}>
          <div id="content-appliance">
            <Grid align="center" marginTop={5}>
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Name"
                defaultValue=""
                type="text"
                onChange={handleApplianceName}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Consumption"
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
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Price"
                type="text"
                value={appliancePrice || ""} // Add this line
                onChange={handleAppliancePrice}
                fullWidth
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment disableTypography position="end">
                      $
                    </InputAdornment>
                  ),
                }}
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
                  <TextField
                    style={style}
                    id="standard-helperText"
                    variant="standard"
                    label="Hours"
                    defaultValue=""
                    type="number"
                    onChange={handleHoursChange}
                    fullWidth
                  />
                </div>
                {/* <span>
                  <p>Selected Days: {calculateSelectedDays()}</p>
                  <p>Total Hours: {calculateTotalHours()}</p>
                </span> */}
              </LocalizationProvider>
              <Box sx={{ minWidth: 50 }}>
                <FormControl sx={{ m: 4, minWidth: 30 }}>
                  <ReactSelect
                    options={tableDataFlat}
                    onChange={(e) => setSelectedFlat(e.value)}
                  />
                </FormControl>
                <Button
                  style={btnStyle}
                  type="submit"
                  variant="contained"
                  onClick={handleCreateAppliance}
                >
                  Add
                </Button>
              </Box>
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
        <Box sx={stylem}>
          <div id="content-appliance">
            <header></header>
            <Grid align="center" marginTop={5}>
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Name"
                value={selectedAppliance.name}
                onChange={handleApplianceName}
                fullWidth
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Consumption"
                defaultValue=""
                type="text"
                onChange={handleApplianceConsumption}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment disableTypography position="end">
                      kWh
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                style={style}
                id="standard-helperText"
                variant="standard"
                label="Price"
                defaultValue=""
                type="text"
                onChange={handleAppliancePrice}
                fullWidth
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment disableTypography position="end">
                      $
                    </InputAdornment>
                  ),
                }}
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
                  <TextField
                    style={style}
                    id="standard-helperText"
                    variant="standard"
                    label="Hours"
                    defaultValue=""
                    type="number"
                    onChange={handleHoursChange}
                    fullWidth
                  />
                </div>
                {/* <div>
                  <p>Selected Days: {calculateSelectedDays()}</p>
                  <p>Total Hours: {calculateTotalHours()}</p>
                  {/* // <p>Total Price: {calculatePrice()}</p> */}
              </LocalizationProvider>
              <Box sx={{ minWidth: 50 }}>
                <FormControl sx={{ m: 2, minWidth: 30 }}>
                  <ReactSelect
                    options={tableDataFlat}
                    onChange={(e) => setSelectedFlat(e.value)}
                  />
                </FormControl>
                <Button
                  style={btnStyle}
                  type="submit"
                  variant="contained"
                  onClick={handleUpdateAppliance}
                >
                  Update
                </Button>
              </Box>
            </Grid>
          </div>
        </Box>
      </Modal>
      <div stylem={{ height: 300, width: "100%" }}>
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
          }}
        />
      </div>
    </form>
  );
}
