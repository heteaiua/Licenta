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
  const [price, setPrice] = useState("");
  const [consumption, setConsumption] = useState("");
  const [totalConsumption, setTotalConsumption] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showTotalPrice, setShowTotalPrice] = useState(false);
  const handleConsumption = (e) => {
    setConsumption(e.target.value);
  };
  const handlePrice = (e) => {
    setTotalPrice(e.target.value);
  };
  const handleTotalPrice = () => {
    setShowTotalPrice(true);
  };
  const handleTotalConsumption = (e) => {
    setTotalConsumption(e.target.value);
  };

  const handleViewAppliances = (flatId) => {
    setSelectedCard(flatId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const calculateTotalPrice = (appliances) => {
    const totalPrice = appliances.reduce((accumulator, appliance) => {
      return accumulator + appliance.price;
    }, 0);
    return totalPrice;
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
        const appliances = data.data.map(
          ({ _id, name, price, consumption }) => ({
            id: _id,
            name: name,
            price: price,
            consumption: consumption,
          })
        );
        const totalPrice = calculateTotalPrice(appliances);
        console.log("appliance", appliances);
        setTableDataFlat(appliances);
        return totalPrice;
      } else {
        setTableDataFlat([]);
        return 0;
      }
    } catch (error) {
      console.error("Error fetching appliances data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetFlatsByUserId = async () => {
    try {
      let flatUser = localStorage.getItem("user");
      if (!flatUser) return;

      const response = await fetch(
        `http://localhost:5000/user/flats/${flatUser}`,
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
      console.log("datadadadadadadad", data);

      if (data && data.data) {
        const flats = data.data.map(({ _id, name, city, street, county }) => ({
          id: _id,
          name: name,
          city: city,
          street: street,
          county: county,
          userId: flatUser,
          totalPrice: 0,
        }));

        const flatsWithTotalPrice = await Promise.all(
          flats.map(async (flat) => {
            const totalPrice = await handleGetAllAppliancesByFlatId(flat.id);
            return { ...flat, totalPrice: totalPrice };
          })
        );

        console.log("flatsWithTotalPrice", flatsWithTotalPrice);
        setTableData(flatsWithTotalPrice);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching flats data:", error);
    }
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
              <Button size="small" color="primary">
                Total price: {flat.totalPrice}
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
                Nume: {appliance.name}, Pret: {appliance.price}
              </MenuItem>
            ))
          )}
        </DialogContent>
      </Dialog>
    </form>
  );
}

export default Dashboard;
