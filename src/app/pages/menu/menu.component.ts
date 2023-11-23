import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isAdmin:boolean|null=null
  constructor(
    private router: Router,
    private usr:UserService,
    private api:ApiService
  ) {}
  
  seccionButton(){
    this.router.navigate(['/seccion']);
  }
  adminPanel(){
    this.router.navigate(['/admin'])
  }
  ngOnInit(){
    this.usr.userEmail$.subscribe((email) => {
      console.log("email en navbar", email);
      
      this.api.getAdmins().subscribe(  x=>{ x.forEach( (x:any)=>{
        
        if(x.mail==email){this.isAdmin= true;} 
      } )}).add(()=>{if(this.isAdmin){console.log("SOS ADMIN DOUUUU");
    }else{ this.isAdmin=false; } 
  })
});
  }
}
