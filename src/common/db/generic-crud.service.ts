import { NotFoundException } from "@nestjs/common";
import { Entity, ObjectLiteral, Repository, UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm/browser";
export class genericCrud<Entity extends ObjectLiteral> {
    constructor(protected repository: Repository<Entity>) {}

    findAll(): Promise<Entity[]> {
        const result = this.repository.find();
        console.log(result);
        return this.repository.find({});
    }
    
    update(id: number, updateDto): Promise<UpdateResult> {
        return this.repository.update(id, updateDto);
    }
    
    remove(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    restore(id: number): Promise<UpdateResult> {
            return this.repository.restore(id);
        }
    
    async create(addDto): Promise<Entity[]> {
        const entity = this.repository.create(addDto);
        const result = await this.repository.save(entity, { reload: true }); // reload ensures all defaults & relations
        console.log(result);
        
        return entity;
    }
    
    async softDelete(id: number): Promise<UpdateResult>{
            const result = await this.repository.softDelete(id);
            if(result.affected == 0) 
                throw new NotFoundException("User with id: " + id + " not found");
            return result;
        }

    
    }