import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth) { }
 
  register({ email, contraseña }: any) {
    return createUserWithEmailAndPassword(this.auth, email, contraseña);
  }
 
  login({ email, contraseña }: any) {
    return signInWithEmailAndPassword(this.auth, email, contraseña);
  }
 
  logout() {
    return signOut(this.auth);
  }
 
  getCurrentUserEmail(): string | null {
    const user: User | null = this.auth.currentUser;
return user ? user.email : null;
  }
}