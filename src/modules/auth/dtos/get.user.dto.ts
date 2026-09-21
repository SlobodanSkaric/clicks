export class GetUserDto{
    id: string;
    firstName: string;
    lastaName: string;
    email: string;
    phoneNumber: string;
    plan: string;

    constructor(id: string, firstName: string, lastaName: string, email: string, phoneNumber: string, plan: string){
        this.id = id;
        this.firstName = firstName;
        this.lastaName = lastaName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.plan = plan;
    }
}