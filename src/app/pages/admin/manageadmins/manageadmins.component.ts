import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manageadmins',
  templateUrl: './manageadmins.component.html',
  styleUrls: ['./manageadmins.component.css']
})
export class ManageadminsComponent {
  adding:boolean=false;
  isAdmin:boolean|null=null
  isSuperAdmin:boolean=false;
  admins:any[]=[]
  currentAdmin:any;
  constructor(
    private api:ApiService,
    private usr:UserService,
    private router:Router
  ){}
  ngOnInit(){
    this.api.getAdmins().subscribe(  x=>{ x.forEach( (x:any)=>{
      this.admins.push(x);
      if(x.mail==this.usr.getCurrentUser()?.email){this.isAdmin= true;this.isSuperAdmin=x.superAdmin} 
     } )}).add(()=>{if(this.isAdmin){console.log("SOS ADMIN DOUUUU");
     }else{ this.isAdmin=false; } 
   })
  }
  back(){
    this.router.navigate(['/admin'])
  }
  changePermisions(){
    this.api.modifyAdmin(this.currentAdmin)
  }
  addAdmin(){
    console.log(this.currentAdmin);
    
    this.api.postAdmin(this.currentAdmin).subscribe( x=>{;
    } ).add(()=>window.location.reload())
  }
  deleteAdmin(x:string){
    this.api.deleteAdmin(x).subscribe(x=>window.location.reload()
    ).add( ()=>window.location.reload() )
  }
}
