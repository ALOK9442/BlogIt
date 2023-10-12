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
        try{
            return await this.account.get()
        } catch (error) {
            console.log("appwrite serious get current user error:", error)
        }
        return null
    }
    async userLogout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

export const authservice = new AuthService()

export default authservice