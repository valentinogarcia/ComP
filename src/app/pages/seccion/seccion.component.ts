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
  tagsFinales:any[]=[];
  showTags:any[]=[]
  writeTag:string=""
  searchingTags:string[]=[]

  constructor(
    private router: Router,private api:ApiService
  ) { 
    console.log(api.getTags().subscribe((dat: any[])=>{ 
    dat.forEach((element: any) => {
      this.data.push(element);

    })
    
    this.data.forEach(async(element: any) => {
      element.subsecciones.forEach(async (x:any) => {
        x.t=[element.nombre];
        await this.GetFinales(x)
      });
    }); console.log(this.tagsFinales[0]);this.showTags=this.tagsFinales
    ;
  }) );
   }


   async GetFinales(x:any) {
    if(!x.finales && !x.subsecciones){
      this.tagsFinales.push(x );
    }
    else{
      if(x.finales){
        x.finales.forEach(async(y: any)=> {
          y.t=[]
          x.t.forEach((element:any) => {
            y.t.push(element)
          });y.t.push(x.nombre)
          await this.GetFinales(y);
        });
      }
      if (x.subsecciones){
        x.subsecciones.forEach(async(y: any)=> {
          y.t=[]
          x.t.forEach((element:any) => {
            y.t.push(element)
          });y.t.push(x.nombre)
          await this.GetFinales(y);
        });
      }
    }
   }
  
   comparadorButton(element:any){
    let route:string='/comparador/'
      element.t.forEach((x:any) => {
        route+='&'+x;
      });
      route+='&'+element.nombre;
    this.router.navigate([route]);
  }
  addTag(e:KeyboardEvent){
    if(e.key!="Enter"){return}
    if(!this.writeTag){ return    }
    if (this.searchingTags.includes(this.writeTag)){ return }
    this.searchingTags.push(this.writeTag);
    this.writeTag="";
    console.log(this.searchingTags);
    this.onTagUpdate()
    
  }
  onTagUpdate(){
    this.showTags=[]
    this.tagsFinales.forEach( x=>{
      let iterations=0
      x.t.forEach((s:string) => {
        if(this.searchingTags.find( st=>st.toLowerCase()==s.toLocaleLowerCase() )){iterations+=1}        
      });
      if(this.searchingTags.find( st=>st.toLowerCase()==x.nombre.toLocaleLowerCase() )){iterations+=1}
      if(iterations==this.searchingTags.length){ this.showTags.push(x) }
      
    } )
  }
  deleteTag(x:string){
    this.searchingTags.splice(this.searchingTags.findIndex((b)=>b==x))
    this.onTagUpdate()
  }

}
