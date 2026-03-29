import { Cv } from "src/cv/entities/cv.entity";
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({unique: true})
    username: string;
    @Column()
    password: string;   
    @Column({unique: true})
    email: string;
    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: string;

    @OneToMany(type => Cv, cv => cv.user)
    cvs: Cv[];
}
