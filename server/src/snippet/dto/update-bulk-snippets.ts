import { ApiProperty } from '@nestjs/swagger';
import { UpdateSnippetDto } from './update-snippet.dto';

export class UpdateBulkSnippetsDto extends UpdateSnippetDto {
  @ApiProperty()
  id: number;
}
