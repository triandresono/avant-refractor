import { makeObservable, observable } from "mobx";
import { Case, ErrorCase, LoadingCase, SuccessCase } from "../../../base/core/Case";
import { LoginService, LoginServiceImpl } from "../service/LoginService";
import LoginModel from "../model/LoginModel";
import { LocalService, LocalServiceImpl } from "../../../service/LocalService";

export default class LoginController {
  readonly service: LoginService;
  readonly local: LocalService;
  @observable loginState: Case<LoginModel> = new Case();

  constructor() {
    this.service = new LoginServiceImpl();
    this.local = new LocalServiceImpl();
    makeObservable(this);
  }

  async loginSubmit(): Promise<void> {
    this.loginState = new LoadingCase();
    const response = await this.service.login({
      username: "",
      password: "",
      rememberMe: "",
    });
    response.fold(
      (error) => {
        this.loginState = new ErrorCase(error);
      },
      (result) => {
        this.local.setLogin(result);
        this.loginState = new SuccessCase(result);
      }
    );
  }
}
