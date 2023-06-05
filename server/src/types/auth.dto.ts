export interface UserDetails {
    userName?: String;
    userEmail: String;
    userPassword: String;
    userRole?:String;
}

export interface LoginDetails{
    userEmail: String;
    userPassword: String;
}

export interface EditDetails{
    userName?: String;
    userEmail?: String;
    userPassword?: String;
}