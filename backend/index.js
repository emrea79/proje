import dotenv from "dotenv"
import express from "express"
import { createRequire } from "module";
import documents from './Routes/documents.js'
import authenticate from "./Routes/authenticate.js";
const require = createRequire(import.meta.url);
const cors = require('cors');

(async function () {
    dotenv.config();

    const { PORT } = process.env;
    const app = express();
    const server = app.listen(PORT, () => {
        console.log(`Backend started on port ${PORT}`)
    })

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "true");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
        next();
    });

    const corsOptions = {
        origin: 'http://localhost:5173',
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200
    }
    app.use(cors(corsOptions));

    app.use('/documents', documents, authenticate)
})()