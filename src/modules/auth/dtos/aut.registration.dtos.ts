import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class AuthRegistrationDto{
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8,{ message: "Password musat be a least 8 characters long" })
    @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+$/, { message: "Password must have alpha, numberic and specials characeters" })
    password: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    

}