import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminServise: AdminService) {}
  @Get()
  getAdmin() {
    return this.adminServise.getDashboardData();
  }

  @Get('/:id')
  getAdminId(@Param('id') id: number): string {
    return this.adminServise.getAdminId(id);
  }
}
