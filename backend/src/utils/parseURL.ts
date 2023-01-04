import { Request, Response } from 'express';
interface RequestWithPathname extends Request {
  pathname: string;
}

export default (baseURL: string) => (req: RequestWithPathname, res: Response) => {
  const parsedURL = new URL(req.url, baseURL);

  const params = {} as any;
  parsedURL.searchParams.forEach((value, key) => (params[key] = value));

  req.params = params;
  req.pathname = parsedURL.pathname;
};
