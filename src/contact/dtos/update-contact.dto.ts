import { IsString } from "class-validator";

export class UpdateContactDto {
  @IsString()
  phone: string;
}