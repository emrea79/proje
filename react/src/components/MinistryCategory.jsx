import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { setSelectedMinistry } from '../redux/slices/FormSlices';

function MinistryCategory() {

    const dispatch = useDispatch();
    const { ministries } = useSelector((state) => state.form);
    const { selectedMinistry } = useSelector((state) => state.form,)

    const handleChange = (e) => {
        dispatch(setSelectedMinistry(e.target.value));
    }

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 222 }}>
                <InputLabel id="select-helper-label">Bakanlık</InputLabel>
                <Select
                    labelId="select-helper-label"
                    name='ministry'
                    value={selectedMinistry}
                    label="bakanlık"
                    defaultValue={"Tüm Bakanlıklar"}
                    onChange={handleChange}
                    size='small'
                    variant='standard'

                >
                    <MenuItem value={"Tüm Bakanlıklar"}>Tüm Bakanlıklar</MenuItem>
                    {
                        ministries && ministries.map((ministry, index) => (
                            <MenuItem key={index} value={ministry}>{ministry}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default MinistryCategory
