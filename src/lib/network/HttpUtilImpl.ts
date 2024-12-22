import { Either, Left } from "../base/core/Either";
import BaseResponse from "../base/response/BaseResponse";
import HttpUtil from "./HttpUtil";
import axios, { AxiosResponse } from "axios";
import HttpUtilHandler from "./HttpUtilHandler";

export default class HttpUtilImpl implements HttpUtil {
  readonly handler: HttpUtilHandler;
  constructor() {
    this.handler = new HttpUtilHandler();
  }

  async post(params: {
    uri: string;
    body?: Record<string, any>;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>> {
    try {
      const response: AxiosResponse = await axios.post(
        params.uri,
        params.body,
        {
          headers: params.header,
          params: params.parameter,
        }
      );
      return this.handler.responseHandler(response);
    } catch (error: any) {
      return new Left(this.handler.errorHandler(error));
    }
  }

  async get(params: {
    uri: string;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>> {
    try {
      const response: AxiosResponse = await axios.get(params.uri, {
        headers: params.header,
        params: params.parameter,
      });
      return this.handler.responseHandler(response);
    } catch (error: any) {
      return new Left(this.handler.errorHandler(error));
    }
  }

  async put(params: {
    uri: string;
    body?: Record<string, any>;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>> {
    try {
      const response: AxiosResponse = await axios.put(params.uri, params.body, {
        headers: params.header,
        params: params.parameter,
      });
      return this.handler.responseHandler(response);
    } catch (error: any) {
      return new Left(this.handler.errorHandler(error));
    }
  }

  async delete(params: {
    uri: string;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>> {
    try {
      const response: AxiosResponse = await axios.delete(params.uri, {
        headers: params.header,
        params: params.parameter,
      });
      return this.handler.responseHandler(response);
    } catch (error: any) {
      return new Left(this.handler.errorHandler(error));
    }
  }
}
