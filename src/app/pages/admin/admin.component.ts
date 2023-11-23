import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isAdmin:boolean|null=null
  constructor(
    private api:ApiService,
    private usr:UserService,
    private router:Router
  ){}
  ngOnInit(){
    this.api.getAdmins().subscribe(  x=>{ x.forEach( (x:any)=>{
      
      if(x.mail==this.usr.getCurrentUser()?.email){this.isAdmin= true;} 
     } )}).add(()=>{if(this.isAdmin){console.log("SOS ADMIN DOUUUU");
     }else{ this.isAdmin=false; } 
   })
  }
  back(){
    this.router.navigate(['/'])
  }
  sendToTags(){
    this.router.navigate([this.router.url+'/tags'])
  }
  sendToElementos(){
    this.router.navigate([this.router.url+'/elementos'])
  }
}
