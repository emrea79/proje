import axios from "../config/AxiosConfig";

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
}

export default new dbService();