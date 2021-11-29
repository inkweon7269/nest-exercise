import { IsString } from "class-validator";
import { User } from "../../user/entities/user.entity";

export class CreateClubDto {
  @IsString()
  name: string;

  attendees: User[];
}