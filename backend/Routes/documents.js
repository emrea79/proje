import express from "express"
const router = express.Router();


let data = {
    "sambankman@gmail.com": [
        "i am sorry",
        "not my fault",
        "binance is bad",
        "kevin is my best friend",
    ],
    "caroline@alameda.com": [
        "stop loss is bad",
        "conforable with risk",
        "never lost a trade",
        "alameda rocks!",
    ],
}


const getDocuments = async (req, res) => {
    try {
        const email = req.user;
        res.status(200).send(data[email])
    } catch (error) {
        res.status(500).send(error)
    }
}
router.get('/', getDocuments)

export default router;