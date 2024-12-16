import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DbService from '../services/DbService';
import { removeComplaint, setComplaints } from '../redux/slices/FormSlices';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';
import { IconButton } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function DetailPage() {


    const dispatch = useDispatch();

    const { complaints } = useSelector((state) => state.form);

    const getAllComplaint = async () => {
        try {
            const response = await DbService.complaintGet();
            if (response) {
                dispatch(setComplaints(response))
            }
        } catch (error) {
            toast("Şikayetler Listelenemedi!!!")
        }
    }

    useEffect(() => {
        getAllComplaint();
    }, [])


    return (
        <div className='list-div'>
            <Container maxWidth="xl">
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">İsim</TableCell>
                            <TableCell align="right">Soyisim</TableCell>
                            <TableCell align="right">Şikayet </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {complaints && complaints.map((complaint, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {complaint.id}
                                </TableCell>
                                <TableCell align="right">{complaint.name}</TableCell>
                                <TableCell align="right">{complaint.surname}</TableCell>
                                <TableCell align="right">{complaint.complaint} <IconButton
                                    size="small"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2, ml: 5 }}
                                >
                                    <RemoveIcon sx={{ fontSize: 14, color: 'black' }} />

                                </IconButton>
                                    <IconButton
                                        size="small"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                    >
                                        <EditIcon sx={{ fontSize: 14, color: 'black' }} />

                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Container>

        </div>
    )
}

export default DetailPage
