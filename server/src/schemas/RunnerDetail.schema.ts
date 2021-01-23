import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";


export class RunnerDetail {

    @Column()
    runnerStatus: string;

    @Column()
    selectionId: string;

   
    }