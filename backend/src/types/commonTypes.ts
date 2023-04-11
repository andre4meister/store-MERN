import {Request} from "express";
import jwt from "jsonwebtoken";

export interface ObjectWithStringValues {
  [key: string]: string;
}

export interface DecodedData {
    _id: string;
    role: string;
    email: string;
    password: string;
}

export interface RequestWithDecodedData extends Request {
    decodedData: jwt.JwtPayload;
}