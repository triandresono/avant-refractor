import { Either } from "../base/core/Either";
import BaseResponse from "../base/response/BaseResponse";

export default abstract class HttpUtil {
  abstract post(params: {
    uri: string;
    body?: Record<string, any>;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>>;

  abstract get(params: {
    uri: string;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>>;

  abstract put(params: {
    uri: string;
    body?: Record<string, any>;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>>;

  abstract delete(params: {
    uri: string;
    parameter?: Record<string, any>;
    header?: Record<string, any>;
  }): Promise<Either<BaseResponse, Record<string, any>>>;
}
