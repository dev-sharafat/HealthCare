
import express,{ Application, Request, Response } from 'express';
import { prisma } from './app/lib/prisma';



const app: Application = express();
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/',async (req: Request, res: Response) => {
    const result = await prisma.specialty.create({
        data:{
            title:"Cardiology",
            description:"Cardiology",
        }
    });
    res.status(200).json({
        message:"Hello World",
        result
    });
});

export default app;