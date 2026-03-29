import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genericCrud } from 'src/common/db/generic-crud.service';

@Injectable()
export class CvService extends genericCrud<Cv> {
  constructor(@InjectRepository(Cv) private cvRepository: Repository<Cv>) {
    super(cvRepository);
  }

  findOne(id: number):  Promise<Cv | null> {
        return  this.cvRepository.findOne({ where: { id }, withDeleted: true });
  }  
  
}