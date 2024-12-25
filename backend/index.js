import dotenv from "dotenv"
import express from "express"
import { createRequire } from "module";
import documents from './Routes/documents.js'
// import authenticate from "./Routes/authenticate.js";

(async function () {
    dotenv.config();

    const { PORT } = process.env;
    const app = express();
    const server = app.listen(PORT, () => {
        console.log(`Backend started on port ${PORT}`)
    })

    // app.use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "true");
    //     res.setHeader("Access-Control-Max-Age", "1800");
    //     res.setHeader("Access-Control-Allow-Headers", "content-type");
    //     next();
    // });

    app.use('/documents', documents)
})()