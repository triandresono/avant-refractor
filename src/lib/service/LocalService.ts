import LoginModel from "../presentation/login/model/LoginModel";
import { get, set } from "local-storage";

export abstract class LocalService {
    abstract getLogin(): LoginModel;
    abstract setLogin(login: LoginModel): void;

}

export class LocalServiceImpl implements LocalService {

    setLogin(login: LoginModel): void {
        const json = JSON.stringify(login.toJson());
        set("user", json);
    }

    getLogin(): LoginModel {
        const json: string = get("user");
        if (json !== null) {
            const map = JSON.parse(json);
            return LoginModel.fromJson(map);
        } else {
            return new LoginModel({});
        }
    }

}