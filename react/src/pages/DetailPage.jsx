import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../services/DbService';
import { removeSelectedComplaint, setComplaints, setSelectedComplaint } from '../redux/slices/FormSlices';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Container } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import MinistryCategory from '../components/MinistryCategory';
import EditIcon from '@mui/icons-material/Edit';
import axiosBackendInstance from '../config/AxiosBackendConfig';



function DetailPage({ token }) {

    const isRun = useRef(false);
    const dispatch = useDispatch();
    const { complaints, selectedComplaint, selectedMinistry, ministries, editable } = useSelector((state) => state.form);
    const [data, setData] = useState(null)
    // const [newComplaint, setNewCompliant] = useState(complaints);


    const getAllComplaint = async () => {
        try {
            const response = await dbService.complaintGet();
            if (response) {
                dispatch(setComplaints(response))
            }
        } catch (error) {
            toast("Şikayetler Listelenemedi!!!")
        }
    }

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        axiosBackendInstance
            .get("/documents", config)
            .then((res) => console.log(res.data))
            .catch((error) => console.error("Hatamız:" + error));

    }, [])

    const getSelectedComplaint = async () => {
        try {
            const response = await dbService.complaintGet();
            if (response) {
                dispatch(setSelectedComplaint(response))
            }
        } catch (error) {
            toast("Şikayetler Listelenemedi!!!")
        }
    }

    useEffect(() => {
        getAllComplaint();
        getSelectedComplaint();
    }, [])

    const onRemoveComplaint = async (complaintId) => {
        dispatch(removeSelectedComplaint(complaintId))
        try {
            await dbService.complaintRemove(complaintId);
        } catch (error) {
            toast("Şikayet silinirken bir hata oluştu")
        }

    }

    const selectData = () => {
        let newList = [];
        if (selectedMinistry === "Tüm Bakanlıklar") {
            complaints && complaints.map((complaint) => {
                newList = [...newList, complaint];
            })
            dispatch(setSelectedComplaint(newList));
        }
        else {
            ministries && ministries.map((ministry) => {
                if (selectedMinistry === ministry) {
                    complaints && complaints.map((complaint) => {
                        if (complaint.ministry === ministry) {
                            newList = [...newList, complaint];
                        }
                    })
                    dispatch(setSelectedComplaint(newList));;
                }
            })
        }
    }

    useEffect(() => {
        selectData();
    }, [selectedMinistry])

    return (
        <div className='list-div'>
            <Container maxWidth="xl">
                <MinistryCategory />
                <div className='main-table'>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
                        <TableHead >
                            <TableRow sx={{ bgcolor: '#cfc597' }} >
                                <TableCell sx={{ color: 'white' }}>id</TableCell>
                                <TableCell sx={{ color: 'white' }} align="right">İsim</TableCell>
                                <TableCell sx={{ color: 'white' }} align="right">Soyisim</TableCell>
                                <TableCell sx={{ color: 'white' }} align="right">Bakanlık</TableCell>
                                <TableCell sx={{ color: 'white' }} align="right">Şikayet </TableCell>
                                <TableCell sx={{ color: 'white' }} align="right">İşlemler </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody  >
                            {selectedComplaint && selectedComplaint.map((complaint, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                >
                                    <TableCell component="th" scope="row">
                                        {complaint.id}
                                    </TableCell>
                                    <TableCell align="right">{complaint.name}</TableCell>
                                    <TableCell align="right">{complaint.surname}</TableCell>
                                    <TableCell align="right">{complaint.ministry}</TableCell>
                                    <TableCell align="right">{complaint.complaint}</TableCell>
                                    <TableCell align='right'>
                                        <Button onClick={() => onRemoveComplaint(complaint.id)}><RemoveIcon sx={{ fontSize: 14, color: 'black', cursor: 'pointer' }} /></Button>
                                        <Button><EditIcon sx={{ fontSize: 14, color: 'black', cursor: 'pointer' }} /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

            </Container>

        </div>
    )
}

export default DetailPage
