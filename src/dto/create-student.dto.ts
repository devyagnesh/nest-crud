import { IsNumber, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  roleNumber: number;

  @IsNotEmpty()
  @IsString()
  class: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  marks: number;
}
