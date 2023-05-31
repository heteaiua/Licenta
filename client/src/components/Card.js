import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

function Cards() {
  return (
    <form>
      <div className="space">View your flats!</div>
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
            View appliances
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Cards;
