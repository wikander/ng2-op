import {Component, OnInit} from '@angular/core';
import {Mob} from './mob';
import {HeroService} from './hero.service';
import { OnActivate, Router } from '@angular/router';

@Component({
    selector: 'all-mobs',
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
    directives: [],
    providers: []
})
export class MobsComponent implements OnActivate {
  constructor(private _heroService: HeroService) { }

  errorMessage: string;
  mobs:Mob[];


  onSelect(mob: Mob) { console.log("You've got the power."); }
  getMobs() {
    this._heroService.getHeroes()
                   .subscribe(
                     mobs => this.mobs = mobs,
                     error =>  this.errorMessage = <any>error);
  }

  routerOnActivate() {
    this.getMobs();
  }

  title = 'View of all mobs';
}
