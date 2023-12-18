import express from 'express';
import { connectToMongo } from './connections/mongo.connect';
import { registerRoutes } from './modules/routes/routes.register';
import cors from 'cors';

export const startServer = async () => {
    try {
        const app = express();
        app.use(cors())
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.set('view engine', 'ejs');
        app.set('views', 'C://Users/Coditas/Desktop/FB sdk/Application to test it/starter/app/views');

        await connectToMongo();
        registerRoutes(app);

        const { PORT } = process.env;
        app.listen(
            PORT,
            () => console.log(`SERVER STARTED ON PORT: ${PORT}`)
        )
    } catch (e) {
        console.error(e);
        console.error('COULD NOT START SERVER');
        process.exit(1);
    }
}