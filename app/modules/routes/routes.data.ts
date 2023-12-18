import { IExcludedPaths } from "../../utility/authorize";
import { BusinessRouter } from "../business-auth/business.routes";
import { DummyRouter } from "../dummy/dummy.routes";
import { Route, Routes } from "./routes.types";

export const routes: Routes = [
    new Route("/dummy", DummyRouter),
    new Route("/business-auth", BusinessRouter )
];

export const excludedPaths: IExcludedPaths[] = [
    { path: 'auth/login', method: "POST" }
]