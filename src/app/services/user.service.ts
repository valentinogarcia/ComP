import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEmailSubject = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private auth: Auth) {
    // Observa cambios en la autenticación
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUserEmail(user.email);
      } else {
        this.setUserEmail(null);
      }
    });
  }

  register({ email, contraseña }: any) {
    return createUserWithEmailAndPassword(this.auth, email, contraseña);
  }

  login({ email, contraseña }: any) {
    return signInWithEmailAndPassword(this.auth, email, contraseña);
  }

  logout() {
    return signOut(this.auth);
  }

  setUserEmail(email: string | null): void {
    console.log("email en userservice", email)
    this.userEmailSubject.next(email);
  }

  getUserEmail(): string | null {
    console.log("email en userservice el get", this.userEmailSubject.value)
    return this.userEmailSubject.value;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}