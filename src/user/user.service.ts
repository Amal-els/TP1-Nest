import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genericCrud } from 'src/common/db/generic-crud.service';

@Injectable()
export class UserService extends genericCrud<User> {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    super(userRepository);
  }
    
  findOne(id: number):  Promise<User | null> {
    return  this.userRepository.findOne({ where: { id }, withDeleted: true });
  } 
  findByUsername(username: string){
    return this.userRepository.findOne({ where: {username} })
  }
  findByEmail(email: string){
    return this.userRepository.findOne({ where: {email} })
  }
 
}
