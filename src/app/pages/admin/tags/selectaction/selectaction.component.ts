import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-select-action',
  templateUrl: './selectaction.component.html',
  styleUrls: ['./selectaction.component.css']
})
export class SelectActionComponent {
  isAdmin:boolean|null=null
  tags:any[]=[]
  current:any;
  activated:boolean=false;
  add:boolean=false;
  addto:any;
  addtoType:string="";
  nombre:string="";
  tagname:string="";
  tag:any;
  img:string="";
  modifyF:boolean=false;
  uploadIMG:any;
  imgurl:any
  constructor(
    private api:ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private usr:UserService
  ){}
  async ngOnInit(){
    this.api.getAdmins().subscribe(  x=>{ x.forEach( (x:any)=>{
      
      if(x.mail==this.usr.getCurrentUser()?.email){this.isAdmin= true;} 
     } )}).add(()=>{if(this.isAdmin){console.log("SOS ADMIN DOUUUU");
     }else{ this.isAdmin=false; } 
   })
    let allTags:any[] = []
    let paramTags:any[]=[]
    await this.api.getTags().subscribe(
      async x=>{
        x.forEach(async (element:any) => {

          
          allTags.push(element)
        });
      }
    ).add(
      async()=>{
        this.route.params.subscribe( 
          (params:any)=>{
            params.tagID.split('&').forEach((x:string) => {
              if(x!=""){

                paramTags.push(x)              
              }
            });
          }
         )
            console.log(allTags);
            allTags.forEach( x=>{ ;if(x.nombre==paramTags[0]){this.current=x} } )
            console.log(this.current);
            
            
            //console.log(allTags.forEach( async at =>{ let x:any = await this.RecursiveTag(at,paramTags,1); if(x){;return at;} } ));
            for (const at in allTags) {
              if (Object.prototype.hasOwnProperty.call(allTags, at)) {
                const element = allTags[at];
                let x = await this.RecursiveTag(element,paramTags,1);
                
                  if(x&&x.length==paramTags.length){console.log(x);
                  this.tags=x;break}
                
              }
            }
            
            /*allTags.find(async at => {
              
              let b = await this.RecursiveTag(at,paramTags,1)
              console.log(b);
              
              if(b){ console.log("we");
              ;this.tags.push(b); return b}
            });*/
            this.tagname=paramTags[paramTags.length-1];
            
        
         
      }
    )
  }
  back(){
    let dir = this.router.url.split('&') 
    if (dir&&dir.length>1){
      dir.splice( dir.length-1,1 )
      console.log(dir);
      let newDir:string=""
      dir.forEach( x=>{if(newDir){newDir+="&"+x}else{newDir=x}} )
      console.log( newDir);
      
      //this.router.navigate([newDir])
      window.location.assign(newDir)
      return
    }
    this.router.navigate(['admin/tags/select'])
    
    
  }
  RecursiveTag(at:any,params:any[],i:number,list:any[]=[]){
    list.push(at)
    console.log(list);
    //console.log(params[i-1]==at.nombre);
    
    
    
    if(i==params.length){ //let x =  params.find( (tag)=> {console.log(tag + at.nombre);return tag==at.nombre}); if (x){return [at]}return undefined 
    if(params[i-1].toLowerCase()==at.nombre.toLowerCase()){//console.log("true "+at);
      console.log("devolviendo: "+at.nombre);
      
    return list
  }list.splice( list.findIndex(a=>a.nombre==at.nombre),1 )
  
    }
    else{
      if(params[i-1].toLowerCase()!=at.nombre.toLowerCase()){
        list.splice( list.findIndex(a=>a.nombre==at.nombre),1 )
        return undefined
      }
      
        console.log(at.subsecciones);
        
      let y:any
      y = at.subsecciones.forEach( (x:any)=>{let b = this.RecursiveTag(x,params,i+1,list);console.log(x);
      if (b) {
        return list        
      }return undefined} )
      /*at.subsecciones.find(async (element:any) => {
        
        console.log("lety: "+element.nombre);
        let x:any = await this.RecursiveTag(element,params,i+1)
        console.log("bru");
        
        if(x){console.log("me fui"+x.nombre);
        ;y= x;
      }
      
      
    });*/
    
    console.log(list);
    if(list&&list.length>0){

      return list;
    }
    return undefined;
      
    }
    return undefined
    
  }
  async SendTag(e:string){
    console.log(this.route.url);
    
    //await this.router.navigate([this.router.url+'&'+e])
    window.location.assign(this.router.url+'&'+e)
  }
  TagClick(s:any,x:any){
    console.log(s.img);
    
    this.current=s;
    this.nombre=s.nombre;
    this.img=s.img;
    this.add=false;
    
    if(s.img||s.img==""){
      this.addtoType="Finales"
      this.activated=false;
      this.modifyF=true;
    }else{
      this.modifyF=false;
      this.activated=true;
      this.addtoType="Subsecciones";
    }
    this.tag=x;

  }

  AddTagClick(w:any,){
    console.log(this.tags[this.tags.length-1]);
    this.current=w;
    this.modifyF=false;
    this.activated=false;
    this.addto=w.nombre;
    this.add=true;
  }
  async addTag(nombre:string=this.current.nombre,img:string=this.current.img||""){
    //this.current._id=this.tag._id;
    console.log(this.current.nombre);
    console.log(this.tagname);
    
    
    if(!nombre&&!this.current.nombre || !this.tagname){throw new Error("ponele nombre pe chibolo");}
    if(!nombre){nombre=this.current.nombre}
    this.tags[this.tags.length-1].nombre=this.tagname;
    if(this.addtoType=="Finales"){
      console.log(this.tags);
      
      this.tags[this.tags.length-1].finales.push( {"nombre":nombre,img:img} );
    }else{
      this.tags[this.tags.length-1].subsecciones.push( {"nombre":nombre,"finales":[],"subsecciones":[]} )
    }
    console.log(this.tags[0]);
    const _id=this.tags[0]._id;
    delete this.tags[0]._id;
    
    await this.api.modifyTag( this.tags[0],_id );
    this.tags[0]['_id']=_id
    //window.location.reload();
  }
  async modifyTag(img:string=this.current.img||""){
    if(!this.nombre&&!this.current.nombre || !this.tagname){throw new Error("ponele nombre pe chibolo");}
    if(!this.nombre){this.nombre=this.current.nombre}
    this.tags[this.tags.length-1].nombre=this.tagname;
    if(this.addtoType=="Finales"){
      console.log(this.current);
      this.tags[this.tags.length-1].finales.forEach( (x:{"nombre":string,"img":string})=>{ if(x.nombre==this.current.nombre){x.nombre=this.nombre;x.img=img }} );
    }else{
      return
    }
    console.log(this.tags[0]);
    const _id=this.tags[0]._id;
    
    delete this.tags[0]._id;
    await this.api.modifyTag( this.tags[0],_id );
    this.tags[0]['_id']=_id
  }
  async removeTag(nombre:string){
    //this.current._id=this.tag._id;
    console.log(this.addtoType);
    if(!nombre || !this.tagname){throw new Error("ponele nombre pe chibolo");}
    this.tags[this.tags.length-1].nombre=this.tagname;
    //console.log(this.tag.finales.splice( this.tag.finales.findIndex( (x:string)=> x==nombre ),1));
    
    if(this.addtoType=="Finales"){
      if(this.tags[this.tags.length-1].finales.findIndex( (x:any)=> x.nombre==nombre ||x==nombre)>=0){

        this.tags[this.tags.length-1].finales.splice(this.tag.finales.findIndex( (x:any)=> x.nombre==nombre||x==nombre ) ,1)
      }
    }else{
      console.log(this.tag.subsecciones[0]);
      
      if(this.tags[this.tags.length-1].subsecciones.findIndex( (x:any)=>x.nombre==nombre )>=0){

        this.tags[this.tags.length-1].subsecciones.splice(this.tag.subsecciones.findIndex( (x:any)=>x.nombre==nombre ),1)
      }
    }
    console.log(this.tags[0]._id);
    const _id=this.tags[0]._id
    delete this.tags[0]._id;
    await this.api.modifyTag( this.tags[0],_id );
    this.tags[0]['_id']=_id
    //window.location.reload();
  }
  async changeName(e:KeyboardEvent){
    
    if(e.key=="Enter"){
      console.log(this.tags[this.tags.length-1]);
      
      
      this.tags[this.tags.length-1].nombre=this.tagname;
      const _id=this.tags[0]._id;
      delete this.tags[0]._id;
      await this.api.modifyTag( this.tags[0],_id );
      this.tags[0]['_id']=_id
      //window.location.reload();
    }

  }
  uploadImage(e:any){
    console.log(typeof(e))
    if(!e){return}
    let file = e.target.files[0];
    const form:FormData=new FormData();
    form.append('image',file)
//    let x:any = {"image":this.uploadIMG}
    this.api.uploadImage( form  ).subscribe((y:any)=>{if(y){ console.log(y);
    this.img=y.imageURL }})
    
  }
}
