import { AxiosError, AxiosResponse } from "axios";
import { Either, Left, Right } from "../base/core/Either";
import BaseResponse from "../base/response/BaseResponse";
import StatusResponse from "../base/response/StatusResponse";

export default class HttpUtilHandler {
  responseHandler(
    response: AxiosResponse
  ): Either<BaseResponse, Record<string, any>> {
    if (response.status !== 200) {
      return new Left(
        new BaseResponse({
          status: new StatusResponse({
            code: (response.status ?? 400).toString(),
            message: response.data.message ?? response.statusText,
          }),
        })
      );
    } else {
      return new Right(response.data);
    }
  }

  errorHandler(e: AxiosError<any>): BaseResponse {
    if (e.response?.data && typeof e.response?.data === "object") {
      if (e.response?.data["status"] != null) {
        if (typeof e.response?.data["status"] === "object") {
          return new BaseResponse({
            status: new StatusResponse({
              code:
                e.response?.data["status"]?.["code"] ??
                (e.response?.status ?? 400).toString(),
              message:
                e.response?.data["status"]?.["text"] ??
                e.message ??
                "Sorry Something Went Wrong",
            }),
          });
        } else if (typeof e.response?.data["status"] === "number") {
          const status = e.response?.data["status"];
          return new BaseResponse({
            data: e.response?.data,
            status: new StatusResponse({
              code: status != null ? status.toString() : "500",
              message:
                e.response?.data["message"] ??
                e.message ??
                "Sorry Something Went Wrong",
            }),
          });
        } else {
          const code = e.response?.status ?? 400;
          return new BaseResponse({
            status: new StatusResponse({
              code: code.toString(),
              message: "Sorry Something Went Wrong",
            }),
          });
        }
      } else {
        const code = e.response?.status ?? 400;
        return new BaseResponse({
          status: new StatusResponse({
            code: code.toString(),
            message: "Sorry Something Went Wrong",
          }),
        });
      }
    } else {
      const code = e.response?.status ?? 400;
      return new BaseResponse({
        status: new StatusResponse({
          code: code.toString(),
          message: "Sorry Something Went Wrong",
        }),
      });
    }
  }
}
