

export interface LoginApiRequest{
email:string
password:string
}

export interface LoginResponse{
    accesstoken:string;
    role:string
}