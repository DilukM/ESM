import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import donorRoutes from "./routes/donor_routes.js";
import dEventRoutes from "./routes/d_events_routes.js";
import itemsRoutes from "./routes/items_routes.js";
import items_outRoutes from "./routes/items_out_routes.js";

// data imports
import Donor from "./models/Donor.js";
import CurrentItems from "./models/CurrentItems.js";
import ReleaseItems from "./models/ReleaseItems.js";

import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import Items from "./models/Items.js";
import Items_In from "./models/Items_In.js";
import Items_out from "./models/Items_out.js";

import {
  dataUser,
  dataDonor,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";
import { dataItems_In, dataItems, dataItems_out } from "./data/ESM_Data.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/donors", donorRoutes);
app.use("/events", dEventRoutes);
app.use("/items", itemsRoutes);
app.use("/items_out", items_outRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
    // Donor.insertMany(dataDonor);
    // CurrentItems.insertMany(dataCurrentItems);
    // ReleaseItems.insertMany(dataReleaseItems);
    // Items.insertMany(dataItems);
    // Items_In.insertMany(dataItems_In);
    // Items_out.insertMany(dataItems_out);
  })
  .catch((error) => console.log(`${error} did not connect`));
