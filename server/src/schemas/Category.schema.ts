import { ObjectID } from "mongodb";
import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity()
export class Category {

    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    name: string;

}