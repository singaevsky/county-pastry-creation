import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from './user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return this.mapToResponseDto(user);
  }

  @Get()
  @Roles('admin')
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => this.mapToResponseDto(user));
  }

  @Get('bakers')
  @Roles('admin', 'manager')
  async findBakers(): Promise<UserResponseDto[]> {
    const bakers = await this.usersService.findBakers();
    return bakers.map(baker => this.mapToResponseDto(baker));
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id);
    return this.mapToResponseDto(user);
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return this.mapToResponseDto(user);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Put(':id/workload')
  @Roles('admin', 'manager')
  async updateWorkload(
    @Param('id') id: string,
    @Body('workload') workload: number
  ): Promise<UserResponseDto> {
    const user = await this.usersService.updateWorkload(id, workload);
    return this.mapToResponseDto(user);
  }

  @Put(':id/verify-email')
  @Roles('admin')
  async verifyEmail(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.verifyEmail(id);
    return this.mapToResponseDto(user);
  }

  @Put(':id/address')
  @Roles('admin')
  async updateAddress(
    @Param('id') id: string,
    @Body() address: { street: string; city: string; state: string; zipCode: string }
  ): Promise<UserResponseDto> {
    const user = await this.usersService.updateAddress(id, address);
    return this.mapToResponseDto(user);
  }

  private mapToResponseDto(user: User): UserResponseDto {
    const { password, ...userResponse } = user;
    return userResponse as UserResponseDto;
  }
}
