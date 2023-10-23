import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})
  

export class ComparadorComponent implements OnInit {

  leftObject:any ;
  rightObject:any;
  allowedObjects:any[]=[];
  constructor(private route: ActivatedRoute,private router: Router,private api:ApiService) { 
  }
  
  async ngOnInit(){
    let tag:any;
     this.route.params.subscribe(params => {
      tag = params['tag'];
      

    });
    await this.api.getElementos().subscribe(async e=>{
      e.forEach(async(element:any) => {
        

      await element.tags.split(' ').forEach(async(t:string) => {
        if(t==tag){
        this.allowedObjects.push(element)
        if(!this.leftObject){this.leftObject=element}else{if(!this.rightObject){this.rightObject=element}else{
          return
        }} 
      }
       console.log(this.leftObject);
       console.log(this.rightObject);
       
       
      });

      
      
    });
    } )
  }
}
