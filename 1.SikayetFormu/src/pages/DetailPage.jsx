import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DbService from '../services/DbService';
import { removeComplaint, removeSelectedComplaint, setComplaints, setSelectedComplaint } from '../redux/slices/FormSlices';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Container } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import MinistryCategory from '../components/MinistryCategory';



function DetailPage() {


    const dispatch = useDispatch();
    const { complaints, selectedComplaint } = useSelector((state) => state.form);
    const { selectedMinistry, ministries } = useSelector((state) => state.form)


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

    const getSelectedComplaint = async () => {
        try {
            const response = await DbService.complaintGet();
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

    const onRemoveComplaint = (complaintId) => {
        dispatch(removeSelectedComplaint(complaintId))

    }

    const selectData = () => {
        let newList = [];
        if (selectedMinistry === "Tüm Bakanlıklar") {
            console.log(`${selectedMinistry}dasiniz`)
            complaints && complaints.map((complaint) => {
                newList = [...newList, complaint];
            })
            dispatch(setSelectedComplaint(newList));
        }
        else {
            ministries && ministries.map((ministry) => {
                if (selectedMinistry === ministry) {
                    console.log(`${selectedMinistry}dasin`)
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
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead >
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">İsim</TableCell>
                            <TableCell align="right">Soyisim</TableCell>
                            <TableCell align="right">Bakanlık</TableCell>
                            <TableCell align="right">Şikayet </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
                                <TableCell align="right">{complaint.complaint}
                                    <Button onClick={() => onRemoveComplaint(complaint.id)}><RemoveIcon sx={{ fontSize: 14, color: 'black', marginLeft: '5px', cursor: 'pointer' }} /></Button>
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
