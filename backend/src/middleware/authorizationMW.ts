import {NextFunction, Response} from 'express';
import {URL} from 'url';
import {mappingsUseCasesProfiles} from "../configs/profiles.js";
import {RequestWithDecodedData} from "../types/commonTypes.js";

export default function authorizationMW(req: RequestWithDecodedData, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
        return;
    }

    const url = new URL(req.originalUrl, `${req.protocol}://${req.headers.host}`);
    url.search = '';
    const endpoint = url.pathname;
    const method = req.method.toLowerCase();
    let mappingUseCase = endpoint + "/" + method;
    mappingUseCase = mappingUseCase.split('/').filter(str => !/\d/.test(str) && str !== "").join('/');

    try {
        if (!mappingsUseCasesProfiles[mappingUseCase]) {
            throw new Error("No mapping for such use case");
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'No such endpoint', error: e});
        return;
    }

    const userRole = (req.decodedData?.role) || "anonim";
    const isAuthorized = mappingsUseCasesProfiles[mappingUseCase].includes(userRole);

    if (!isAuthorized) {
        return res.status(400).json({message:"User is not authorized"});
    }

    next();
}
