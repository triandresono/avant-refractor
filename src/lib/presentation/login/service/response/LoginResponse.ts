import BaseResponse from "../../../../base/response/BaseResponse";
import StatusResponse from "../../../../base/response/StatusResponse";

export default class LoginResponse extends BaseResponse {
  account: string;
  memberStatus: string;
  token: string;

  constructor({
    statusResponse = new StatusResponse({}),
    account = "",
    memberStatus = "",
    token = "",
  }: LoginResponseParam) {
    super({ status: statusResponse });
    this.account = account;
    this.memberStatus = memberStatus;
    this.token = token;
  }

  static fromJson(map: Record<string, any>): LoginResponse {
    return new LoginResponse({
      statusResponse: StatusResponse.fromMap(map),
      account: map["account"] ?? "",
      memberStatus: map["memberStatus"] ?? "",
      token: map["token"] ?? "",
    });
  }

  toJson(): Record<string, any> {
    return {
      account: this.account,
      memberStatus: this.memberStatus,
      token: this.token,
    };
  }
}

interface LoginResponseParam {
  statusResponse?: StatusResponse;
  account?: string;
  memberStatus?: string;
  token?: string;
}
