import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  currentTag:any={"nombre":"","finales":[],"subsecciones":[]};
  /*
      this.currentTag.nombre=""
    this.currentTag.finales=[]
    this.currentTag.subsecciones=[{"nombre":"pepe","finales":[],"subsecciones":[]}]
  */
 
  isAdmin:boolean|null=null
  subdivision:string="";
  nombre:string="";
  subsecciones:string[]=[];
  final:string="";
  finales:string[]=[];
  constructor(
    private api:ApiService,
    private usr:UserService,
    private router:Router
  ){}
  AddSubdivision(){
    console.log(this.subdivision);
    this.currentTag.subsecciones.push({"nombre":this.subdivision,"subsecciones":[],"finales":[]})
  }
  DeleteSubdivision(del:string){
    this.currentTag.subsecciones.splice( this.currentTag.subsecciones.findIndex( (x:any)=>x.nombre==del ),1 )
  }
  DeleteFinal(del:string){
    this.currentTag.finales.splice( this.currentTag.finales.findIndex( (x:any)=>x.nombre==del ),1 )
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
    console.log(this.api.postTag(this.currentTag));
    this.router.navigate(['/admin/tags/select/'+this.currentTag.nombre])
    
  }
  back(){
    this.router.navigate(["admin/tags"])
  }
}
