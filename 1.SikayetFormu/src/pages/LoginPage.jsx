import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dbService from '../services/DbService';
import { toast } from 'react-toastify';
import { registerSchema } from '../schema/RegisterSchema';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/slices/UserSlices';

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkUser = (userList, username, password) => {
        const response = { result: false, currentUser: null };

        userList.forEach((user) => {
            if (user.username == username && user.password == password) {
                response.result = true;
                response.currentUser = user
            }
        })
        return response;
    }

    const submit = async (values) => {
        try {
            const response = await dbService.userGet()
            if (response) {
                const checkUserResponse = checkUser(response, values.username, values.password)
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    //localstorage?
                    localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser))
                    navigate("/")
                }
                else {
                    alert("Hatalı kullanıcı adı veya şifre girdiniz")
                    console.log(`${values.username} ve ${values.password}`)
                }
            }

        } catch (error) {
            toast("Giriş yapılırken bir problem çıktı")
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
                            <Button type='submit' size='small' sx={{ textTransform: 'none', marginRight: '10px' }} variant='contained' color='info'>Giriş Yap</Button>
                            <Button size='small' sx={{ textTransform: 'none', backgroundColor: '#cfc597', marginRight: '10px' }} variant='contained' color='inherit' onClick={clear}>Temizle</Button>
                            <Button onClick={() => navigate("/register")} size='small' sx={{ textTransform: 'none', marginRight: '10px' }} variant='contained' color='success'>Register Page</Button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default LoginPage
