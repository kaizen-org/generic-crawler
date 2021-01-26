import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Crawler {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({unique:true})
    url: string;

    @Column()
    mapperUrl: string;

    @Column()
    navigationUrl: string;
}