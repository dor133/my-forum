import { IsArray, IsMongoId } from 'class-validator'

export class DeletePostDto {
    @IsArray()
    @IsMongoId({ each: true })
    ids: string[]
}
