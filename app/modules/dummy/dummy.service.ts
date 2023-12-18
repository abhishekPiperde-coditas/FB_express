import dummyRepo from "./dummy.repo";
// import { FacebookAds, AdAccount, Ad } from 'facebook-nodejs-business-sdk';
import * as FacebookAds1 from "facebook-nodejs-business-sdk";
// import * as FB from "fb";
/// <reference types="fb" />

//SAGAR TOKEN
// const accessToken ='EAAE9iRFcpOsBO9Yi69glZABx4CymVw0BzpOLElgMpgG46q813omRZCZBPQhUWUuX9n4dUFPbQHYMUBUrYD0ZCqWScVqYZA18ZAZCePO6YDzdNu9qpjJ1gmVQBFfMDNOT1oM4lxSYqZC6Uqmyv9UzsZB4ZC6kAaX02yqCoZB4GYKkkb9vGQawVmdsf8svRkvXZA9gr0MpYqsuZBgMZAgZCeKES85';
const accessToken = 'EAAPmvLHNJ7EBOxXZCz1gr6fWadeuATS4ZBSb07WZAfeEvoRKb3tzeZBvvohQnZCob1N8UOpsZA2JIrzZCsPzlTeJLOayvZAZBglS8KY8MByhIZAC8nz9RvhWiFJdIvavtetuwCwa1p6JGqKxKEChEakTTdERQVii9oZAn8emR3CotGY6RB5wrOMvikmUroM6VZASTqvb'
const Ad = FacebookAds1.Ad;
FacebookAds1.FacebookAdsApi.init(accessToken, undefined, false);
console.log(FacebookAds1.FacebookAdsApi.getDefaultApi())
const Campaign = FacebookAds1.Campaign;
const AdAccount = FacebookAds1.AdAccount;
const account = new AdAccount('act_1053918191852630');

const dummyGet = async () => {
    const dummy = await dummyRepo.get();
    const fields = ['account_id', 'name', 'balance'];
    const adAccountInfo = await account.read(fields);
    console.log('Ad Account Info:', adAccountInfo._data);

    const errorFunction = (scenarioName: string) => {
        let returnFunction = (error: string) => {
            console.log('An error occurred while processing, ' + scenarioName);
            console.log('Error Message:' + error);
        };
        return returnFunction;
    };

    const logPassedTest = (testName: any, data: any) => {
        console.log(testName);

        // console.log('Data:' + JSON.stringify(data));
    };

    let test8 = 'Pagination Campaign';

    try {
        const campaigns = await account.getCampaigns([Campaign.Fields.name], { limit: 2 });
        console.log("********************************************************************************")
        console.log("********************************************************************************")
        console.log("********************************************************************************")
        console.log(campaigns)
        console.log("********************************************************************************")
        console.log("********************************************************************************")
        console.log("********************************************************************************")
        console.log("INSIDE");
    } catch (error) {
        console.log("An error occurred:", error);
        return "KUCH NAHI";
    }

    console.log('Ad Account Info:', adAccountInfo._data);
    return adAccountInfo._data;
};

const aboutInfo = async () => {
    const FB = require("fb");

    console.log(FB.options);

    const test1 = FB.options({ timeout: 10000, accessToken: 'YOUR_ACCESS_TOKEN' });

    console.log(test1);

    const fetchData = () => {
        return new Promise((resolve, reject) => {
            FB.api('/me', { timeout: 10000 }, (res: any) => {
                if (res && res.error) {
                    console.log(res);
                    if (res.error.code === 'ETIMEDOUT') {
                        console.log('request timeout');
                        reject("request timeout");
                    } else {
                        console.log('error', res.error);
                        reject({ error: res.error });
                    }
                } else {
                    console.log("++++++++++++++=========", res, "================================");
                    resolve(res);
                }
            });
        });
    };

    try {
        const data = await fetchData();
        console.log("TESTTEST+ADSWDDDDDDDDDDDDDDDDD   ", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
};


const getActiveAds = async () => {
    try {
        
        const cursor = await account.getAds([], {
            [Ad.Fields.effective_status]: [Ad.EffectiveStatus.active],
        });

        const ads: any[] = [];

        while (cursor.hasNext()) {
            const page = await cursor.next();
            ads.push(...page);
        }

        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&", ads);
        if (ads.length<=0) return "NO ADS AVAILABLE"
        return ads;
    } catch (error) {
        console.log("(((((((((((((((((((((((((((((((", error);
        return error;
    }
};


const createCampaign = async () => {
    try {
        console.log(Campaign)
        const campaign = await account.createCampaign([], {
            [Campaign.Fields.name]: 'Test Campaign - Delete',
            [Campaign.Fields.status]: Campaign.Status.paused,
            [Campaign.Fields.objective]: Campaign.Objective.outcome_traffic,
            [Campaign.Fields.special_ad_categories]: ["EMPLOYMENT"] 
        });

        // console.log(':Pass', account);
        return campaign;
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getCampaigns = async () => {
    try {
        const campaigns = await account.getCampaigns([Campaign.Fields.name], { limit: 2 });
        console.log("********************************************************************************")
        console.log("********************************************************************************")
        console.log("********************************************************************************")
        console.log(campaigns)
        console.log("********************************************************************************")
        console.log("********************************************************************************")
        console.log("********************************************************************************")
        console.log("INSIDE");
    } catch (error) {
        console.log("An error occurred:", error);
        return "KUCH NAHI";
    }
}


// const 



export default {
    dummyGet,
    aboutInfo,
    getActiveAds,
    createCampaign,
    getCampaigns
};
