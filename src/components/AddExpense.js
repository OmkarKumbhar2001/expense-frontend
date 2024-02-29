import { IconButton, InputAdornment } from "@mui/material";
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
import LoadingButton from '@mui/lab/LoadingButton';
const AddExpense = (props)=> {
  const [userProducts, setProducts] = useState([]);
  const [getData, setgetData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    spend: "",
    description: "",
    timing: dayjs(), // Initialize timing with current date/time
  });
  const getTextFieldStyles = () => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', 
      },
      '&:hover fieldset': {
        borderColor: 'white', 
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', 
      },
    },
  });
  useEffect(() => {
    GetAllUserProducts()
      .then((response) => {
        setProducts(response?.data?.products);
      })
      .catch((error) => {
        console.error(error);
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
    setLoading(true)
    let { product, spend, timing, description } = formData;

    if (!product || !spend || !timing || !description) {
      toast.error("Please fill in all fields.");
      setLoading(false)
      return;
    } else {
      UserExpense(formData).then(res=>{
        setLoading(false)
        toast.success("Your Data is updated");
        props.checkUpdate(!getData);
        setgetData(!getData)
        setFormData({
          product: "",
          spend: "",
          description: "",
          timing: dayjs(),
        });
      }).catch(err=>{
        setLoading(false)
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
        sx={getTextFieldStyles()}
        InputLabelProps={{style: { color: "white" }, }}
        InputProps={{
          style: { color: "white" },
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
          sx={getTextFieldStyles()}
           InputLabelProps={{style: { color: "white" }, }}
           InputProps={{style: { color: "white" },}}
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
          sx={getTextFieldStyles()}
           InputLabelProps={{style: { color: "white" }, }}
           InputProps={{style: { color: "white" },}}
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
              sx={getTextFieldStyles()}
           InputLabelProps={{style: { color: "white" }, }}
           InputProps={{style: { color: "white" },}}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div>
        <LoadingButton loading={loading} loadingIndicator="Updating..." variant="contained" onClick={submitSpend}>
          Submit
        </LoadingButton>
      </div>
    </div>
  );
}
export default AddExpense;