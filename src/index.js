import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';
const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();

// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';

// const app = express();

// const PORT = 3000;

// app.use(cors());

// app.use(
//   pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   }),
// );

// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// app.use(express.json());
// 4;

// app.get('/', (req, res, next) => {
//   res.json({
//     message: 'Hello m@loy',
//   });
// });

// app.use('*', (req, res, next) => {
//   res.status(404).json({
//     message: 'Не підтримується',
//   });
// });

// app.use('*', (req, res, next) => {
//   res.status(404).json({
//     message: 'не існує',
//   });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: 'Не існує такого контенту',
//     error: err.message,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // http://localhost:3000
