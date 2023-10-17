import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private router: Router
  ) {}
  
  menuButton(){
    this.router.navigate(['/menu']);
  }
  loginButton(){
    this.router.navigate(['/login']);
  }
  registerButton(){
    this.router.navigate(['/register']);
  }
}
