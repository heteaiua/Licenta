// export default Consumption;
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Consumption = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataFlat, setTableDataFlat] = useState([]);
  const [flatUser, setFlatUser] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consumption, setConsumption] = useState("");
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [showTotalConsumption, setShowTotalConsumption] = useState(false);
  const [chartData, setChartData] = useState(null); // New state for chart data
  const [selectedFlatAppliances, setSelectedFlatAppliances] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hours, setHours] = useState(0);
  const [applianceConsumption, setApplianceConsumption] = useState("");
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
      console.log("selecteeeeeed"+selectedDays);
      return selectedDays + 1;

    }
    return 0;
  };
  const calculateCons = () => {
    const selectedDays = calculateSelectedDays();
    const consumption = parseFloat(applianceConsumption);
    const total = (consumption * hours) / 1000 * selectedDays;
    return total;
  };
  const [applianceCons, setApplianceCons] = useState("");
  useEffect(() => {
    setApplianceCons(calculateCons());
  }, [applianceConsumption, hours, startDate, endDate]);

  const generateChartData = (flat) => {
    const chartLabels = flat.appliances.map((appliance) => appliance.name);
    const chartData = flat.appliances.map((appliance) => appliance.consumption);
    const chartColors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#8B008B",
      "#FFD700",
      "#32CD32",
    ];

    return {
      labels: chartLabels,
      datasets: [
        {
          data: chartData,
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors,
        },
      ],
    };
  };
  const calculateTotalConsumptionForAllFlats = () => {
    const totalConsumption = tableData.reduce(
      (accumulator, flat) => accumulator + parseFloat(flat.totalConsumption),
      0
    );
    return totalConsumption.toFixed(2);
  };
  const handleViewAppliances = async (flatId) => {
    setSelectedCard(flatId);
    setOpenModal(true);
    try {
      const response = await fetch(
        `https://backend-licenta-eight.vercel.app/flat/appliances/${flatId}`,
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
        const appliancesData = data.data.map(({ _id, name, consumption, dateStart, dateEnd }) => ({
          id: _id,
          name: name,
          consumption: consumption,
          dateStart: startDate,
          dateEnd: endDate,
        }));
        setSelectedFlatAppliances(appliancesData);
        setChartData(generateChartData({ appliances: appliancesData }));
      } else {
        setSelectedFlatAppliances([]);
        setChartData(null);
      }
    } catch (error) {
      console.error("Error fetching appliances data:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const calculateTotalConsumption = (appliances) => {
    const totalConsumption = appliances.reduce((accumulator, appliance) => {
      const consumption = parseFloat(appliance.consumption);
      return accumulator + (isNaN(consumption) ? 0 : consumption);
    }, 0);
    return totalConsumption.toFixed(2);
  };

  const handleGetAllAppliancesByFlatId = async (flatId) => {
    try {
      if (!flatId) {
        return; // Skip the API call if flatId is null
      }

      setLoading(true);

      const response = await fetch(
        `https://backend-licenta-eight.vercel.app/flat/appliances/${flatId}`,
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
        const appliances = data.data.map(({ _id, name, consumption, dateStart, dateEnd }) => ({
          id: _id,
          name: name,
          consumption: consumption,
          startDate:dateStart,
          endDate: dateEnd,
        }));
        const totalConsumption = calculateTotalConsumption(appliances);
        console.log("appliance", appliances);
        setTableDataFlat(appliances);
        return totalConsumption;
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
        `https://backend-licenta-eight.vercel.app/user/flats/${flatUser}`,
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
          totalConsumption: 0,
        }));

        const flatsWithTotalConsumption = await Promise.all(
          flats.map(async (flat) => {
            const totalConsumption = await handleGetAllAppliancesByFlatId(
              flat.id
            );
            return { ...flat, totalConsumption: totalConsumption };
          })
        );

        console.log("flatsWithTotalConsumption", flatsWithTotalConsumption);
        setTableData(flatsWithTotalConsumption);

        // Generate chart data based on totalConsumption
        const chartLabels = flatsWithTotalConsumption.map((flat) => flat.name);
        const chartDataset = {
          label: "Total Consumption",
          data: flatsWithTotalConsumption.map((flat) => flat.totalConsumption),
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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Charts for consumption",
      },
    },
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <form>
      <div className="space">
        Total Consumption:{calculateTotalConsumptionForAllFlats()} Watt
      </div>
      <div className="space">
        Tn:{calculateSelectedDays()} Watt
      </div>
      <div className="chartContainer">
        {chartData && <Pie options={options} data={chartData} />}
      </div>
      <div className="cardContainer">
        {tableData.map((flat) => (
          <Card
            key={flat.id}
            className={`card ${selectedCard === flat.id ? "selected" : ""}`}
          >
            <CardActionArea component={Link} to={"/Home"}>
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
                Total consumption: {flat.totalConsumption}
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
                <div className="chartContainer">
                  <Pie options={options} data={chartData} />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default Consumption;
