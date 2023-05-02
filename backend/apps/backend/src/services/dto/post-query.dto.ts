import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, Min } from 'class-validator'
import { Transform } from 'class-transformer'

export class PostQueryDto {
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    page: number

    @IsOptional()
    @IsNotEmpty()
    search: string
}
