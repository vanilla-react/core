import { Controller, Body, Patch, UseGuards } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('snippet')
@Controller('snippet')
@ApiBearerAuth()
export class SnippetController {
  constructor(private readonly _snippetService: SnippetService) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(
    @User() userId: number,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    return this._snippetService.updateSnippet(userId, updateSnippetDto);
  }

  @Patch('/bulk')
  @UseGuards(JwtAuthGuard)
  async updateInBulk(
    @User() userId: number,
    @Body() updateSnippetsBulkDto: UpdateSnippetDto[],
  ) {
    return this._snippetService.updateSnippetsInBulk(
      userId,
      updateSnippetsBulkDto,
    );
  }
}
