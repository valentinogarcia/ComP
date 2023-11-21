import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  elemento:any;
  constructor(
    private api:ApiService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  async ngOnInit(){
    let _id:string="";
    await this.route.params.subscribe((x:any) => _id=x.id )
    console.log(_id);
    await this.api.getElemento(_id).subscribe( x=>this.elemento=x ).add( ()=>{
      this.elemento.statsMap=Object.keys(this.elemento.stats)
    } );
    
    

      
  }
  }
