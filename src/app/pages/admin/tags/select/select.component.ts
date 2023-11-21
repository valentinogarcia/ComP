import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  datos:any[]=[]
  constructor(
    private api:ApiService,
    private router: Router
  ){}
  ngOnInit(){
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
