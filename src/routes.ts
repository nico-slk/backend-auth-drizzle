import { Router } from "express";
import { AuthRoute } from "./router";

interface IApiPaths {
  url: string;
  router: Router;
}

export const ApiPaths: IApiPaths[] = [
  {
    url: "/auth",
    router: AuthRoute,
  },
];
