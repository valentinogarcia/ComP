import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent {
  data:any[]=[];
  constructor(
    private router: Router,private api:ApiService
  ) { console.log(api.getTags().subscribe(dat=>{ console.log( dat[1].nombre );
    this.data.push(dat);
  }) );
   }
  
  comparadorButton(){
    this.router.navigate(['/comparador']);
  }
  

}
