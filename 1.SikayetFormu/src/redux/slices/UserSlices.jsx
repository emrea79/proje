import { Password } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    currentUser: {
        id: "",
        username: "",
        password: "",
        complaintHistory: []
    }
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        updateCurrentUser: (state, action) => {
            const user = {
                ...action.payload
            }
            state.currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        }
    }
})

export const { setUsers, setCurrentUser, updateCurrentUser } = UserSlice.actions
export default UserSlice.reducer