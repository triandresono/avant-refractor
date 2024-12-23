import { Either, Left, Right } from "../../../base/core/Either";
import StatusResponse from "../../../base/response/StatusResponse";
import HttpUtil from "../../../network/HttpUtil";
import HttpUtilImpl from "../../../network/HttpUtilImpl";
import LoginModel from "../model/LoginModel";
import LoginResponse from "./response/LoginResponse";

export abstract class LoginService {
  abstract login(
    map: Record<string, any>
  ): Promise<Either<StatusResponse, LoginModel>>;
}

export class LoginServiceImpl implements LoginService {
  readonly http: HttpUtil;
  constructor() {
    this.http = new HttpUtilImpl();
  }

  async login(
    map: Record<string, any>
  ): Promise<Either<StatusResponse, LoginModel>> {
    const response = await this.http.post({
      uri: "",
      body: map,
    });

    return response.fold(
      (error) => new Left(error?.status),
      (response) => {
        const result = LoginResponse.fromJson(response);
        if (result.status.success === true) {
          return new Right(LoginModel.fromJson(result.toJson()));
        } else {
          return new Left(result.status);
        }
      }
    ) as any;
  }
}
