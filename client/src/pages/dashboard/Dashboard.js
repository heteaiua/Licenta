import "./Dashboard.css";
import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  MenuItem,
  Typography,
} from "@mui/material";

function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const [tableDataFlat, setTableDataFlat] = useState([]);
  const [flatUser, setFlatUser] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleViewAppliances = (flatId) => {
    setSelectedCard(flatId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const handleGetAllAppliancesByFlatId = async (flatId) => {
    try {
      if (!flatId) {
        return; // Skip the API call if flatId is null
      }

      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/flat/appliances/${flatId}`,
        {
          method: "GET",
          headers: {
            Authorization: "state.token",
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const data = await response.json();
      console.log("getAllAppliancesByFlatId", data);

      if (data && data.data) {
        const selectOptions = data.data.map(({ _id, name }) => ({
          id: _id,
          name: name,
        }));
        console.log("aiciiiiiii", selectOptions);
        setTableDataFlat(selectOptions);
      } else {
        setTableDataFlat([]);
      }
    } catch (error) {
      console.error("Error fetching appliances data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllAppliancesByFlatId(selectedCard);
  }, [selectedCard]);

  useEffect(() => {
    let flatUser = localStorage.getItem("user");
    if (flatUser) {
      setFlatUser(flatUser);
    }
  }, []);

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
    handleGetFlatsByUserId();
  }, []);

  return (
    <form>
      <div className="space">View your flats!</div>
      <div className="cardContainer">
        {tableData.map((flat) => (
          <Card
            key={flat.id}
            className={`card ${selectedCard === flat.id ? "selected" : ""}`}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {flat.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span>Street: {flat.street}</span>
                  <span>City: {flat.city}</span>
                  <span>County: {flat.county}</span>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => handleViewAppliances(flat.id)}
              >
                View appliances
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            tableDataFlat.map((appliance) => (
              <MenuItem key={appliance.id} value={appliance.id}>
                {appliance.name}
              </MenuItem>
            ))
          )}
        </DialogContent>
      </Dialog>
    </form>
  );
}

export default Dashboard;
