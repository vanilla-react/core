import {
  Controller,
  Body,
  Patch,
  HttpCode,
  BadRequestException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateBulkSnippetsDto } from './dto/update-bulk-snippets';
import { IsOwner } from './decorators/is-resource-owner.decorator';

@ApiTags('snippets')
@Controller('snippet')
@ApiBearerAuth()
export class SnippetController {
  constructor(private readonly _snippetService: SnippetService) {}

  @Patch('/bulk')
  @HttpCode(204)
  @IsOwner()
  @ApiBody({ type: [UpdateBulkSnippetsDto] })
  async updateInBulk(@Body() updateSnippetsBulkDto: UpdateBulkSnippetsDto[]) {
    const hasBeenUpdated = await this._snippetService.updateSnippetsInBulk(
      updateSnippetsBulkDto,
    );

    if (!hasBeenUpdated) {
      throw new BadRequestException();
    }

    return;
  }

  @Patch(':id')
  @HttpCode(204)
  @IsOwner()
  async update(
    @Param('id', new ParseIntPipe()) postId: number,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    const hasBeenUpdated = await this._snippetService.updateSnippet(
      postId,
      updateSnippetDto,
    );

    if (!hasBeenUpdated) {
      throw new BadRequestException();
    }

    return;
  }
}
