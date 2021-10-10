import { IsEmail, IsOptional, IsString } from 'class-validator';

export class GetContactsFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
