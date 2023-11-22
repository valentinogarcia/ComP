import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  isAdmin:boolean|null=null;
  datos:any[]=[]
  constructor(
    private api:ApiService,
    private router: Router,
    private usr:UserService
  ){}
  ngOnInit(){
    this.api.getAdmins().subscribe(  x=>{ x.forEach( (x:any)=>{
      
      if(x.mail==this.usr.getCurrentUser()?.email){this.isAdmin= true;} 
     } )}).add(()=>{if(this.isAdmin){console.log("SOS ADMIN DOUUUU");
     }else{ this.isAdmin=false; } 
   })
    this.api.getTags().subscribe(
      (x)=>{
        x.forEach((element:any) => {
          
          console.log(element);
          this.datos.push(element)
        });
        
      }
    );
    
  }
  async OnClick(e:any){
    console.log(e.nombre);
    this.router.navigate([this.router.url+'/&'+e.nombre])
  }
}
