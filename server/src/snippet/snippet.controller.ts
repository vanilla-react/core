import { Controller, Body, UseGuards, Patch } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorators/user.decorator';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@ApiTags('snippet')
@Controller('snippet')
@ApiBearerAuth()
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(
    @User() userId: number,
    @Body() updateSnippetDto: UpdateSnippetDto,
  ) {
    return this.snippetService.updateSnippet(userId, updateSnippetDto);
  }
}
