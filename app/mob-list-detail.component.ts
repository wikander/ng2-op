import {Component, Input, AfterViewInit} from '@angular/core';
import {Mob} from './mob';
import {MobService} from './mob.service';
import { OnActivate, Router, ROUTER_DIRECTIVES } from '@angular/router';

declare var componentHandler: any;

@Component({
    selector: 'mob-list-detail',
    template: `
      <div class="list-detail">
        <span class="mob-name">{{mob.name}}</span>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" (click)=deleteMob()>Delete</button>
        <a class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" [routerLink]="['/mob/edit/', mob.id]">Edit</a>
      </div>
  `,
  styles: [`.mob-list-detail{
    padding: 10px;
    display: block;
    .mob-name{
      font-weight: bold;
      font-size: 16px;
    }}`],
    directives: [ROUTER_DIRECTIVES]
})
export class MobListDetailComponent {
    @Input()
    mob: Mob;
    @Input()
    callbackDelete: any;

    private errorMessage: any;

    constructor(private _mobService: MobService) {
    }

    deleteMob() {
        this._mobService.deleteMob(this.mob)
            .subscribe(
            mob => this.callbackDelete(this.mob),
            error => this.errorMessage = <any>error);
    }
}
