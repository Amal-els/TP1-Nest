import { IsEmail, IsNotEmpty, isNotEmpty, IsStrongPassword, Max, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
