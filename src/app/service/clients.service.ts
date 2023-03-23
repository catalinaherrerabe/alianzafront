import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../model/client-model';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private API_SERVER = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<ClientModel[]>{
    return this.httpClient.get<ClientModel[]>(this.API_SERVER + '/list').pipe(map(res => res));
  }

  saveClient(request: any): Observable<any[]>{
    return this.httpClient.post<any[]>(this.API_SERVER + '/save', request).pipe(map(res => res));
  }

  getClientSharedKey(sharedKey: String): Observable<ClientModel[]>{
    return this.httpClient.get<ClientModel[]>(this.API_SERVER + '/' + sharedKey).pipe(map(res => res));

  }
  
}
