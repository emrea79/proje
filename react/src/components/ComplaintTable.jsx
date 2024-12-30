import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../services/DbService';
import { removeSelectedComplaint } from '../redux/slices/FormSlices';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

function ComplaintTable() {
    const { selectedComplaint } = useSelector((state) => state.form)
    const dispatch = useDispatch();

    const onRemoveComplaint = async (complaintId) => {
        dispatch(removeSelectedComplaint(complaintId))
        try {
            await dbService.complaintRemove(complaintId);
        } catch (error) {
            toast("Şikayet silinirken bir hata oluştu")
        }

    }
    return (
        <div>
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
        </div>
    )
}

export default ComplaintTable
