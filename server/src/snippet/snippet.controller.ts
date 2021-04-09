import {
  Controller,
  Body,
  Patch,
  UseGuards,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
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
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async update(
    @User() userId: number,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    const hasBeenUpdated = await this._snippetService.updateSnippet(
      userId,
      updateSnippetDto,
    );

    if (!hasBeenUpdated) {
      throw new BadRequestException();
    }

    return;
  }

  @Patch('/bulk')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async updateInBulk(
    @User() userId: number,
    @Body() updateSnippetsBulkDto: UpdateSnippetDto[],
  ) {
    const hasBeenUpdated = await this._snippetService.updateSnippetsInBulk(
      userId,
      updateSnippetsBulkDto,
    );

    if (!hasBeenUpdated) {
      throw new BadRequestException();
    }

    return;
  }
}
