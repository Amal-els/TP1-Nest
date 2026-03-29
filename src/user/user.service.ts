import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

 
}
