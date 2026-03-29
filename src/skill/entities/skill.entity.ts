import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';

@Entity('skill')
export class Skill {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    designation: string;

    @ManyToMany(type => Cv, cv => cv.skills)
    cvs: Cv[];
}
