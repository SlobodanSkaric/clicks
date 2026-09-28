import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        response.status(status).json({
            status: "messages",
            code: status === 404 ? 2003 : 4000,
            messgse: typeof exceptionResponse === "object" && exceptionResponse["message"]
                ? exceptionResponse["message"] : exceptionResponse,
            timestamp: new Date().toISOString()
        })
    }
}