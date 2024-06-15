import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSource } from './dbconf/db';
import typeorm from './dbconf/db';
import { DataSource } from 'typeorm';
import { UserService } from './providers/user.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeOrmConfig = configService.get('typeorm');
        if (!typeOrmConfig) {
          throw new Error('TypeOrm configuration not found');
        }
        return typeOrmConfig;
      },
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],
})

export class AppModule {
  constructor(dataSource:DataSource){}
 
  async runMigration(){
    try{
      await dataSource.initialize();
      
    }catch(error){
      console.log("Error initializing database, because exception is happen:\n Context:\n", error); 
    }
  }

}
