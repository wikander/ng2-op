import {Component, Input, AfterViewInit} from '@angular/core';
import {Mob} from './mob';
import {MobService} from './mob.service';

declare var componentHandler: any;

@Component({
  selector: 'mob-detail',
  template: `
    <div [hidden]="!mob.name">
      <div class="mdl-card mdl-shadow--2dp mob-card">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">{{ mob.name }}</h2>
        </div>
        <div class="mdl-card__supporting-text mdl-card--border">
          <div class="mdl-grid mob-interval-grid">
            <div class="mdl-cell mdl-cell--4-col">
              <p class="mob-interval"><i class="material-icons">schedule</i> {{mob.minutes}} Minutes</p>
            </div>
            <div class="mdl-cell mdl-cell--8-col">
              <input class="mdl-slider mdl-js-slider" type="range" min="1" max="60" [(ngModel)]="mob.minutes" tabindex="0">
            </div>
          </div>
          <hr>
          <ul class="mdl-list">
            <li *ngFor="let mobber of mob.mobbers" class="mdl-list__item">
              <span class="mdl-list__item-primary-content">
                  <i class="material-icons mdl-list__item-icon">person</i>
                  {{ mobber.name }}
              </span>
              <i (click)="onDeleteMobber(mobber.order)" class="material-icons">delete</i>
            </li>
          </ul>
        </div>
        <div class="mdl-card__actions  mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" (click)="createMob()">
             Spara
           </a>
        </div>
      </div>
    </div>
  `
})
export class MobDetailComponent implements AfterViewInit {
  @Input()
  mob: Mob;

  private errorMessage: any;

  constructor(private _mobService: MobService) {
  }

  initMdlStuff() {
    let objs = document.querySelectorAll('.mdl-slider, .mdl-textfield');
    [].forEach.call(objs,
      (obj: any) =>
        componentHandler.upgradeElement(obj)
      );
  }

  ngAfterViewInit() {
    this.initMdlStuff();
  }

  createMob() {
    this._mobService.addMob(this.mob)
                   .subscribe(
                     mob => console.log(mob),
                     error =>  this.errorMessage = <any>error);
  }
  
  onDeleteMobber(order: number){
    this.mob.mobbers = this.mob.mobbers.filter(mobber => mobber.order != order);
    var order = 1;
    this.mob.mobbers.forEach(mobber => mobber.order = order++);
  }
}
