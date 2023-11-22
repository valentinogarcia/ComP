import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})
  


export class ComparadorComponent implements OnInit {

  leftObject:any ;
  rightObject:any;
  allowedObjects:any[]=[];
  tags:any[]=[];
  rightText:string="";
  leftText:string="";
  constructor(private route: ActivatedRoute,private router: Router,private api:ApiService) { 
  
  } 
  async ValidateElement(){
  }
  async FindObject(name:any ,right:boolean){
    console.log("esta pasando");
    
    this.allowedObjects.forEach(element => {
      if(element.nombre==name){
        if(right){ this.rightObject=element}else{this.leftObject=element}
      }
    });
    
  }
  ReplaceRight(e:KeyboardEvent){
    if(e.key==="Enter"){ 
      console.log(this.rightText);
      this.FindObject(this.rightText,true);
     }
  }
  ReplaceLeft(e:KeyboardEvent){
    if(e.key==="Enter"){ 
      console.log(this.leftText);
      this.FindObject(this.leftText,false);
     }
  }
  async ngOnInit(){
    
    let tag:any;
     this.route.params.subscribe(params => {
      tag = params['tags'];
      this.tags=tag.split('&')
      this.tags.forEach( (x)=>{
        if(x==""){
          this.tags.splice(this.tags.indexOf(x),1);
        }
      } )
      console.log(this.tags);
      
      

    });
    await this.api.getElementos().subscribe(async e=>{
      console.log(e);
      
     await  e.forEach(async(element:any) => {
        
      let correctTags:number=0
      await element.tags.forEach(async(t:string) => {
        if(this.tags.includes(t)){
          correctTags+=1
        }else{ this.tags.forEach( x=>{ if(t.toLowerCase()==x.toLowerCase()){correctTags+=1};} ) }
      });
      console.log(correctTags);
      if(correctTags==this.tags.length){
        
          this.allowedObjects.push(element)
          console.log(this.allowedObjects);
          if(!this.leftObject){this.leftObject=element;this.leftObject.map=Object.keys(this.leftObject.stats)}else{if(!this.rightObject){this.rightObject=element}else{
            return
          }} 
        
  
      }
      
      
    });
    } )
  }
}



/* 

*/