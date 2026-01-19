import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";

export default function NewVolunteeringOpportunity() {
  const [categories, setCategories] = useState([]);

 useEffect(() => {
   fetch("/api/volunteering/enums/categories")
     .then((res) => {
       if (!res.ok) throw new Error(`HTTP ${res.status}`);
       return res.json();
     })
     .then(setCategories)
     .catch(console.error);
 }, []);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
  };

  return (
    <div className='min-h-screen bg-zooLight flex flex-col px-4 py-12'>
      <h1 className='text-3xl font-bold text-zooGreen text-center self-start'>New Volunteering Opportunity</h1>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Category</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={categories.length > 0 ? categories[0] : ""}
          label='Category'
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
