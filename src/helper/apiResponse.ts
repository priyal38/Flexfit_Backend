
import { Response } from 'express';
import jwt from 'jsonwebtoken'


export const successResponse = (res: Response, msg: string) => {
  const data = {
    status: 1,
    code: 200,
    message: msg,
  };
  return res.status(200).json(data);
};

  export const sendToken = (res: Response, statusCode: number, user:any) => {
    const token = jwt.sign({ id: user._id },"S2k3c0efrsfdsdsdfff2dsasdfd", {
      expiresIn: '1d',
    });

    res.status(statusCode).json({
      message: 'success',
      statusCode,
      token,
      user,
    });
  };

export const successResponseWithData = (res: Response, msg: string, data: any)=> {
  const resData = {
    status: 1,
    code: 200,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

export const errorResponse = (res: Response, msg: string)=> {
  const data = {
    status: 0,
    code: 500,
    message: msg,
  };
  return res.status(500).json(data);
};

export const errorResponseWithData = (res: Response, msg: string, data: any) => {
  const errorData = {
    status: 0,
    code: 500,
    message: msg,
    data: data
  };
  return res.status(500).json(errorData);
};

export const notFoundResponse = (res: Response, msg: string) => {
  const data = {
    status: 0,
    code: 404,
    message: msg,
  };
  return res.status(404).json(data);
};

export const AlreadyExists = (res: Response, msg: string) => {
  const data = {
    status: 0,
    code: 409,
    message: msg,
  };
  return res.status(409).json(data);
};

export const validationErrorWithData = (res: Response, msg: string, data: any) => {
  const resData = {
    status: 0,
    code: 400,
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};

export const serverErrorWithData = (res: Response, msg: string, data: any) => {
  const resData = {
    status: 0,
    code: 500,
    message: msg,
    data: data,
  };
  return res.status(500).json(resData);
};

export const unauthorizedResponse = (res: Response, msg: string) => {
  const data = {
    status: 0,
    message: msg,
    code: 401,
  };
  return res.status(401).json(data);
};

export const forbiddenResponse = (res: Response, msg: string = 'Forbidden') => {
  const data = {
    code: 403,
    status: 0,
    message: msg,
  };
  return res.status(403).json(data);
};
