import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../services/DbService';
import { setComplaints, setSelectedComplaint } from '../redux/slices/FormSlices';
import { toast } from 'react-toastify';
import { Container } from '@mui/material';
import MinistryCategory from '../components/MinistryCategory';
import { useNavigate } from 'react-router-dom';
import ComplaintTable from '../components/ComplaintTable';


function DetailPage({ token }) {

    const isRun = useRef(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { currentToken } = useSelector((state) => state.form)
    const { complaints, selectedMinistry, ministries } = useSelector((state) => state.form);

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
