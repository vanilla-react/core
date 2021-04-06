import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorators/user.decorator';

@ApiTags('snippet')
@Controller('snippet')
@ApiBearerAuth()
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() userId: number, @Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetService.create(userId, createSnippetDto);
  }

  @Get()
  findAll() {
    return this.snippetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snippetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this.snippetService.update(+id, updateSnippetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snippetService.remove(+id);
  }
}
