import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    complaints: [],
    ministries: ["Adalet Bakanlığı",
        "Sağlık Bakanlığı",
        "Turizm Bakanlığı"
    ],
    selectedMinistry: "Tüm Bakanlıklar",
    selectedComplaint: [],
}

export const FormSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setComplaints: (state, action) => {
            state.complaints = action.payload;
        },
        removeComplaint: (state, action) => {
            state.complaints = [...state.complaints.filter((complaint) => complaint.id !== action.payload)];
        },
        setSelectedMinistry: (state, action) => {
            state.selectedMinistry = action.payload;
        },
        setSelectedComplaint: (state, action) => {
            state.selectedComplaint = action.payload;
        },
        removeSelectedComplaint: (state, action) => {
            state.selectedComplaint = [...state.selectedComplaint.filter((complaint) => complaint.id !== action.payload)];
        }
    },
})

export const { setComplaints, removeComplaint, setSelectedMinistry, setSelectedComplaint, removeSelectedComplaint } = FormSlice.actions
export default FormSlice.reducer