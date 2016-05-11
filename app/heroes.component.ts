import {Component, OnInit} from '@angular/core';
import {Mob} from './mob';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import { OnActivate, Router } from '@angular/router';

//<my-hero-detail [hero]="selectedHero"></my-hero-detail>
@Component({
    selector: 'my-heroes',
    template: `
    <ul class="mdl-list">
      <li *ngFor="let mob of mobs"
        (click)="onSelect(mob)"
        [class.selected]="mob === selectedMob"
        class="mdl-list__item" >
        <span class="mdl-list__item-primary-content">
          {{mob.name}}
        </span>

      </li>
    </ul>
    `,
    directives: [HeroDetailComponent],
    providers: []
})
export class HeroesComponent implements OnActivate {
  constructor(private _heroService: HeroService) { }

  errorMessage: string;
  mobs:Mob[];


  onSelect(mob: Mob) { this.selectedMob = mob; }
  getMobs() {
    this._heroService.getHeroes()
                   .subscribe(
                     mobs => this.mobs = mobs,
                     error =>  this.errorMessage = <any>error);
  }

  routerOnActivate() {
    this.getMobs();
  }

  title = 'Tour of Heroes';
  selectedMob: Mob;
}
