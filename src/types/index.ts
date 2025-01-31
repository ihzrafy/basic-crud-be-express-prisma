import { Request } from "express";

export interface CustomRequest extends Request {
  user?: IUser;
}

export interface IUser{
  username: string;
  email: string;
}

export interface CustomRequestStudent extends Request {
  user?: {
    name: string;
    nim: string;
    major: string;
  };
}
