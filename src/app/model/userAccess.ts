export class UserAccess {
    username: string;
    accessToken: string;
    refreshToken: string;
}

export class UserInfo {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    about: string
}

export class UserLogin {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
