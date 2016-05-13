import { Component, OnInit} from '@angular/core';
import { Mob } from './mob';
import { MobService } from './mob.service';
import { OnActivate, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { MobViewDetailsComponent } from './mob-viewdetails.component';

@Component({
    selector: 'all-mobs',
    template: `
    <ul class="mdl-list">
      <li *ngFor="let mob of mobs"
        (click)="onSelect(mob)"
        [class.selected]="mob === selectedMob"
        class="mdl-list__item" >
        <span class="mdl-list__item-primary-content">
          {{mob.name}} <a class="mdl-navigation__link" [routerLink]="['/mob/edit/', mob.id]">edit</a>
        </span>
      </li>
    </ul>
    <mob-viewdetails [mob]="theMob"></mob-viewdetails>
    `,
    directives: [ROUTER_DIRECTIVES, MobViewDetailsComponent],
    providers: []
})
export class MobsComponent implements OnActivate {
  constructor(private _mobService: MobService) {
    this.theMob = new Mob(12);
  }

  errorMessage: string;
  mobs:Mob[];
  theMob: Mob


  onSelect(mob: Mob) { this.theMob = mob; }
  getMobs() {
    this._mobService.getMobs()
                   .subscribe(
                     mobs => {
                       this.mobs = mobs;
                     },
                     error =>  this.errorMessage = <any>error);
  }

  routerOnActivate() {
    this.getMobs();
  }

  title = 'View of all mobs';
}
