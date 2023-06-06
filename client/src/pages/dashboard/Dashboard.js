// import "./Dashboard.css";
// import * as React from "react";
// import { useState, useEffect } from "react";
// import Card from "@mui/material/Card";
// import {
//   Button,
//   CardActionArea,
//   CardActions,
//   CardContent,
//   Dialog,
//   DialogContent,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { faker } from "@faker-js/faker";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );
// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Line Chart",
//     },
//   },
// };

// const labels = ["January", "February", "March", "April", "May", "June", "July"];
// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };
// function Dashboard() {
//   const [tableData, setTableData] = useState([]);
//   const [tableDataFlat, setTableDataFlat] = useState([]);
//   const [flatUser, setFlatUser] = useState("");
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [price, setPrice] = useState("");
//   const [consumption, setConsumption] = useState("");
//   const [totalConsumption, setTotalConsumption] = useState("");
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [showTotalPrice, setShowTotalPrice] = useState(false);
//   const handleConsumption = (e) => {
//     setConsumption(e.target.value);
//   };
//   const handlePrice = (e) => {
//     setTotalPrice(e.target.value);
//   };
//   const handleTotalPrice = () => {
//     setShowTotalPrice(true);
//   };
//   const handleTotalConsumption = (e) => {
//     setTotalConsumption(e.target.value);
//   };

//   const handleViewAppliances = (flatId) => {
//     setSelectedCard(flatId);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedCard(null);
//     setOpenModal(false);
//   };

//   const calculateTotalPrice = (appliances) => {
//     const totalPrice = appliances.reduce((accumulator, appliance) => {
//       return accumulator + appliance.price;
//     }, 0);
//     return totalPrice;
//   };

//   const handleGetAllAppliancesByFlatId = async (flatId) => {
//     try {
//       if (!flatId) {
//         return; // Skip the API call if flatId is null
//       }

//       setLoading(true);

//       const response = await fetch(
//         `http://localhost:5000/flat/appliances/${flatId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: "state.token",
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );

//       const data = await response.json();
//       console.log("getAllAppliancesByFlatId", data);

//       if (data && data.data) {
//         const appliances = data.data.map(
//           ({ _id, name, price, consumption }) => ({
//             id: _id,
//             name: name,
//             price: price,
//             consumption: consumption,
//           })
//         );
//         const totalPrice = calculateTotalPrice(appliances);
//         console.log("appliance", appliances);
//         setTableDataFlat(appliances);
//         return totalPrice;
//       } else {
//         setTableDataFlat([]);
//         return 0;
//       }
//     } catch (error) {
//       console.error("Error fetching appliances data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGetFlatsByUserId = async () => {
//     try {
//       let flatUser = localStorage.getItem("user");
//       if (!flatUser) return;

//       const response = await fetch(
//         `http://localhost:5000/user/flats/${flatUser}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: "state.token",
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       const data = await response.json();
//       console.log("datadadadadadadad", data);

//       if (data && data.data) {
//         const flats = data.data.map(({ _id, name, city, street, county }) => ({
//           id: _id,
//           name: name,
//           city: city,
//           street: street,
//           county: county,
//           userId: flatUser,
//           totalPrice: 0,
//         }));

//         const flatsWithTotalPrice = await Promise.all(
//           flats.map(async (flat) => {
//             const totalPrice = await handleGetAllAppliancesByFlatId(flat.id);
//             return { ...flat, totalPrice: totalPrice };
//           })
//         );

//         console.log("flatsWithTotalPrice", flatsWithTotalPrice);
//         setTableData(flatsWithTotalPrice);
//       } else {
//         setTableData([]);
//       }
//     } catch (error) {
//       console.error("Error fetching flats data:", error);
//     }
//   };

//   useEffect(() => {
//     handleGetFlatsByUserId();
//   }, []);

//   return (
//     <form>
//       <div className="space">View your flats!</div>
//       <Line options={options} data={data} />
//       <div className="cardContainer">
//         {tableData.map((flat) => (
//           <Card
//             key={flat.id}
//             className={`card ${selectedCard === flat.id ? "selected" : ""}`}
//           >
//             <CardActionArea>
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {flat.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   <span>Street: {flat.street}</span>
//                   <span>City: {flat.city}</span>
//                   <span>County: {flat.county}</span>
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//             <CardActions>
//               <Button
//                 size="small"
//                 color="primary"
//                 onClick={() => handleViewAppliances(flat.id)}
//               >
//                 View appliances
//               </Button>
//               <Button size="small" color="primary">
//                 Total price: {flat.totalPrice}
//               </Button>
//             </CardActions>
//           </Card>
//         ))}
//       </div>
//       <Dialog open={openModal} onClose={handleCloseModal}>
//         <DialogContent>
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             tableDataFlat.map((appliance) => (
//               <MenuItem key={appliance.id} value={appliance.id}>
//                 Nume: {appliance.name}, Pret: {appliance.price}
//               </MenuItem>
//             ))
//           )}
//         </DialogContent>
//       </Dialog>
//     </form>
//   );
// }

// export default Dashboard;
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
  };
  return (
    <form>
      <div className="space">View your flats!</div>
      {chartData && <Line options={options} data={chartData} />}{" "}
      {/* Render the chart only if chartData is available */}
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
                <div>{appliance.name}</div>
                <div>:</div>
                <div> {appliance.price}</div>
              </MenuItem>
            ))
          )}
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default Dashboard;
