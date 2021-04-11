import { PostStatus } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

export class PostQueryDto {
  @ApiProperty({ required: false, example: 0, default: 0, type: Number })
  @Type(() => Number)
  readonly skip?: number;
  @ApiProperty({ required: false, example: 10, default: 10, type: Number })
  readonly take?: number;
  @ApiProperty({
    type: String,
    required: false,
  })
  readonly status?: string;
}
