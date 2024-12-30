import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    complaints: [],
    ministries: ["Adalet Bakanlığı",
        "Sağlık Bakanlığı",
        "Turizm Bakanlığı"
    ],
    selectedMinistry: "Tüm Bakanlıklar",
    selectedComplaint: [],
    editable: false,
    currentToken: null,
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
        updateComplaint: (state, action) => {
            const payload = {

            }
        },
        setSelectedMinistry: (state, action) => {
            state.selectedMinistry = action.payload;
        },
        setSelectedComplaint: (state, action) => {
            state.selectedComplaint = action.payload;
        },
        removeSelectedComplaint: (state, action) => {
            state.selectedComplaint = [...state.selectedComplaint.filter((complaint) => complaint.id !== action.payload)];
        },
        setEditable: (state, action) => {
            state.editable = action.payload;
        },
        setCurrentToken: (state, action) => {
            state.currentToken = action.payload;
        }
    },
})

export const { setComplaints, removeComplaint, setSelectedMinistry, setSelectedComplaint, removeSelectedComplaint, setEditable, setCurrentToken } = FormSlice.actions
export default FormSlice.reducer