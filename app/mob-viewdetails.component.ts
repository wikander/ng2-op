import {Component, Input, AfterViewInit} from '@angular/core';
import {Mob} from './mob';
import {MobService} from './mob.service';

declare var componentHandler: any;

@Component({
  selector: 'mob-viewdetails',
  template: `
    <div [hidden]="!mob.name">
      <div class="mdl-card mdl-shadow--2dp mob-card">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">{{ mob.name }}</h2>
        </div>
        <div class="mdl-card__supporting-text mdl-card--border">
          <div class="mdl-grid mob-interval-grid">
            <!-- insert clock component -->
          </div>
          <hr>
          <ul class="mdl-list">
            <li *ngFor="let mobber of mob.mobbers" class="mdl-list__item">
              <span class="mdl-list__item-primary-content">
                  <i class="material-icons mdl-list__item-icon">person</i>
                  {{ mobber.name }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class MobViewDetailsComponent implements AfterViewInit {
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
}
