import { IsMongoId } from 'class-validator'

export class PostParamDto {
    @IsMongoId()
    id: string
}
