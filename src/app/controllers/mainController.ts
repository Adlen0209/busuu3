import { Request, Response } from "express";
import debug from 'debug';
const logger = debug('Controller');


// Controller 

// renderHomePage


const renderHomePage = (req: Request, res: Response) => {
  try {
    res.json({
      message: 'Hello World',
    });
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { renderHomePage};