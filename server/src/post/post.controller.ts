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
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/auth/decorators/user.decorator';

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
  /**
   * @param {number} [skip] - Starts fetching posts starting at this page
   * @param {number} [take=10] - Returns take many posts
   * @return {PrismaPromise<Post>}
   */
  @Get()
  @ApiQuery({
    name: 'skip',
    example: 0,
    required: false,
  })
  @ApiQuery({
    name: 'take',
    example: 10,
    required: false,
  })
  findAll(
    @Query('skip', new ParseIntPipe()) skip: number,
    @Query('take', new ParseIntPipe()) take: number,
  ) {
    return this.postService.getAll(skip, take);
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
