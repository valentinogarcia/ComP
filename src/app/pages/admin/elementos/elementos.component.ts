import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.css']
})
export class ElementosComponent {
  isAdmin:boolean|null=null;
  allElements:any[]=[];
  edit:boolean=false;
  statAlert:boolean=false;
  tagAlert:boolean=false;
  addStats:any;
  addElemento:any;
  addStatName:string="";
  addTagName:string="";
  editingTag:any;
  deleting:boolean=false;

  constructor(
    private api:ApiService,
    private router: Router,
    private usr:UserService
  ){}
  async ngOnInit(){
    console.log(this.usr.getCurrentUser()?.email);
     this.api.getAdmins().subscribe(  x=>{ x.forEach( (x:any)=>{
      
       if(x.mail==this.usr.getCurrentUser()?.email){this.isAdmin= true;} 
      } )}).add(()=>{if(this.isAdmin){console.log("SOS ADMIN DOUUUU");
      }else{ this.isAdmin=false; } 
    })
    this.addStats={}
    this.addElemento={"nombre":"","img":"","tags":[],"stats":{}}
    this.api.getElementos().forEach( x=> x.forEach( (element:any)=> this.allElements.push(element) ) )
    console.log(this.allElements);
    
  }
  AddStat(){
    console.log(this.addElemento);
    
    if( this.addElemento.stats[this.addStatName] ){ alert("El elemento ya tiene este stat");return}
    this.addElemento.stats[this.addStatName]="";
    this.addElemento.map=Object.keys(this.addElemento.stats)
    console.log(this.addElemento.map);
  }
  DeleteStat(stat:string){
    console.log(this.addElemento.stats);
    
    if(this.addElemento.stats[stat]||this.addElemento.stats[stat]==""){

      delete this.addElemento.stats[stat]
      
      this.addElemento.map=Object.keys(this.addElemento.stats)
      console.log(this.addElemento.map);
    }
  }
  AddTag(){
    //console.log(this.addElemento.tags.find((x:string)=>x==this.addTagName));
        if(this.addElemento.tags.find((x:string)=>x==this.addTagName)){
          alert("El elemento ya tiene este tag");return
        }
        this.addElemento.tags.push(this.addTagName)
        console.log(this.addElemento.tags);
        
  }
  DeleteTag(deleteObject:string){
    let index:number = this.addElemento.tags.findIndex((x:string)=>x==deleteObject)
    console.log(this.addElemento.tags);
    
    if(index<0){
      alert("El elemento no tiene este tag");return
    }

      this.addElemento.tags.splice( index,1 )
      
    
  }
  Submit(){
    console.log(this.addElemento.map);
    
    if(this.addElemento.nombre==""){ alert("El elemento debe tener un nombre") ;return;}
    if(this.addElemento.tags.length<=0){ alert("El elemento debe tener al menos 1 tag");return }
    if(!this.addElemento.map||this.addElemento.map.length<=0){alert("El elemento debe tener al menos un stat");return}
    delete this.addElemento.map;
    this.api.postElemento( this.addElemento ).subscribe( x=>console.log(x)
     )
     this.addElemento.map=Object.keys(this.addElemento.stats)
     window.location.reload()
  }
  ConfirmDelete(){
    this.api.deleteElemento(this.editingTag._id)
    console.log(this.editingTag);
    
    if ( confirm("Esta seguro de querer borrar el elemento: "+this.editingTag.nombre) ){
      this.api.deleteElemento(this.editingTag._id).subscribe(x=>console.log(x)).add( ()=>{
        window.location.reload()
      } )
    }
  }
  Edit(){
    window.location.assign(this.router.url+'/edit/'+this.editingTag._id)
  }

}
