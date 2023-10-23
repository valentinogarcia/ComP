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
  tagsFinales:any[]=[]

  constructor(
    private router: Router,private api:ApiService
  ) { 
    console.log(api.getTags().subscribe((dat: any[])=>{ 
    dat.forEach((element: any) => {
      this.data.push(element);

    })
    
    this.data.forEach(async(element: any) => {
      element.subsecciones.forEach(async (x:any) => {
        await this.GetFinales(x)
      });
    }); console.log(this.tagsFinales[0]);
    ;
  }) );
   }


   async GetFinales(x:any) {
    if(!x.finales && !x.subsecciones){
      console.log(x.img)
      this.tagsFinales.push(x );
    }
    else{
      if(x.finales){
        x.finales.forEach(async(y: any)=> {
          await this.GetFinales(y);
        });
      }
      if (x.subsecciones){
        x.subsecciones.forEach(async(y: any)=> {
          await this.GetFinales(y.nombre);
        });
      }
    }
   }
  
  comparadorButton(){
    this.router.navigate(['/comparador']);
  }
  

}
