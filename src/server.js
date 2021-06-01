import express from 'express';
//import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';

import blogsRouter from './services/users/index.js';

const server = express();
const port = process.env.PORT;

server.use(express.json());
//server.use(cors());

server.use('/blogs', blogsRouter);

console.log(listEndpoints(server));

mongoose
	.connect(process.env.MONGO_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(
		server.listen(port, () => {
			console.log(`Running on port ${port}`);
		})
	)
	.catch((err) => console.log(err));
