import { User } from "src/app/shared/models/user.model";

export interface LoginResponse {
  user: User;
  token: string;
}
