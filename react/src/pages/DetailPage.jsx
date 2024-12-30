import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../services/DbService';
import { removeSelectedComplaint, setComplaints, setSelectedComplaint } from '../redux/slices/FormSlices';
import { toast } from 'react-toastify';
import { Button, Container } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import MinistryCategory from '../components/MinistryCategory';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ComplaintTable from '../components/ComplaintTable';




function DetailPage({ token }) {

    const isRun = useRef(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { currentToken } = useSelector((state) => state.form)
    const { complaints, selectedComplaint, selectedMinistry, ministries, editable } = useSelector((state) => state.form);

    const [newComplaint, setNewCompliant] = useState(complaints);


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
        if (currentToken === 'null') {
            navigate("/");
            alert("Login Yapılmadı");
            return;
        }
    }, [currentToken])

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

    // const onRemoveComplaint = async (complaintId) => {
    //     dispatch(removeSelectedComplaint(complaintId))
    //     try {
    //         await dbService.complaintRemove(complaintId);
    //     } catch (error) {
    //         toast("Şikayet silinirken bir hata oluştu")
    //     }

    // }

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
                <ComplaintTable />

            </Container>

        </div>
    )
}

export default DetailPage
