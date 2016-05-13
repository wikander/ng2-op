import {Component, Input, AfterViewInit} from '@angular/core';
import {Mob} from './mob';
import {MobService} from './mob.service';

declare var componentHandler: any;

@Component({
  selector: 'mob-list-detail',
  template: `
      <p>Mob Name: {{mob.name}}</p>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" (click)=deleteMob()>Delete</button>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" (click)=deleteMob()>Edit</button>
  `
})
export class MobListDetailComponent {
  @Input()
  mob: Mob;

  private errorMessage: any;

  constructor(private _mobService: MobService) {
  }

  deleteMob() {
    this._mobService.deleteMob(this.mob)
                   .subscribe(
                     mob => console.log(mob),
                     error =>  this.errorMessage = <any>error);
  }
}
