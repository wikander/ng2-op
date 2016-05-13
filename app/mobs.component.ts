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
