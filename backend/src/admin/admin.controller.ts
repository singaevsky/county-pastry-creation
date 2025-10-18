import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @Roles('admin')
  getUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('orders')
  @Roles('admin')
  getOrders() {
    return this.adminService.getAllOrders();
  }

  @Get('products')
  @Roles('admin')
  getProducts() {
    return this.adminService.getAllProducts();
  }
}
