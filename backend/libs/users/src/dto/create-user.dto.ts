import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: 'Username is too long' })
    username: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(8, { message: 'Password is too short' })
    password: string
}
