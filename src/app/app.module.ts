import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeccionComponent } from './pages/seccion/seccion.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ComparadorComponent } from './pages/comparador/comparador.component';

@NgModule({
  declarations: [
    AppComponent,
    SeccionComponent,
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    ComparadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
