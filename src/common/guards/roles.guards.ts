import { CanActivate, ExecutionContext, ForbiddenException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs/internal/Observable";
import { Role } from "../enums/role.enums.js";
import { ROLES_KEY } from "../decorators/role.decorator.js";
import { ApiResponseCustom } from "../../misc/api.response.js";
import { CustomException } from "../../misc/cutom.exceptions.js";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean  {
        const roleRequest = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,
            [
                context.getHandler(),
                context.getClass()
            ]
        )

        if(!roleRequest){
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if(!user || !user.role){
           throw new ForbiddenException("Role not found")
        }

        if(!roleRequest.includes(user.role)){
            throw new ForbiddenException("User forbidden this resource")
        }

        return true;
    }
}