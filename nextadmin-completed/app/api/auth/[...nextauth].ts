import NextAuth from "next-auth"
import { Account, User as AuthUser} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {User} from "../../lib/models";
import { connectToDB } from "@/app/lib/utils";

export const authOptions: any={
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {  label : "Email", type:'text'},
                password: {label   : "Password", type: "password"}
            },
            async authorize(credentials:any){
                await connectToDB();
                try{
                    const user = await User.findOne({email:credentials.email});
                    if(!user){
                        return null;
                    }
                    const valid = await bcrypt.compare(credentials.password, user.password);
                    if(!valid){
                        return null;
                    }
                    return user;
                }catch(err){
                    throw new Error(err);
                }
            }
            // async authorize(credentials: any, req: any) {
            //     const { email, password } = credentials;
            //     const db = await connectToDB();
            //     const user = await User.findOne({ email });
            //     if (!user) {
            //         return null;
            //     }
            //     const valid = await bcrypt.compare(password, user.password);
            //     if (!valid) {
            //         return null;
            //     }
            //     return user;
            // }
        })
    ], 
    callbacks:{
        async signIn({user, account}:{user:AuthUser; account:Account}){
            if(account?.provider == 'credentials'){
                return true;
            }
        }
    }
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};