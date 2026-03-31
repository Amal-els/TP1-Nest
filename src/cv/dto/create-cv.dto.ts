import { IsNotEmpty } from "class-validator";

export class CreateCvDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    firstname: string;
    @IsNotEmpty()
    age: number;
    @IsNotEmpty()
    Cin: number;
    @IsNotEmpty()
    Job: string;
    @IsNotEmpty()
    path: string;
}
