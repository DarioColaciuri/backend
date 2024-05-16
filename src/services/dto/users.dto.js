export default class UserDTO {
    constructor({ username, first__name, last__name, email, age }) {
        this.first__name = first__name;
        this.username = username;
        this.last__name = last__name;
        this.email = email;
        this.age = age;
    }
}