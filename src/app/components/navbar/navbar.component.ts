import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userEmail: string | null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {this.userEmail = null; }

  ngOnInit() {
    // Obtén el correo electrónico del usuario al iniciar el componente
    this.userService.userEmail$.subscribe((email) => {
      console.log("email en navbar", email);
      this.userEmail = email;
    });
  }

  menuButton() {
    this.router.navigate(['/menu']);
  }

  loginButton() {
    this.router.navigate(['/login']);
  }

  registerButton() {
    this.router.navigate(['/register']);
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/menu']);
      })
      .catch(error => console.log(error));
  }
}