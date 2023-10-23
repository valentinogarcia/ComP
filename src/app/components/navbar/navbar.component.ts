import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private userService: UserService,
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
  onClick(){
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/menu'])
      })
      .catch(error => console.log(error))
  }
}
