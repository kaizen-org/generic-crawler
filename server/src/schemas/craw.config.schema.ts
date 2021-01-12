import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CrawConfigDocument = CrawConfig & Document;

@Schema()
export class CrawConfig {
    
    @Prop({ required: true , unique: true})
    url: string;

    @Prop({ required: true})
    navigation: string;

    @Prop({ required: true})
    conversion: string;
}


export const CrawConfigSchema = SchemaFactory.createForClass(CrawConfig);
