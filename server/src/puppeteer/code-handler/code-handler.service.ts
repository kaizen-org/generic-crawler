import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeHandlerService {

    executeHandler():void{
        console.log("Execute Handler");
    }
}
