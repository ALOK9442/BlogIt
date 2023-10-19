import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client  = new Client();
    account;
    constructor() {
        this.client 
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
            this.account = new Account(this.client)
    }
    async createAccount ({email,password,name}){
        try {
           const userAccount =  await this.account.create(ID.unique(), email,password,name)
           if(userAccount){
            //    console.log(userAccount)
            //some method to call
            return this.login({email,password})
           } else {
            return userAccount
           }
        } catch (error) {
            throw error
        }
    }

    async login ({email,password}){
        try {
           const loginDetails =  await this.account.createEmailSession(email,password)
           return loginDetails
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser() {
        console.log("appwrite get current data")
        try{
            console.log("appwrite get current user")
            return await this.account.get()
        } catch (error) {
            console.log("appwrite get current user error:", error)
            // throw error;
        }
        console.log("appwrite get current user return null")
        return null
    }
    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

export const authService = new AuthService()

export default authService