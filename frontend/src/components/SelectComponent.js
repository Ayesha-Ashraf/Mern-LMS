import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

const SelectComponent = ({ handleChangeCategory, cat }) => {

    const { courseType } = useSelector(state => state.courseTypeAll);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cat}
                    label="Category"
                    onChange={handleChangeCategory}
                >
                    <MenuItem value="">All</MenuItem>
                    {
                        courseType && courseType.map(ct => (
                            <MenuItem key={ct._id} value={ct._id}>{ct.courseTypeName}</MenuItem>
                        ))
                    }


                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectComponent