import  {Request, Response, NextFunction, Router} from 'express';
import { ResponseHandler } from '../../utility/response-handler';
import businessService from './business.service';
import axios from 'axios';

export const BusinessRouter = Router();
const facebookAppId = process.env.FACEBOOK_APP_ID;
const redirectUri = 'https://9aa2-115-160-223-174.ngrok-free.app/callback';

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

BusinessRouter.get('/auth/facebook', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${redirectUri}&scope=ads_management,ads_read`;

        console.log('Redirecting to Facebook Login URL:', loginUrl);

        // Make an asynchronous request to the Facebook Login URL
        const response = await axios.get(loginUrl);
        console.log('Facebook Login URL Response:', response.data);

        res.redirect(loginUrl);
    } catch (error:any) {
        console.error('Error during Facebook Login URL request:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

BusinessRouter.get('/callback', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Callback received with query parameters:', req.query);

        // Exchange the code for an access token
        const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
            params: {
                client_id: facebookAppId,
                client_secret: process.env.FACEBOOK_APP_SECRET,
                redirect_uri: redirectUri,
                code: req.query.code,
            },
        });

        console.log('Access Token Response:', tokenResponse.data);

        const userInfoResponse = await axios.get('https://graph.facebook.com/me', {
            params: {
                access_token: tokenResponse.data.access_token,
                fields: 'id,name,email', // Add the required fields
            },
        });

        console.log('User Info Response:', userInfoResponse.data);

        res.send('Facebook Login Callback');
    } catch (error:any) {
        console.error('Error during callback:', error.message);
        res.status(500).send('Internal Server Error');
    }
});