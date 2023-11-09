import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup; 
  constructor(private userService: UserService, private router: Router){
    this.formLogin = new FormGroup({
      email: new FormControl(),  
      contraseña: new FormControl() 
    })
  }
  onSubmit(){
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response)
        this.router.navigate(['/seccion'])
      })
      .catch(error => console.log(error))
  }
}