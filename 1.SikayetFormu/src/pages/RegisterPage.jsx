import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dbService from '../services/DbService';
import { toast } from 'react-toastify';
import { registerSchema } from '../schema/RegisterSchema';
import { useFormik } from 'formik';


function RegisterPage() {

    const navigate = useNavigate();

    const submit = async (values) => {
        try {
            const payload = {
                id: String(Math.floor(Math.random() * 999999)),
                username: values.username,
                password: values.password,
                complaintHistory: []
            }
            const response = await dbService.userPost(payload)
            if (response) {
                clear();
                toast("Kullanıcı kaydoldu");
                navigate("/login")
            }
        } catch (error) {
            toast("Kayıt yapılırken bir problem çıktı")
        }
    }

    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: '',

        },
        onSubmit: submit,
        validationSchema: registerSchema
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
                            label="kullanıcı adı"
                            id="username"
                            size="small"
                            value={values.username}
                            onChange={handleChange}
                            placeholder='Kullanıcı adı'
                            variant='outlined'
                            helperText={errors.username && <span style={{ color: 'red' }} >{errors.username}</span>}
                        />
                        <TextField
                            sx={{ marginBottom: '10px' }}
                            label="sifre"
                            id="password"
                            size="small"
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            placeholder='Şifre'
                            variant='outlined'
                            helperText={errors.password && <span style={{ color: 'red' }} >{errors.password}</span>}
                        />

                        <div style={{ marginTop: '30px' }}>
                            <Button type='submit' size='small' sx={{ textTransform: 'none', marginRight: '10px' }} variant='contained' color='info'>Kaydet</Button>
                            <Button size='small' sx={{ textTransform: 'none', backgroundColor: '#cfc597', marginRight: '10px' }} variant='contained' color='inherit' onClick={clear}>Temizle</Button>
                            <Button onClick={() => navigate("/login")} size='small' sx={{ textTransform: 'none', marginRight: '10px' }} variant='contained' color='success'>Login Page</Button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default RegisterPage
