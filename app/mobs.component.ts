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
          <span class="mob-link mdl-navigation__link">{{mob.name}}</span><a class="mdl-navigation__link" [routerLink]="['/mob/edit/', mob.id]">edit</a>
        </span>
      </li>
    </ul>
    <mob-viewdetails [mob]="theMob"></mob-viewdetails>
    `,
    directives: [ROUTER_DIRECTIVES, MobViewDetailsComponent],
    providers: [],
    styles: [`
      .mob-link {
        cursor: pointer;
        cursor: hand;
        margin-right: 15px;
      }

      .mdl-list {
        min-width: 200px;
        flex: 0 1 auto
      }

      mob-viewdetails {
        margin-top: 20px;
        min-width: 600px;
        flex: 0 1 auto
      }

      :host {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }
    `]
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
