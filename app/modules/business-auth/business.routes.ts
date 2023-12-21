import  {Request, Response, NextFunction, Router} from 'express';
import { ResponseHandler } from '../../utility/response-handler';
import businessService from './business.service';
import axios from 'axios';
import CircularJSON from 'circular-json'
import { Business, FacebookAdsApi, AdAccount, Page,InstagramUser , IGUser} from "facebook-nodejs-business-sdk"
import * as FB from "facebook-nodejs-business-sdk"
const accessToken = 'EAAPmvLHNJ7EBO3QAw0eANbXUivIjma2DSQ3YyB9Vl3u9SsPC0b0HCZB3Axd1ZBLha7ZCkXU66EBmZABQD0oognCRukbQEApkkAui0psA2YHpFtTaLlvtiyrZBs1rgEjCIzYo5xZBRVbaZAuLdaYJvfonjbsC6PHxfJgdAguGIsxncula7chSRHL06FmAGZCZBYxf4mbNozSWO9TBPCgeJMq206F8Aq9EbdcAmqZBMNiBZC0mnXhPst3ZACIo';
const api = FacebookAdsApi.init(accessToken);
// const adsSdk = require('facebook-nodejs-business-sdk');
// const AdAccount = adsSdk.AdAccount;
// const account = new AdAccount('act_<AD_ACCOUNT_ID>');
// console.log(account.id) 

export const BusinessRouter = Router();
const facebookAppId = process.env.FACEBOOK_APP_ID;
const redirectUri = 'https://9aa2-115-160-223-174.ngrok-free.app/business-auth/callback';

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
// # Initial request
// curl - i - X GET "https://graph.facebook.com/v12.0/me/accounts?access_token=YOUR_ACCESS_TOKEN"

// # Subsequent requests for pagination
// # Use the 'after' cursor from the previous response
// curl - i - X GET "https://graph.facebook.com/v12.0/me/accounts?access_token=YOUR_ACCESS_TOKEN&after=QVFIUll2RmJUVkd4SFRrRkhvVmF2STJ6eERzZAFJIZAEhqSjA5ZAUFuNWxKMG5vOFlJbThGWDdVT2FHaVpoSVQtV2dFZAF8yWVlETjhPSWpIdndNYmpmdkExUUln"



BusinessRouter.get('/auth/facebook', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const loginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${redirectUri}&scope=ads_management,ads_read`;
        const loginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${redirectUri}&scope=pages_show_list,instagram_basic,instagram_shopping_tag_products,instagram_manage_messages,instagram_manage_insights,instagram_manage_comments,instagram_basic,instagram_content_publish,business_management,ads_management,ads_read,public_profile,pages_read_engagement&login_type=business_suite`;

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


// BusinessRouter.get('/callback', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         console.log('Instagram Callback received with query parameters:', req.query);

//         // Exchange the code for an access token
//         const tokenResponse = await axios.post('https://graph.instagram.com/v12.0/access_token', null, {
//             params: {
//                 redirect_uri: redirectUri,
//                 code: req.query.code,
//                 grant_type: 'authorization_code',
//             },
//         });

//         console.log('Instagram Access Token Response:', tokenResponse.data);

//         // Now, you can use the obtained access token to make further API requests
//         const userInfoResponse = await axios.get(`https://graph.instagram.com/v12.0/me?fields=id,username&access_token=${tokenResponse.data.access_token}`);

//         console.log('Instagram User Info Response:', userInfoResponse.data);

//         res.send('Instagram Business Login Callback');
//     } catch (error: any) {
//         console.error('Error during Instagram callback:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// });


BusinessRouter.get('/get-photos', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const photos = await axios.get('https://graph.facebook.com/v18.0/3630218890591772/photos', {
            params: {
                access_token: "EAAPmvLHNJ7EBOZC4mJrhJsUqoF767E3RwH8M4ZA6UHhzAdXAuiZC9t31lDQ3bm0VYgulYSTWknsZAJw2FI4pB8y8VJ9EVlUXsySZCZAWCZBpnxNEXBJH4aW1gIFOQGvNqYMMGnePDmZBngLY6fv98Oh7ZCaVUHlR04EZCTIzmmjoGFhaSyvgmPygk6hZBvTzRmjmp5iCeKbPLK4esmtVZCCnKKIkzwDI8ZATeTddx4gNMKaz5aKpQdWXADm4F"
            },
        });

        console.log('Photos Response:', photos.data);

        // Use CircularJSON to stringify the object
        const photosString = CircularJSON.stringify(photos);

        res.send(photosString);
    } catch (error: any) {
        console.log(error)
        console.error('Error during callback:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


// BusinessRouter.get("/get-adaccounts", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // Retrieve the current business
//         const business = new Business('<your-business-id>');
//         await business.createAccessToken;

//         // Get ad accounts associated with the business
//         const adAccounts = await business.getAdAccounts([], { limit: 10 }); // You can adjust the limit as needed

//         console.log('Your ad accounts:');
//         for (const account of adAccounts) {
//             console.log(`- ID: ${account.id}, Name: ${account.name}`);
//         }

//         res.send(new ResponseHandler(adAccounts));
//     } catch (e) {
//         console.error(e);
//         next(e);
//     }
// });












/************************************TO GET AD ACCOUNT ID function******************************** */



async function getAdAccountID(accessToken: string): Promise<string | null> {
    try {
        const response = await axios.get(
            `https://graph.facebook.com/v18.0/me/adaccounts?fields=id&access_token=${accessToken}`
        );

        if (response.data && response.data.data && response.data.data.length > 0) {
            const adAccountID = response.data.data[0].id;
            console.log('Ad Account ID:', adAccountID);
            return adAccountID;
        } else {
            console.log('No ad accounts found for the user.');
            return 'No ad accounts found for the user.';
        }
    } catch (error: any) {
        console.error('Error fetching ad account ID:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/************************************TO GET AD ACCOUNT ID******************************** */
BusinessRouter.get('/get-adaccount', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = 'EAAPmvLHNJ7EBOZC4mJrhJsUqoF767E3RwH8M4ZA6UHhzAdXAuiZC9t31lDQ3bm0VYgulYSTWknsZAJw2FI4pB8y8VJ9EVlUXsySZCZAWCZBpnxNEXBJH4aW1gIFOQGvNqYMMGnePDmZBngLY6fv98Oh7ZCaVUHlR04EZCTIzmmjoGFhaSyvgmPygk6hZBvTzRmjmp5iCeKbPLK4esmtVZCCnKKIkzwDI8ZATeTddx4gNMKaz5aKpQdWXADm4F'; // Replace with your actual access token

        const adAccountID = await getAdAccountID(accessToken);

        if (adAccountID) {
            res.status(200).json({ adAccountID });
        } else {
            res.status(404).json({ error: 'Ad account not found' });
        }
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


/************************************TO GET INSTAGRAM ACCOUNT USING BUSINESS SDK ******************************** */
BusinessRouter.get('/get-instagram-account', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = 'EAAPmvLHNJ7EBO6kF1Kf0gKPSnxMrAOP0mxNLzV8cX20XXjwFwjefZB198UCO2zp1R9rurfs1ZAiWcVdIZBSzAqlvkqAeSJv1kVPmX8yJcYDsbUwrhxx6LUIxgAb1p3Do0nOPGVxGvE0UCb5utbUwlE2WSEFl33rEVJZCHVRvdS0lmoAZBykZB5bgsdiEUerdhztScLNUW4YJWBLznDZBu8cthXxOXIJ'; // Replace with your actual access token
        console.log("*********************OUTSIDE***********************")
        const api = FacebookAdsApi.getDefaultApi();
        const fields = ['email']; // Customize fields as needed
        const response = await api.call('GET', '/me', { fields });

        console.log(response.data);
        const business = new Business('913489976823223');
        console.log("****************************")
        const instagramAccountsCursor = await business.getOwnedInstagramAccounts([]);
        const instagramAccount1: never[] = [];
        await instagramAccountsCursor.forEach((instagramAccount) => {
            instagramAccounts.push(instagramAccount);
        });
        // console.log('Instagram Accounts:', instagramAccount1);
        // console.log("****************************")
        const adAccountID = await getAdAccountID(accessToken);
        const instagramAccounts = await business.getInstagramAccounts(
            ['id', 'username', 'profile_picture_url'],
        );
        // console.log("****************************")
        // console.log(instagramAccounts); 
        // console.log("****************************")
        // const user = await (new Page('me')).get([]);
        // console.log("*********************", user)
        if (adAccountID) {
            const adAccount = new AdAccount(adAccountID);
            // console.log("*********************", adAccount)
            const instagramAccounts = await adAccount.getInstagramAccounts(['id']);
            // console.log("*********************",instagramAccounts)
            const response = await adAccount.read([AdAccount.Fields.business_name]);

            if (response) {
                // console.log(response);
                res.status(200).json({ adAccountID, response });
            } else {
                res.status(404).json({ error: 'Instagram Ad account not found' });
            }
        }
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


/************************************TO INSTAGRAM ACCOUNT ACCESS TOKEN ******************************** */

BusinessRouter.get('/get-instagram-access-token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        //clientid and app id are both same thing 
        const clientId = "1098123041384369"
        const redirect_uri ='https://9aa2-115-160-223-174.ngrok-free.app'
        const accessToken = 'EAAPmvLHNJ7EBO6kF1Kf0gKPSnxMrAOP0mxNLzV8cX20XXjwFwjefZB198UCO2zp1R9rurfs1ZAiWcVdIZBSzAqlvkqAeSJv1kVPmX8yJcYDsbUwrhxx6LUIxgAb1p3Do0nOPGVxGvE0UCb5utbUwlE2WSEFl33rEVJZCHVRvdS0lmoAZBykZB5bgsdiEUerdhztScLNUW4YJWBLznDZBu8cthXxOXIJ'; // Replace with your actual access token
        const response = await axios.get(
            `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=${redirect_uri}&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement`
        );
        console.log(response)
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});