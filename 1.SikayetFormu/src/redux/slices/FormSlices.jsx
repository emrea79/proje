import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    complaints: []
}

export const FormSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setComplaints: (state, action) => {
            state.complaints = action.payload;
        },
        removeComplaint: (state, action) => {
            state.complaints = [...state.complaints.filter((complaint) => complaint.id !== action.payload)]

        }
    },
})

export const { setComplaints, removeComplaint } = FormSlice.actions
export default FormSlice.reducer