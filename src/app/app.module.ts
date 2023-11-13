import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeccionComponent } from './pages/seccion/seccion.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ComparadorComponent } from './pages/comparador/comparador.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ElementosComponent } from './pages/admin/elementos/elementos.component';
import { TagsComponent } from './pages/admin/tags/tags.component';
import { AddComponent } from './pages/admin/tags/add/add.component';
import { ModifyComponent } from './pages/admin/tags/modify/modify.component';
import { TagComponentComponent } from './components/tag-component/tag-component.component';
@NgModule({
  declarations: [
    AppComponent,
    SeccionComponent,
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    ComparadorComponent,
    LoginComponent,
    RegisterComponent,
    ElementosComponent,
    TagsComponent,
    AddComponent,
    ModifyComponent,
    TagComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
