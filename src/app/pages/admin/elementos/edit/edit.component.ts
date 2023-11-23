import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

enum adding{
  Tag="tag",
  Stat="Stat",
  None=""
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  isAdmin:boolean|null=null
  elemento:any;
  newTag:string="";
  newElementoName:string="";
  alertState:adding = adding.None;
  addName:string="";
  constructor(
    private api:ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private usr:UserService
  ){}

  async ngOnInit(){
    this.api.getAdmins().subscribe(  x=>{ x.forEach( (x:any)=>{
      
      if(x.mail==this.usr.getCurrentUser()?.email){this.isAdmin= true;} 
     } )}).add(()=>{if(this.isAdmin){console.log("SOS ADMIN DOUUUU");
     }else{ this.isAdmin=false; } 
   })
    let _id:string="";
    await this.route.params.subscribe((x:any) => _id=x.id )
    console.log(_id);
    await this.api.getElemento(_id).subscribe( x=>this.elemento=x ).add( ()=>{
      console.log(this.elemento) ;
      
      this.elemento.statsMap=Object.keys(this.elemento.stats)
    } );
    
  }
  AddTag(){
    if(this.newTag){
      if ( this.elemento.tags.find( (x:string)=>x===this.newTag ) ) {
        alert("Ya existe este tag");
        return;
      }
      this.elemento.tags.push(this.newTag)
    }
    alert("El tag debe tener nombre")
  }
  AddStat(){
    console.log(this.elemento);
    
    if( this.elemento.stats[this.newElementoName] ){ alert("El elemento ya tiene este stat");return}
    this.elemento.stats[this.newElementoName]="";
    this.elemento.map=Object.keys(this.elemento.stats)
    console.log(this.elemento.map);
  }
  async Submit(){
    
    if(!this.elemento.nombre){alert("EL elemento debe tener nombre");return}
    if(!this.elemento.tags||this.elemento.tags.length<=0){ alert("El elemento debe tener almenos 1 tag"); return}
    if(!this.elemento.stats||this.elemento.statsMap.length<=0){alert( "El elemento edebe tener almenos 1 stat" ) ;return}
    console.log(this.elemento);
    const _id = this.elemento._id;
    delete this.elemento._id;
    await this.api.modifyElemento(this.elemento,_id).subscribe( x=>console.log(x))
    this.elemento["_id"]=_id;
  }
  changeAlertState(s:string){
    if(s){ if(s==adding.Stat){ this.alertState=adding.Stat ;return}this.alertState=adding.Tag;return; }
    this.alertState=adding.None;
  }
  addIterable(e:KeyboardEvent|null){
    if(e){ if(e.key != "Enter"){return} console.log("bruh");}
    if(adding.Stat==this.alertState){
      if(this.elemento.stats[this.addName]){alert("Ya existe este stat");return}
      this.elemento.stats[this.addName]=""
      this.elemento.statsMap= Object.keys(this.elemento.stats)
      this.alertState=adding.None
      return
    }
    if( this.elemento.tags.find((x:string)=>x==this.addName) ){
      alert("Ya existe este tag");return
    }
    this.elemento.tags.push(this.addName)
    this.alertState=adding.None
  } 
  deleteStat(s:string){
    delete this.elemento.stats[s]
    this.elemento.statsMap=Object.keys(this.elemento.stats)
  }
  deleteTag(s:string){
    this.elemento.tags.splice( this.elemento.tags.findIndex( (x:string)=>x==s ) )
  }
  back(){
    this.router.navigate(['admin/elementos'])    
  }
}
