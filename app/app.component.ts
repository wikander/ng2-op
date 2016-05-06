import { Component }       from '@angular/core';
import { HeroesComponent } from './heroes.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {HeroService} from './hero.service';
import { HTTP_PROVIDERS }    from '@angular/http';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-heroes></my-heroes>
  `,
  directives: [HeroesComponent],
  providers: [HTTP_PROVIDERS, HeroService]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
