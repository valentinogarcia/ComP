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
        // Obtén el usuario actual después de iniciar sesión
        const user = this.userService.getCurrentUser();
        if (user && user.email) { // Comprueba si user y user.email no son nulos
          console.log('Correo electrónico del usuario en login.ts:', user.email);
          // Puedes almacenar el correo electrónico en el servicio o donde sea necesario
          this.userService.setUserEmail(user.email);
        }

        this.router.navigate(['/menu']);
      })
      .catch(error => console.log(error));
  }

  registerLink(){
    this.router.navigate(['/register']);
  }
}