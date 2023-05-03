import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Link,
  TextField,
  Button,
  ButtonBase,
  Grid,
  Typography,
} from "@mui/material";
import "./Appliances.css";
import InputAdornment from "@mui/material/InputAdornment";
import Searchbar from "../../components/SearchBar";
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
const style = { margin: "10px " };
const btnStyle = { margin: "8px 0px" };

export default function Appliances() {
  return (
    <form>
      <div>
        <Searchbar />
      </div>
      <div id="content-appliance">
        <header></header>
        <Grid align="center" marginTop={5}>
          <Paper elevation={10} style={paperStyle}>
            <h2 style={btnStyle}>Frigider</h2>
            <TextField
              style={style}
              id="standard-helperText"
              variant="standard"
              label="Consumption/hour"
              defaultValue="3"
              type="text"
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
              defaultValue="1.5"
              type="text"
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

            <Button style={style} type="submit" variant="contained">
              Add
            </Button>
          </Paper>
        </Grid>
      </div>

      <div id="content-appliance">
        <header></header>
        <Grid align="center" marginTop={5}>
          <Paper elevation={10} style={paperStyle}>
            <h2 style={btnStyle}>Cuptor electric</h2>
            <TextField
              style={style}
              id="standard-helperText"
              variant="standard"
              label="Consumption/hour"
              defaultValue="3"
              type="text"
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
              defaultValue="1.5"
              type="text"
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

            <Button style={style} type="submit" variant="contained">
              Add
            </Button>
          </Paper>
        </Grid>
      </div>
      <div id="content-appliance">
        <header></header>
        <Grid align="center" marginTop={5}>
          <Paper elevation={10} style={paperStyle}>
            <h2 style={btnStyle}>Cuptor electric</h2>
            <TextField
              style={style}
              id="standard-helperText"
              variant="standard"
              label="Consumption/hour"
              defaultValue="3"
              type="text"
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
              defaultValue="1.5"
              type="text"
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

            <Button style={style} type="submit" variant="contained">
              Add
            </Button>
          </Paper>
        </Grid>
      </div>
      <div id="content-appliance">
        <header></header>
        <Grid align="center" marginTop={5}>
          <Paper elevation={10} style={paperStyle}>
            <h2 style={btnStyle}>Cuptor electric</h2>
            <TextField
              style={style}
              id="standard-helperText"
              variant="standard"
              label="Consumption/hour"
              defaultValue="3"
              type="text"
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
              defaultValue="1.5"
              type="text"
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

            <Button style={style} type="submit" variant="contained">
              Add
            </Button>
          </Paper>
        </Grid>
      </div>
      <div id="content-appliance">
        <header></header>
        <Grid align="center" marginTop={5}>
          <Paper elevation={10} style={paperStyle}>
            <h2 style={btnStyle}>Cuptor electric</h2>
            <TextField
              style={style}
              id="standard-helperText"
              variant="standard"
              label="Consumption/hour"
              defaultValue="3"
              type="text"
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
              defaultValue="1.5"
              type="text"
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

            <Button style={style} type="submit" variant="contained">
              Add
            </Button>
          </Paper>
        </Grid>
      </div>
      <div id="content-appliance">
        <header></header>
        <Grid align="center" marginTop={5}>
          <Paper elevation={10} style={paperStyle}>
            <h2 style={btnStyle}>Cuptor electric</h2>
            <TextField
              style={style}
              id="standard-helperText"
              variant="standard"
              label="Consumption/hour"
              defaultValue="3"
              type="text"
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
              defaultValue="1.5"
              type="text"
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

            <Button style={style} type="submit" variant="contained">
              Add
            </Button>
          </Paper>
        </Grid>
      </div>
      <div id="content-appliance">
        <header></header>
        <Grid align="center" marginTop={5}>
          <Paper elevation={10} style={paperStyle}>
            <h2 style={btnStyle}>Cuptor electric</h2>
            <TextField
              style={style}
              id="standard-helperText"
              variant="standard"
              label="Consumption/hour"
              defaultValue="3"
              type="text"
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
              defaultValue="1.5"
              type="text"
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

            <Button style={style} type="submit" variant="contained">
              Add
            </Button>
          </Paper>
        </Grid>
      </div>
      <div id="content-appliance">
        <header></header>
        <Grid align="center" marginTop={5}>
          <Paper elevation={10} style={paperStyle}>
            <h2 style={btnStyle}>Cuptor electric</h2>
            <TextField
              style={style}
              id="standard-helperText"
              variant="standard"
              label="Consumption/hour"
              defaultValue="3"
              type="text"
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
              defaultValue="1.5"
              type="text"
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

            <Button style={style} type="submit" variant="contained">
              Add
            </Button>
          </Paper>
        </Grid>
      </div>
    </form>
  );
}
