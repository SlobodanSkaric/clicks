import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class AuthLoginDto{
   @ApiProperty({ example: "slobodan.skaric@gmail.com", description: "Enter email"})
   @IsNotEmpty()
   @IsString()
   email

   @ApiProperty({ example: "Slobodan81!", description: "Enter password"})
   @IsNotEmpty()
   @IsString()
   password

}