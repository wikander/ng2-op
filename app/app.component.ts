import { Component, OnInit }       from '@angular/core';
import { HeroesComponent } from './heroes.component';
import { HomeComponent } from './home.component';
import { CreateMobComponent } from './create-mob.component';

import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import {HeroService} from './hero.service';
import { HTTP_PROVIDERS }    from '@angular/http';

@Component({
  selector: 'my-app',
  template: `
  <div class="mdl-layout__container">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">{{title}}</span>
    <nav class="mdl-navigation">
      <a class="mdl-navigation__link" [routerLink]="['/mobs']">Mobs</a>
      <a class="mdl-navigation__link" [routerLink]="['/mob/create']">Create Mob</a>
    </nav>
  </div>
  <main class="mdl-layout__content">
    <div class="page-content">
      <router-outlet></router-outlet>
    </div>
    <!-- Slider with Starting Value -->
  </main>
</div>
</div>
  `,
  styles: [`.router-link-active {
    font-weight: bold;
    color: black !important;
  }`],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, HeroService]
})
@Routes([
  {
    path: '/mobs',
    component: HeroesComponent
  },
  {
    path: '/mob/create',
    component: CreateMobComponent
  },
  {
    path: '*',
    component: HomeComponent
  }
])
export class AppComponent {
  title = "OPMobTimer"
}
