import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cv')
export class Cv {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstName: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column()
    path: string

    @ManyToMany(type => Skill, {eager: true})
    @JoinTable({name: 'cv_skills',
    joinColumn: { name: 'cv', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill', referencedColumnName: 'id' }
    })

    skills: Skill[];

    @ManyToOne(() => User, user => user.cvs, {
        eager: true,
        cascade: true
    })
    user: User;
}
