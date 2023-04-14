import { IsMongoId, IsOptional } from 'class-validator'

export class CommentParamDto {
    @IsOptional()
    @IsMongoId()
    id: string

    @IsOptional()
    @IsMongoId()
    postId: string
}
