import { Controller, Body, UseGuards, Patch } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorators/user.decorator';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

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
