import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Метод для получения всех пользователей
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Метод для получения пользователя по его ID
  async getUserById(id: string): Promise<any> {
    const user = await this.userRepository.findOne({where:{id}})
    if(user) {
      return user;  
    }else{
      return{
        success:false,
        value:"User isn't exist"
      }
    }
  }

  // Метод для удаления пользователя по его ID
  async deleteUserById(id: string): Promise<any> {
    if (await this.getUserById(id))
      {
        await this.userRepository.delete(id);
      }else{
        return {
          success: false,
          value:"User isn't exist"
        }
      }
  }
}
