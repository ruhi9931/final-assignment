export class User{
    public name: string;
    public address: string;
    public email: string;
    public phone: string;
    public dob: string;
    public dl: string;
    constructor(name:string,address:string,email:string,phone:string,dob:string,dl:string){
        this.name=name;
        this.address=address;
        this.email=email;
        this.phone=phone;
        this.dob=dob;
        this.dl=dl;
    }
}