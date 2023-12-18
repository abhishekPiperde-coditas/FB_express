import  {Request, Response, NextFunction, Router} from 'express';
import { ResponseHandler } from '../../utility/response-handler';
import dummyService from './dummy.service';

export const DummyRouter = Router();

DummyRouter.get("/about-me", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await dummyService.dummyGet();
        console.log("**************************", result, "**************************")
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})

DummyRouter.get("/me", (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = dummyService.aboutInfo();
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})

DummyRouter.get("/active-ads", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await dummyService.getActiveAds();
        console.log("**************************", result, "**************************")
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})

DummyRouter.get("/create-campaign", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await dummyService.createCampaign();
        console.log("**************************", result, "**************************")
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})

DummyRouter.get("/get-campaign", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await dummyService.getCampaigns();
        console.log("**************************", result, "**************************")
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
})