import StatusResponse from "./StatusResponse";

export default class BaseResponse {
  status: StatusResponse;
  data: any;

  constructor({
    status = new StatusResponse({}),
    data = null,
  }: BaseResponseParams) {
    this.status = status;
    this.data = data;
  }

  static fromJson(data: Record<string, any>): BaseResponse {
    return new BaseResponse({
      status: StatusResponse.fromMap(data),
      data: data,
    });
  }

  static status(status: StatusResponse): BaseResponse {
    return new BaseResponse({
      status: status,
    });
  }

  static exception(e: any): BaseResponse {
    return new BaseResponse({
      status: StatusResponse.exception(e),
    });
  }
}

interface BaseResponseParams {
  status?: StatusResponse;
  data?: any;
  failure?: boolean;
}
