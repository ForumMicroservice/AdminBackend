import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../providers/user.service';
import { User } from 'src/entities/user.entity';
import { dataSource } from 'src/dbconf/db';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Controller('/api/admin/user')
export class UserController {
  @InjectRepository(User)
  private userRepository: Repository<User>;
  constructor(private readonly appService: UserService) {}

  /**
   * Запрашивает текущего пользователя по его Guuid
   * @returns 
   */
  @Get('/getUser/:id')
  async getUser(@Param('id') id: string): Promise<any> {
    return await this.appService.getUserById(id);
  }

  /**
   * Удаляет текущего пользователя по его Guuid
   * @returns
   */
  @Post('/deleteUser/:id')
  async deleteUser(@Param('id') id: string) : Promise<void>{
    return await this.appService.deleteUserById(id);
  }

  /**
   * Возвращает всех пользователей 
   */
  @Post('getAllUser')
   async getAllUser() : Promise<User[]>{
    return await this.appService.getAllUsers();
 }
}

