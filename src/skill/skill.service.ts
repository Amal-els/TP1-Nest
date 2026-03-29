import { Injectable } from '@nestjs/common';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genericCrud } from 'src/common/db/generic-crud.service';

@Injectable()
export class SkillService extends genericCrud<Skill> {
  constructor(@InjectRepository(Skill) private skillRepository: Repository<Skill>) {
    super(skillRepository);
  }
  
  findOne(id: number):  Promise<Skill | null> {
    return  this.skillRepository.findOne({ where: { id }, withDeleted: true });
  } 

}
