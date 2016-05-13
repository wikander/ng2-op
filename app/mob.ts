import {Mobber} from './mobber';


/*
  If startTime is non-null interval is started.
  If remainingTime is non-null and startTime is null interval is stopped but not ended.
  If both is null mob is stopped/not started.
*/
export class Mob {
  constructor(minutes: number) {
    this.minutes = minutes;
    this.mobbers = [];
    this.startTime = null;
    this.remainingTime = null;
  }
  minutes: number;
  name: string;
  startTime: number; //millis
  remainingTime: number; //millis
  mobbers: Mobber[];
}
