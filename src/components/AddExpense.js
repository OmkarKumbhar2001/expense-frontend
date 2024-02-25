import { Button, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import "./css/addExpense.css";
import dayjs from 'dayjs';
import { GetAllUserProducts } from "../services/secure-requests";

export default function AddExpense() {
  const [products, setProducts] = useState([]);
  const defaultTime = dayjs();
  useEffect(()=>{
    GetAllUserProducts().then((response)=>{
      setProducts(response?.data?.products)
      console.log(response);
    }).catch((error)=>{
      console.log(error)
    })
  },[])
  console.log(products)
  return (
    <div className="addExpense">
      <TextField
        fullWidth
        required
        id="outlined-adornment-price"
        type="number"
        size="Normal"
        label="Ruppes"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="price" edge="end">
                <CurrencyRupee />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          size="Normal"
          options={products.map((option) => option?.product)}
          renderInput={(params) => (
            <TextField {...params} label="Add Your Product" />
          )}
        />
      </div>
      <div>
        <TextField
          fullWidth
          size="Normal"
          id="outlined-multiline-flexible"
          label="Description Optional"
          multiline
          maxRows={4}
        />
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}  size="small">
          <DemoContainer components={["DateTimePicker"]}  size="small">
            <DateTimePicker label="Select Time" value={defaultTime}  size="small"/>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div>
        <Button variant="contained">Submit</Button>
      </div>
    </div>
  );
}
