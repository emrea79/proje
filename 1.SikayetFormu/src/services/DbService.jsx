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

}




export default new dbService();