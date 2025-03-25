import express from 'express';
import path from 'path';
const app = express();
const port = 3000;
import cors from 'cors';
app.use(cors());
app.use(express.json());

import loginRouter from './routes/loginRouter.js';
import paintingRouter from "./routes/paintingRouter.js";
import artistRouter from "./routes/artistRouter.js";
import userRouter from './routes/userRouter.js';
import bidRouter from './routes/bidRouter.js';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/tokens", loginRouter);
app.use("/users", userRouter);
// Serve static files from the 'data/images' folder
app.use('/images', express.static(path.join(__dirname, 'data/images')));
app.use('/paintings', paintingRouter)
app.use('/artists', artistRouter)
app.use('/bids', bidRouter)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});