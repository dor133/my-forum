import { IsNotEmpty, MaxLength } from 'class-validator'

export class CreateCommentDto {
    @IsNotEmpty()
    @MaxLength(200, { message: 'Comment is too long' })
    text: string
}
