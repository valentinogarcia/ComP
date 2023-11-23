import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  isAdmin:boolean|null=null
  constructor(
    private router: Router,
    private usr:UserService,
    private api:ApiService
  ) {}
  
  ngOnInit(){
    this.api.getAdmins().subscribe(  x=>{ x.forEach( (x:any)=>{
      
      if(x.mail==this.usr.getCurrentUser()?.email){this.isAdmin= true;} 
     } )}).add(()=>{if(this.isAdmin){console.log("SOS ADMIN DOUUUU");
     }else{ this.isAdmin=false; } 
   })
  }
  SendToAdd(e:MouseEvent){
    console.log(this.router.url+'/add');
    
    //let r:string = this.router.url;    
     this.router.navigate([this.router.url+'/add'])    
  }
  SendToModify(e:MouseEvent){
    console.log(this.router.url+'/select');
    
    //let r:string = this.router.url;    
     this.router.navigate([this.router.url+'/select'])    
  }
  back(){
    this.router.navigate(["/admin"])
  }
}
