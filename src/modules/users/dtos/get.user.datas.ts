export class ResponseUsersoDto{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    plan: string;

    constructor(id: string, firstName: string, lastName: string, email: string, phoneNumber: string, role: string, plan: string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.plan = plan;
    }
}