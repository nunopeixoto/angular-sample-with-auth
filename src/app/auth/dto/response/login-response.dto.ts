import { User } from "src/app/shared/models/user.model";

export interface LoginResponseDto {
  user: User;
  token: string;
}
