import { Component, AfterViewInit}       from '@angular/core';
import { MobsComponent } from './mobs.component';
import { HomeComponent } from './home.component';
import { CreateMobComponent } from './create-mob.component';
import { EditMobComponent } from './edit-mob.component';

import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import {MobService} from './mob.service';
import { HTTP_PROVIDERS }    from '@angular/http';

declare var componentHandler: any;

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
      </main>
    </div>
  </div>
  `,
  styles: [`.router-link-active {
    font-weight: bold;
    color: black !important;
  }`],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, MobService]
})
@Routes([
  {
    path: '/mobs',
    component: MobsComponent
  },
  {
    path: '/mob/create',
    component: CreateMobComponent
  },
  {
    path: '/mob/edit/:id',
    component: EditMobComponent
  },
  {
    path: '*',
    component: HomeComponent
  },
])
export class AppComponent implements AfterViewInit {
  title = "OPMobTimer"

  initMdlStuff() {
    let objs = document.querySelectorAll('.mdl-layout--fixed-drawer');
    [].forEach.call(objs,
      (obj: any) =>
        componentHandler.upgradeElement(obj)
      );
  }

  ngAfterViewInit() {
    this.initMdlStuff();
  }
}
