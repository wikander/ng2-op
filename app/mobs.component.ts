import { Component, OnInit} from '@angular/core';
import { Mob } from './mob';
import { MobService } from './mob.service';
import { OnActivate, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { MobListDetailComponent } from './mob-list-detail.component';

@Component({
    selector: 'all-mobs',
    template: `
    <ul class="mdl-list">
      <li *ngFor="let mob of mobs"
        (click)="onSelect(mob)"
        [class.selected]="mob === selectedMob"
        class="mdl-list__item" >
        <span class="mdl-list__item-primary-content">
          <mob-list-detail [mob]="mob" [mobs]="mobs" [callbackDelete]="onDelete"></mob-list-detail>
        </span>
      </li>
    </ul>
    <mob-viewdetails [mob]="theMob"></mob-viewdetails>
    `,
    directives: [ROUTER_DIRECTIVES, MobListDetailComponent],
    providers: []
})
export class MobsComponent implements OnActivate {
  constructor(private _mobService: MobService) {
    this.theMob = new Mob(12);
    this.onDelete = this.onDelete.bind(this);
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

  onDelete(mob: Mob){
    console.log(this);
    console.log("callback", mob);
    this.mobs = this.mobs.filter((deleteMob) => deleteMob.id !== mob.id);
  }

  routerOnActivate() {
    this.getMobs();
  }

  title = 'View of all mobs';
}
