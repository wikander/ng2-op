import {Component, OnInit} from '@angular/core';
import {Mob} from './mob';
import {MobService} from './mob.service';
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
  constructor(private _mobService: MobService) { }

  errorMessage: string;
  mobs:Mob[];


  onSelect(mob: Mob) { console.log("You've got the power."); }
  getMobs() {
    this._mobService.getMobs()
                   .subscribe(
                     mobs => this.mobs = mobs,
                     error =>  this.errorMessage = <any>error);
  }

  routerOnActivate() {
    this.getMobs();
  }

  title = 'View of all mobs';
}
