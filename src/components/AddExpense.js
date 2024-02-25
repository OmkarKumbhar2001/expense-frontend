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
import dayjs from "dayjs";
import { GetAllUserProducts } from "../services/secure-requests";
import { toast } from "react-hot-toast";
import { UserExpense } from "../services/user-service";

const AddExpense = (props)=> {
  const [userProducts, setProducts] = useState([]);
  const [getData, setgetData] = useState(true);
  const [formData, setFormData] = useState({
    product: "",
    spend: "",
    description: "",
    timing: dayjs(), // Initialize timing with current date/time
  });
  useEffect(() => {
    GetAllUserProducts()
      .then((response) => {
        setProducts(response?.data?.products);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getData]);
  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProductChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      product: value,
    }));
  };

  const submitSpend = async () => {
    let { product, spend, timing, description } = formData;

    if (!product || !spend || !timing || !description) {
      toast.error("Please fill in all fields.");
      return;
    } else {
      UserExpense(formData).then(res=>{
        console.log(res)
        if(getData){
          setgetData(false)
        }else{
          setgetData(true)
        }
        setFormData({
          product: "",
          spend: "",
          description: "",
          timing: dayjs(),
        });
      }).catch(err=>{
        console.log(err)
      })
      
      
    }
  };

 

  return (
    <div className="addExpense">
      <TextField
        fullWidth
        required
        id="outlined-adornment-price"
        type="number"
        size="Normal"
        label="Ruppes"
        name="spend"
        value={formData.spend}
        onChange={(e) => handleChange("spend", e.target.value)}
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
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          size="Normal"
          name="product"
          value={formData.product}
          onChange={handleProductChange}
          options={userProducts.map((option) => option?.product)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={formData.product}
              label="Search input"
              onChange={(e) => handleChange("product", e.target.value)}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>
      <div>
        <TextField
          fullWidth
          size="Normal"
          id="outlined-multiline-flexible"
          label="Description"
          name="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          multiline
          maxRows={4}
        />
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} size="small">
          <DemoContainer components={["DateTimePicker"]} size="small">
            <DateTimePicker
              label="Select Time"
              name="timing"
              value={formData.timing}
              onChange={(value) => handleChange("timing", value)}
              size="small"
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div>
        <Button variant="contained" onClick={submitSpend}>
          Submit
        </Button>
      </div>
    </div>
  );
}
export default AddExpense;