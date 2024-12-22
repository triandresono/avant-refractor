export default class LoginModel  {
  account: string;
  memberStatus: string;
  token: string;

  constructor({
    account = "",
    memberStatus = "",
    token = "",
  }: LoginModelParam) {
    this.account = account;
    this.memberStatus = memberStatus;
    this.token = token;
  }

  static fromJson(map: Record<string, any>): LoginModel {
    return new LoginModel({
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

interface LoginModelParam {
  account?: string;
  memberStatus?: string;
  token?: string;
}
