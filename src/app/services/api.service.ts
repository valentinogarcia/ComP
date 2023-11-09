import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlTags  = 'http://cors.localhost:3030/tags';
  private urlElementos  = 'http://cors.localhost:3030/elementos';

  constructor(private http: HttpClient) { }
  public getTags():Observable<any>{
    return this.http.get<any>(this.urlTags);
  }
  public getElementos():Observable<any>{
    return this.http.get<any>(this.urlElementos);
  }
  public postElemento( data:any[] ){
    return this.http.post(this.urlElementos,data )
  }
  public postTag( data:any[] ){
    return this.http.post(this.urlTags,data )
  }
}