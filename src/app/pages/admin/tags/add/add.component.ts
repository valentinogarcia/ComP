import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  currentTag:any={"nombre":"","finales":[],"subdivisiones":[]};
  /*
      this.currentTag.nombre=""
    this.currentTag.finales=[]
    this.currentTag.subdivisiones=[{"nombre":"pepe","finales":[],"subdivisiones":[]}]
  */
  isAdmin:boolean|null=null
  subdivision:string="";
  nombre:string="";
  subdivisiones:string[]=[];
  final:string="";
  finales:string[]=[];
  constructor(
    private api:ApiService,
    private usr:UserService
  ){}
  AddSubdivision(){
    console.log(this.subdivision);
    this.currentTag.subdivisiones.push({"nombre":this.subdivision,"subdivisiones":[],"finales":[]})
  }
  AddFinal(){
    console.log(this.final);
    this.currentTag.finales.push({"nombre":this.final,"img":"/","descripcion":"ihateprusy"});    
  }
  ngOnInit(){
    this.api.getAdmins().subscribe(  x=>{ x.forEach( (x:any)=>{
      if(x.mail==this.usr.getCurrentUser()?.email){this.isAdmin= true;} 
     } )}).add(()=>{if(this.isAdmin){console.log("SOS ADMIN DOUUUU");
     }else{ this.isAdmin=false; } 
   })
  }
  Submit(){
    this.currentTag.nombre=this.nombre;
    console.log(this.currentTag);
    this.api.postTag(this.currentTag);
    
  }
  
}
