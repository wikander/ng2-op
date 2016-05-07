import {Component, Input, AfterViewInit } from '@angular/core';
import {Hero} from './hero';
import {Mob} from './mob';
import {HeroService} from './hero.service';

declare var componentHandler: any;

@Component({
  selector: 'my-hero-detail',
  template: `
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
    <div *ngIf="member">
      <h2>Create new Mob</h2>
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield">
          <input class="mdl-textfield__input" type="text" id="mobName" [(ngModel)]="mob.name" >
          <label class="mdl-textfield__label" for="mobName">Mob name...</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield">
          <input class="mdl-textfield__input" type="text" id="name" [(ngModel)]="member.name" >
          <label class="mdl-textfield__label" for="name">Name...</label>
        </div>
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" (click)="addMember()">
          <i class="material-icons">add</i>
        </button>

        <input class="mdl-slider mdl-js-slider" type="range"
          min="1" max="60" [(ngModel)]="mob.minutes" tabindex="0">
      </form>
    </div>

    <div *ngIf="mob.name">
      <div class="mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">Mob: {{ mob.name }}</h2>
        </div>
        <div class="mdl-card__supporting-text mdl-card--border">
          <div>Time of interval: {{mob.minutes}}</div>
          <br>
          <br>
          <ul class="mdl-list">
            <li *ngFor="let member of mob.members" class="mdl-list__item">
              <span class="mdl-list__item-primary-content">
                  <i class="material-icons mdl-list__item-icon">person</i>
                  {{ member.name }} - {{ member.order }}
              </span>
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
    <router-outlet></router-outlet>
  </div>
</div>
  `
})
export class CreateTeamComponent implements AfterViewInit {
  private member: Hero;
  private mob: Mob;
  private order: number;
  private errorMessage: any;

  constructor(private _heroService: HeroService) {
    this.member = new Hero();
    this.mob = new Mob(15);
    this.order = 1;
  }

  ngAfterViewInit() {
    // viewChild is updated after the view has been initialized
    let objs = document.querySelectorAll('.mdl-slider, .mdl-textfield');
    [].forEach.call(objs,
      (obj: any) =>
        componentHandler.upgradeElement(obj)
      );

    console.log('hejhej');
  }

  addMember() {
    console.log("clicked");
    this.member.order = this.order;
    this.order++;
    this.mob.members.push(this.member);
    this.member = new Hero();
  }

  createMob() {
    this._heroService.addMob(this.mob)
                   .subscribe(
                     mob => console.log(mob),
                     error =>  this.errorMessage = <any>error);
  }

}
