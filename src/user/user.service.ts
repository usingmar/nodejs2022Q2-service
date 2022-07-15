import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./user.entity";
import {v4} from "uuid";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";

@Injectable()
export class UserService{
    
    private users: User[] = [];

    readAll(){
        return this.users.map((item) => {
            return {
                id: item.id,
                login: item.login,
                version: item.version,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }
        });
    }

    readOne(id: string){
        let user = this.users.find((item: User) => item.id === id);
        if(!user){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Record with id = ${id} doesn't exist`
            }, 404);
        }
        return {
            id: user.id,
            login: user.login,
            version: user.version,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }

    createUser(newUser: CreateUserDto){
        let user: User = {
            id: v4(),
            ...newUser,
            version: 1,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        this.users.push(user);
        return {
            id: user.id,
            login: user.login,
            version: user.version,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }

    updateUserPassword(id: string, userInfo: UpdatePasswordDto){
        let user = this.users.find((item: User) => item.id === id);
        if(!user){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Record with id = ${id} doesn't exist`
            }, 404);
        }
        if(userInfo.oldPassword != user.password){
            throw new HttpException({
                statusCode: 403,
                error: "Bad request",
                message: `Old password is incorrect`
            }, 403);
        }
        user.password = userInfo.newPassword;
        user.updatedAt = Date.now();
        user.version++;
        return {
            id: user.id,
            login: user.login,
            version: user.version,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    deleteUser(id: string){
        let foundIndex;
        let user = this.users.find((item: User,index: number) => {
            foundIndex = index;
            return item.id === id ? true : false;
        });
        if(!user){
            throw new HttpException({
                statusCode: 404,
                error: "Bad request",
                message: `Record with id = ${id} doesn't exist`
            }, 404);
        }
        this.users.splice(foundIndex,1);
    }
}