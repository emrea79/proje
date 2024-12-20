import axios from "../config/AxiosConfig";
import axiosUser from "../config/AxiosUserConfig";

class dbService {
    complaintPost(newComplaint) {
        return new Promise((resolve, reject) => {
            axios.post("/complaints", newComplaint)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }

    complaintGet() {
        return new Promise((resolve, reject) => {
            axios.get("/complaints")
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }

    complaintRemove(deleteComplaint) {
        return new Promise((resolve, reject) => {
            axios.delete(`/complaints/${deleteComplaint}`)
                .then((response) => resolve(`${deleteComplaint} idli şikayet silindi.`))
                .catch((err) => reject(err))
        })
    };

    userPost(newUser) {
        return new Promise((resolve, reject) => {
            axiosUser.post("/user", newUser)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        });
    }

    userGet() {
        return new Promise((resolve, reject) => {
            axiosUser.get("/user")
                .then((response) => resolve(response.data))
                .catch((error) => reject(error))
        })
    }

}




export default new dbService();