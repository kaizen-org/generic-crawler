import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import { RunnerDetail } from "./RunnerDetail.schema";

@Entity()
export class MarketHistory {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    timestamp: Date;

    @Column()
    marketStatus: string;

    @Column()
    marketId: string;

    @Column(type => RunnerDetail)
    runnerDetails: RunnerDetail[];

    }