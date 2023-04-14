import { IsNotEmpty, MaxLength } from 'class-validator'

export class CreatePostDto {
    @IsNotEmpty()
    @MaxLength(30, { message: 'Title is too long' })
    title: string

    @IsNotEmpty()
    text: string
}
