import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const DropDownTextField = ({ province, district, city, onProvinceChange, onDistrictChange, onCityChange }) => {
  const provinces = [
    {
      name: "Central Province",
      districts: [
        {
          name: "Kandy",
          cities: [
            "Kandy", "Kadugannawa", "Ambatenna", "Ulapane", "Gurudeniya", "Dolapihilla", "Godamune", "Dolosbage", 
            "Dunuwila", "Pupuresssa", "Ankumbura", "Bopana", "Hatharaliyadda", "Pilimathalawa", "Hunnasgiriya", 
            "Tennekubura", "Handessa", "Udadumbara", "Gampola", "Ambatenna", "Teldeniya", "Peradeniya", 
            "Ethulgama", "Wattapolla", "Pattithalawa", "Gelioya"
          ],
        },
        {
          name: "Matale",
          cities: [
            "Matale", "Matale", "Matale", "Matale", "Matale", "Matale", "Matale", "Matale", "Matale", "Matale", "Matale", "Matale", "Matale"
          ],
        },
      ],
    },
  ];

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const provinceData = provinces.find((prov) => prov.name === province);
    setDistricts(provinceData ? provinceData.districts : []);
    setCities([]);
  }, [province]);

  useEffect(() => {
    const districtData = districts.find((dist) => dist.name === district);
    setCities(districtData ? districtData.cities : []);
  }, [district, districts]);

  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel
          sx={{
            "&.Mui-focused": { color: "#d67e75" },
            "&.MuiInputLabel-shrink": { color: "#d67e75" },
          }}
        >
          Province
        </InputLabel>
        <Select
          value={province}
          onChange={(e) => onProvinceChange(e.target.value)}
          label="Province"
          sx={{ padding: "12px" }}
        >
          <MenuItem value="">
            <em>Select Province</em>
          </MenuItem>
          {provinces.map((prov) => (
            <MenuItem key={prov.name} value={prov.name}>
              {prov.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel
          sx={{
            "&.Mui-focused": { color: "#d67e75" },
            "&.MuiInputLabel-shrink": { color: "#d67e75" },
          }}
        >
          District
        </InputLabel>
        <Select
          value={district}
          onChange={(e) => onDistrictChange(e.target.value)}
          label="District"
          sx={{ padding: "12px" }}
        >
          <MenuItem value="">
            <em>Select District</em>
          </MenuItem>
          {districts.map((district, index) => (
            <MenuItem key={`${district.name}-${index}`} value={district.name}>
              {district.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel
          sx={{
            "&.Mui-focused": { color: "#d67e75" },
            "&.MuiInputLabel-shrink": { color: "#d67e75" },
          }}
        >
          City
        </InputLabel>
        <Select
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          label="City"
          sx={{ padding: "12px" }}
        >
          <MenuItem value="">
            <em>Select City</em>
          </MenuItem>
          {cities.map((city, index) => (
            <MenuItem key={`${city}-${index}`} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownTextField;
