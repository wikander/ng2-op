import {Mobber} from './mobber';

export class Mob {

  constructor(minutes: number) {
    this.minutes = minutes;
    this.mobbers = [];
  }
  minutes: number;
  name: string;
  mobbers: Mobber[];
}
