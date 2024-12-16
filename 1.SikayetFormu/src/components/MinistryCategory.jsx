import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

function MinistryCategory() {

    const dispatch = useDispatch();
    const { ministries } = useSelector((state) => state.form);
    const [ministriesValue, setMinistriesValue] = useState("");

    const handleChange = (e) => {
        setMinistriesValue(e.target.value);
    }

    return (
        <div>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Ministries</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={ministriesValue}
                    onChange={handleChange}
                >
                    {
                        ministries && ministries.map((ministry, index) => (
                            <FormControlLabel key={index} value={ministry} control={<Radio />} label={ministry} />
                        ))
                    }


                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default MinistryCategory
