import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/ui/nav-bar/nav-bar.component';
import { ChoresComponent } from './components/chores/chores.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ChoresComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
