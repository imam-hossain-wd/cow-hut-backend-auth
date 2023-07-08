import express, { Application, NextFunction, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/v1', router);
app.use(globalErrorHandler)


app.use('/',(req: Request, res: Response) => {
  res.send('<h1>welcome to cow-hat backend</h1>')
});

//not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'API Not Found',
        },
      ],
    });
    next();
  });
  

export default app;
