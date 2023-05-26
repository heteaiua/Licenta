import "./Dashboard.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

function Dashboard() {
  return (
    <form>
      <div className="space">View your flats and appliances for each flat!</div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Flat
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description flat(address)
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            View
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Dashboard;
