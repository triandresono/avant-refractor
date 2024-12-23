import { Form } from "antd";
import LoginController from "../controller/LoginController.ts";
import { Paragraph } from "../../../shared/Typography.tsx";
import CustomInput from "../../../shared/CustomInput.tsx";
import Images from "../../../theme/images/Images.ts";

LoginPage.page = "/login_page";

export default function LoginPage() {
  const controller = new LoginController();

  return (
    <div className="relative flex h-[100vh] w-[100vw] items-center justify-center bg-login bg-cover bg-no-repeat">
      <Form onFinish={() => controller.loginSubmit()}>
        <div className=" w-[600px] rounded-xl bg-black/50 px-8 py-8 xl:w-[700px]"></div>
        <div className="mb-5 flex flex-col items-center justify-center space-y-5">
          <img src={Images.img_avantrade_logo} alt="avantrade logo" />
          <Paragraph className="text-4xl font-bold text-white">Avantrade Admin</Paragraph>
        </div>
        <Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
          <CustomInput placeholder="Username" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Password is required' }]}>
          <CustomInput placeholder="Password" type="password" />
        </Form.Item>
      </Form>
    </div>
  );
}
