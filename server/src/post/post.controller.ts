import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@User() userId: number, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(userId, createPostDto).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':name/:slug')
  async findOne(@Param('name') name: string, @Param('slug') slug: string) {
    return this.postService.getOneByAuthorNameAndSlug(name, slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
