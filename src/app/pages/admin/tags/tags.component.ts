import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  constructor(
    private router: Router
  ) {}
  
  SendToAdd(e:MouseEvent){
    console.log(this.router.url+'/add');
    
    //let r:string = this.router.url;    
     this.router.navigate([this.router.url+'/add'])    
  }
  SendToModify(e:MouseEvent){
    console.log(this.router.url+'/modify');
    
    //let r:string = this.router.url;    
     this.router.navigate([this.router.url+'/modify'])    
  }
}
