import {Component, Input} from '@angular/core';
import {Mob} from './mob';

@Component({
  selector: 'mob-detail',
  template: `
    <div *ngIf="mob.name">
      <div class="mdl-card mdl-shadow--2dp mob-card">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">{{ mob.name }}</h2>
        </div>
        <div class="mdl-card__supporting-text mdl-card--border">
          <p class="mob-interval"><i class="material-icons">schedule</i> {{mob.minutes}} Minutes</p>
          <br>
          <hr>
          <ul class="mdl-list">
            <li *ngFor="let member of mob.members" class="mdl-list__item">
              <span class="mdl-list__item-primary-content">
                  <i class="material-icons mdl-list__item-icon">person</i>
                  {{ member.name }}
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
  `
})
export class MobDetailComponent {
  @Input()
  mob: Mob;
}
