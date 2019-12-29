import { NextPageContext } from "next";
import { Authentication } from "./Authentication";

export interface PageContext extends NextPageContext {
  authentication: Authentication
}
