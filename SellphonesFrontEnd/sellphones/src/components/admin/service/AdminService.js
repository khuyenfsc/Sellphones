import AxiosClient from "../../../api/AxiosClient";
import { BaseAuthService } from "../../../service/base/BaseAuthService";

class AdminService extends BaseAuthService {
  constructor() {
    super({ basePath: "/admin", tokenKey: "adminAccessToken" });
  }


}

export default new AdminService();
