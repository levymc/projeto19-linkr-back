import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.routes.js";
import dailyReset from "./utils/dailyreset.js";

//import { startActivityMonitoring } from "./repositories/activity.monitor.js";

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

dailyReset()  // daily reset of hashtag activity counter used for hashtag trend detection

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {

    console.log(`Running Linkr API on port ${PORT}`)
    //startActivityMonitoring()
})