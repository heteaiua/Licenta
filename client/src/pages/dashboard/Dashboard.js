// export default Dashboard;
import "./Dashboard.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
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
  const [chartData, setChartData] = useState(null); // New state for chart data
  const [selectedFlatAppliances, setSelectedFlatAppliances] = useState([]);

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

  const handleViewAppliances = async (flatId) => {
    setSelectedCard(flatId);
    setOpenModal(true);
    try {
      const response = await fetch(
        `http://backend-licenta-eight.vercel.app/flat/appliances/${flatId}`,
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
      if (data && data.data) {
        const appliancesData = data.data.map(
          ({ _id, name, price, consumption }) => ({
            id: _id,
            name: name,
            price: price,
            consumption: consumption,
          })
        );
        setSelectedFlatAppliances(appliancesData);
      } else {
        setSelectedFlatAppliances([]);
      }
    } catch (error) {
      console.error("Error fetching appliances data:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const calculateTotalPrice = (appliances) => {
    const totalPrice = appliances.reduce((accumulator, appliance) => {
      return accumulator + appliance.price;
    }, 0);
    return totalPrice.toFixed(2);
  };
  const calculateTotalPriceForAllFlats = () => {
    const totalPrice = tableData.reduce(
      (accumulator, flat) => accumulator + parseFloat(flat.totalPrice),
      0
    );
    return totalPrice.toFixed(2);
  };

  const handleGetAllAppliancesByFlatId = async (flatId) => {
    try {
      if (!flatId) {
        return; // Skip the API call if flatId is null
      }

      setLoading(true);

      const response = await fetch(
        `http://backend-licenta-eight.vercel.app/flat/appliances/${flatId}`,
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
        `http://backend-licenta-eight.vercel.app/user/flats/${flatUser}`,
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

        // Generate chart data based on totalPrice
        const chartLabels = flatsWithTotalPrice.map((flat) => flat.name);
        const chartDataset = {
          label: "Total Price",
          data: flatsWithTotalPrice.map((flat) => flat.totalPrice),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        };
        setChartData({
          labels: chartLabels,
          datasets: [chartDataset],
        });
      } else {
        setTableData([]);
        setChartData(null); // Reset chart data if there are no flats
      }
    } catch (error) {
      console.error("Error fetching flats data:", error);
    }
  };

  useEffect(() => {
    handleGetFlatsByUserId();
  }, []);
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Total prices for each flat",
  //     },
  //   },
  // };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <form>
      <div className="content">
        <div className="space">
          Total price:{calculateTotalPriceForAllFlats()} RON
        </div>
        <div className="chartContainer">
          {chartData && <Line options={options} data={chartData} />}
        </div>
        <div className="cardContainer">
          {tableData.map((flat) => (
            <Card
              key={flat.id}
              className={`card ${selectedCard === flat.id ? "selected" : ""}`}
            >
              <CardActionArea component={Link} to={"/Consumption"}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {flat.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div>Street: {flat.street}</div>
                    <div>City: {flat.city}</div>
                    <div>County: {flat.county}</div>
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
              <div className="loading">Loading...</div>
            ) : (
              <div>
                {selectedFlatAppliances.length === 0 ? (
                  <div className="noAppliances">
                    No appliances found for this flat.
                  </div>
                ) : (
                  selectedFlatAppliances.map((appliance) => (
                    <MenuItem key={appliance.id} value={appliance.id}>
                      <div>{appliance.name}</div>
                      <div>:</div>
                      <div> {appliance.price.toFixed(2)}</div>
                    </MenuItem>
                  ))
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </form>
  );
};

export default Dashboard;
