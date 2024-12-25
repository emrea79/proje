import express from "express"
const router = express.Router();


let data = ["corn", "wheat", "rice", "beatles", "pumpkins"];


const getDocuments = async (req, res) => {
    try {
        // const email = req.user;
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}
router.get('/', getDocuments)

export default router;