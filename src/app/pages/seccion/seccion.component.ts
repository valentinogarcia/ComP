import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent {
  constructor(
    private router: Router
  ) {}
  
  comparadorButton(){
    this.router.navigate(['/comparador']);
  }
}
