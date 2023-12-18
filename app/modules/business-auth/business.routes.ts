import  {Request, Response, NextFunction, Router} from 'express';
import { ResponseHandler } from '../../utility/response-handler';
import businessService from './business.service';

export const BusinessRouter = Router();


BusinessRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index');
});



BusinessRouter.get("/about-me", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await businessService.businessget();
        console.log("**************************", result, "**************************")
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})

BusinessRouter.get("/me", (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = businessService.aboutInfo();
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})

BusinessRouter.get("/active-ads", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await businessService.getActiveAds();
        console.log("**************************", result, "**************************")
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})

BusinessRouter.get("/create-campaign", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await businessService.createCampaign();
        console.log("**************************", result, "**************************")
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})

BusinessRouter.get("/get-campaign", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await businessService.getCampaigns();
        console.log("**************************", result, "**************************")
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})