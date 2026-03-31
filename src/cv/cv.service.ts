import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genericCrud } from 'src/common/db/generic-crud.service';
import { User } from 'src/user/entities/user.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Injectable()
export class CvService extends genericCrud<Cv> {
  constructor(@InjectRepository(Cv) private cvRepository: Repository<Cv>) {
    super(cvRepository);
  }

  async create(cv: CreateCvDto, user?: User | Express.User): Promise<Cv> {
    const newCv = this.cvRepository.create(cv);
    if (user) {
      newCv.user = user as User;
    }
    return this.cvRepository.save(newCv);

  }

  async getAllCvs(user): Promise<Cv[]>{
    if(user.role === UserRoleEnum.ADMIN)
      return await this.cvRepository.find()
    else 
      return await this.cvRepository.find({where: {user: user}})

  }

  async findById(id: number, user):  Promise<Cv> {
        const cv = await this.cvRepository.findOne({ where: { id }, withDeleted: true });
        if(!cv){
          throw new NotFoundException("Le cv d'id ${id} n'existe pas" ); 
        }
        if(user.role === UserRoleEnum.ADMIN || cv.user.id === user.id){
          return cv;
        }
        throw new UnauthorizedException();
  }  
  
}
