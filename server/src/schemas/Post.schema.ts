import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {Category} from "./Category.schema";

@Entity()
export class Post {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column(type => Category)
    categories: Category[];

}