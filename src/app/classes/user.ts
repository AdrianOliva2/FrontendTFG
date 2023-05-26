export class User {

    private id: String | undefined;
    private userName: String | undefined;
    private email: String | undefined;
    private phone: String | undefined;
    private department: String | undefined;

    public constructor(id: String|undefined=undefined, userName: String|undefined=undefined, email: String, phone: String|undefined=undefined, department: String|undefined=undefined) {
        this.setId(id);
        this.setUserName(userName);
        this.setEmail(email);
        this.setPhone(phone);
        this.setDepartment(department);
    }

    public getId(): String | undefined {
        return this.id;
    }

    public setId(id: String | undefined): void {
        this.id = id;
    }

    public getUserName(): String | undefined {
        return this.userName;
    }

    public setUserName(userName: String | undefined): void {
        this.userName = userName;
    }

    public getEmail(): String | undefined {
        return this.email;
    }

    public setEmail(email: String | undefined): void {
        this.email = email;
    }

    public getPhone(): String | undefined {
        return this.phone;
    }

    public setPhone(phone: String | undefined): void {
        this.phone = phone;
    }

    public getDepartment(): String {
        if (this.department != undefined)
            return this.department;
        return "";
    }

    public setDepartment(department: String | undefined): void {
        this.department = department;
    }

}
