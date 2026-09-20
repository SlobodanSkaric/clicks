import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiResponseCustom } from "./api.response.js";

export class CustomException extends HttpException{
    constructor(public apiRes: ApiResponseCustom, statusCode: HttpStatus.BAD_REQUEST){
        super(apiRes, statusCode);
    }
}