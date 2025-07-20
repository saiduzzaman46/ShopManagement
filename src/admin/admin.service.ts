import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getDashboardData(): string {
    return 'Dashboard data for admin';
  }

  getAdminId(id: number): string {
    return `Admin ID: ${id}`;
  }
  getAll():string{
    
  }
}
