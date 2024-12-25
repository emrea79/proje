import express from "express"
const router = express.Router();


let data1 = ["corn", "wheat", "rice", "beatles", "pumpkins"];


const getDocuments = async (req, res) => {
    try {
        res.status(200).send(data1)
    } catch (error) {
        res.status(500).send(error)
    }
}
router.get('/', getDocuments)

export default router;