import {Component, Input, AfterViewInit } from '@angular/core';
import {Hero} from './hero';
import {Mob} from './mob';
import {HeroService} from './hero.service';
import {MobDetailComponent} from './mob-detail.component';

declare var componentHandler: any;

@Component({
  selector: 'my-hero-detail',
  directives: [MobDetailComponent],
  providers: [],
  templateUrl: 'app/create-mob.template.html'
})
export class CreateMobComponent implements AfterViewInit {
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
