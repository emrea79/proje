import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl } from '@mui/material';
import { useFormik } from 'formik'
import { formSchema } from '../schema/FormSchema';
import { useNavigate } from 'react-router-dom';
import dbService from '../services/DbService';
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';

function HomePage() {

    const navigate = useNavigate();

    // const [ministry, setMinistry] = useState("");

    const submit = async (values) => {
        try {
            const payload = {
                id: String(Math.floor(Math.random() * 999999)),
                name: values.name,
                surname: values.surname,
                complaint: values.complaint
            }
            const response = await dbService.complaintPost(payload);
            if (response) {
                clear();
                toast("Şikayet kaydedildi");
                navigate("/details");
            }

        } catch (error) {
            toast("Şikayet kaydedilirken bir hata oluştu");
        }
    }

    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            name: '',
            surname: '',
            complaint: '',
        },
        onSubmit: submit,
        validationSchema: formSchema
    });

    const clear = () => {
        resetForm();
    }


    return (
        <div className='main'>
            <div className='main-form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-div'>
                        <TextField
                            sx={{ marginBottom: '10px' }}
                            label="isim"
                            id="name"
                            size="small"
                            value={values.name}
                            onChange={handleChange}
                            placeholder='İsim'
                            variant='outlined'
                            helperText={errors.name && <span style={{ color: 'red' }} >{errors.name}</span>}
                        />
                        <TextField
                            sx={{ marginBottom: '10px' }}
                            label="soyisim"
                            id="surname"
                            size="small"
                            value={values.surname}
                            onChange={handleChange}
                            placeholder='Soyisim'
                            variant='outlined'
                            helperText={errors.surname && <span style={{ color: 'red' }} >{errors.surname}</span>}
                        />
                        <TextField
                            sx={{ marginBottom: '10px', height: '40px' }}
                            label="şikayet"
                            id="complaint"
                            size="medium"
                            value={values.complaint}
                            onChange={handleChange}
                            placeholder='Metin'
                            variant='outlined'
                            helperText={errors.complaint && <span style={{ color: 'red' }} >{errors.complaint}</span>}
                        />
                        <div style={{ marginTop: '30px' }}>
                            <Button type='submit' size='small' sx={{ textTransform: 'none', marginRight: '10px' }} variant='contained' color='info'>Kaydet</Button>
                            <Button size='small' sx={{ textTransform: 'none', backgroundColor: '#cfc597', }} variant='contained' color='inherit' onClick={clear}>Temizle</Button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default HomePage
