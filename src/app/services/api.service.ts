import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlTags       = 'http://cors.localhost:3030/tags';
  private urlElementos  = 'http://cors.localhost:3030/elementos';
  private urlImages     = 'http://cors.localhost:3030/images';
  private urlAdmins     = 'http://cors.localhost:3030/admins'

  constructor(private http: HttpClient) { }
  public getTags():Observable<any>{
    return this.http.get<any>(this.urlTags);
  }
  public getElementos():Observable<any>{
    console.log(this.urlElementos);
    
    return this.http.get<any>(this.urlElementos);
  }
  public getElemento(_id:string):Observable<any>{
    console.log(this.urlElementos+'/'+_id);
    
    return this.http.get<any>(this.urlElementos+'/'+_id);
  }
  
  public postElemento( data:any[] ){
    return this.http.post(this.urlElementos,data )
  }
  public modifyElemento(data:any[],_id:string){
    console.log(this.urlElementos+'/'+_id);
    
    return this.http.put(this.urlElementos+'/'+_id,data )
  }
  public deleteElemento( _id:string ){
    console.log(this.urlElementos+'/'+_id);
    
    return this.http.delete(this.urlElementos+'/'+_id )
  }
  public postTag( data:any[] ){
    return this.http.post(this.urlTags,data ).subscribe( (x:any)=>{console.log(x);
    } )
  }
  public modifyTag( data:any[],_id:string ){
    return this.http.put(this.urlTags+'/'+_id,data ).subscribe( (x:any)=>{console.log(x);
    } )
  }
  public uploadImage(data:FormData){
    return this.http.post( this.urlImages,data );    
  }
  public getAdmins():Observable<any>{
    return this.http.get<any>(this.urlAdmins);
  }
}