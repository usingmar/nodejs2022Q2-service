import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdatePasswordDto } from "./dto/updatePassword.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{

    constructor(private readonly userService: UserService){}
    
    @Get()
    getAll(){
        return this.userService.readAll();
    }

    @Get(':id')
    getOne(@Param('id', new ParseUUIDPipe({
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `User id is invalid (not uuid version 4)`
                }, 400)
            }
            })) id){
        return this.userService.readOne(id);
    }

    @Post()
    createUser(@Body() newUser: CreateUserDto){
        return this.userService.createUser(newUser);
    }

    @Put(':id')
    updateUserPassword(@Param('id', new ParseUUIDPipe({
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `User id is invalid (not uuid version 4)`
                }, 400)
            }
            })) id, @Body() userInfo: UpdatePasswordDto){
        return this.userService.updateUserPassword(id, userInfo); 
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id', new ParseUUIDPipe({
            exceptionFactory() {
                throw new HttpException({
                    statusCode: 400,
                    error: "Bad request",
                    message: `User id is invalid (not uuid version 4)`
                }, 400)
            }
            })) id): void{
        this.userService.deleteUser(id);
    }

}