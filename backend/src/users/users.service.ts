import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findAll(filters?: FindOptionsWhere<User>): Promise<User[]> {
    return this.userRepo.find({ where: filters });
  }

  async findBakers(): Promise<User[]> {
    return this.userRepo.find({
      where: { role: 'baker' },
      order: { workload: 'ASC' }
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const { password, ...userData } = createUserDto;
    const hashedPassword = await this.hashPassword(password);

    const user = this.userRepo.create({
      ...userData,
      password: hashedPassword,
      isEmailVerified: false
    });

    return this.userRepo.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
  }

  async updateWorkload(id: string, workload: number): Promise<User> {
    const user = await this.findOne(id);
    if (user.role !== 'baker') {
      throw new BadRequestException('Workload can only be updated for bakers');
    }
    if (workload < 0 || workload > 100) {
      throw new BadRequestException('Workload must be between 0 and 100');
    }

    user.workload = workload;
    return this.userRepo.save(user);
  }

  async verifyEmail(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isEmailVerified = true;
    return this.userRepo.save(user);
  }

  async updateAddress(
    id: string,
    address: { street: string; city: string; state: string; zipCode: string; }
  ): Promise<User> {
    const user = await this.findOne(id);
    user.address = address;
    return this.userRepo.save(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
