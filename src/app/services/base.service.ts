import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpResponse } from "@angular/common/http";
import { throwError as observableThrowError } from 'rxjs';

@Injectable()
export class ServiceBase{
    protected URL_API: string = environment.URL_API;

    protected serviceError(error: HttpResponse<Response> | any){
        let errorMessage = ''
        if(error instanceof Response){
            const body = error.json() || '';
            const err = body || JSON.stringify(body);
            errorMessage = `${error.status} - ${error.statusText || ''} ${err}`

        }else{
            errorMessage = error.message ? error.message : error.message.toString();
        }
        return observableThrowError(errorMessage);
    }
}