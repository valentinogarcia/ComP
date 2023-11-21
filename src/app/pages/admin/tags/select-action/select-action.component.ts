import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.css']
})
export class SelectActionComponent {
  tags:any[]=[]
  constructor(
    private api:ApiService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  async ngOnInit(){
    
    let allTags:any[] = []
    let paramTags:any[]=[]
    await this.api.getTags().subscribe(
      async x=>{
        x.forEach(async (element:any) => {
          allTags.push(element)
        });
      }
    ).add(
      ()=>{
        this.route.params.subscribe( 
          (params:any)=>{
            params.tagID.split('&').forEach((x:string) => {
              if(x!=""){

                paramTags.push(x)              
              }
            });
          }
         )
            
            allTags.forEach(at => {
              
              let b = this.RecursiveTag(at,paramTags,1)
              if(b){ this.tags.push(at) }
              /*
              if(b){b.forEach((element:any) => {
                console.log(element);
                
                 this.tags.push(at)
              }); }else{
                console.log(this.tags);
                
              }
              */
            });
            
        
         
      }
    )
  }
  RecursiveTag(at:any,params:any[],i:number){
    //console.log(at);
    
    
    if(i==params.length){ //let x =  params.find( (tag)=> {console.log(tag + at.nombre);return tag==at.nombre}); if (x){return [at]}return undefined 
    if(params[i-1]==at.nombre){//console.log("true "+at);
    return at}
    }
    else{
      
        
      let y = at.subsecciones.forEach((element:any) => {
        
        //console.log(element);
        
        let x = this.RecursiveTag(element,params,i+1)
        //console.log(x);
        return x
        
        
      });
      return y;
    }
  }
  async SendTag(e:string){
    console.log(this.route.url);
    
    this.router.navigate([this.router.url+'&'+e])
  }
}
