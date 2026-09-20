import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class AddAdministratorsDto{
    @ApiProperty({ example: "Slobodan", description: "Enter first name"})
    @IsNotEmpty()
    @IsString()
    firstName

    @ApiProperty({ example: "Skaric", description: "Enter last name"})
    @IsNotEmpty()
    @IsString()
    lastName

    @ApiProperty({ example: "slobodan.skaric@gmail.com", description: "Enter email"})
    @IsNotEmpty()
    @IsString()
    email

    @ApiProperty({ example: "Slobodan81!", description: "Enter password"})
    @IsNotEmpty()
    @IsString()
     @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+$/, { message: "Password must have alpha, numberic and specials characeters" })
    password

    @ApiProperty({ example: "+38165444756", description: "Enter phonenumber"})
    @IsNotEmpty()
    @IsString()
    @Matches(/^\+[0-9]{3}6[0-9]*$/, {message: "Phone number is in wrong formate"})
    phoneNumber


}