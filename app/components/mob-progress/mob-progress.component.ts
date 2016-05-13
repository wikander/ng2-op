import {Component, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
declare var componentHandler:any;
@Component({
  selector: 'mob-progress',
  template: `
    <div>
    <div id="p1" class="mdl-progress mdl-js-progress"></div>
      <h2>{{timer.theTime}}</h2>
      <h1 (click)="start()">Start</h1>
      <h1 (click)="pause()">Pause</h1>
    </div>
  `,
  styleUrls: ['app/components/mob-progress/mob-progress.component.css']
})
export default class MobProgressComponent implements AfterViewInit {
  private socketUrl =`ws://localhost:5050/mob/1`;
  private socket:WebSocket;
  private isRunning:Boolean;
  private timer:Timer;

  private hej:string = "hejsan"
  initMdlStuff() {
    let objs = document.querySelectorAll('.mdl-progress');
    [].forEach.call(objs,
      (obj: any) =>
        componentHandler.upgradeElement(obj)
      );
  }

  constructor() {
    this.timer = new Timer(15);
  }

  ngAfterViewInit() {
    this.initMdlStuff();

    console.log(this.timer.theTime);
    this.socket = new WebSocket(this.socketUrl);
    this.socket.onmessage = (msg) => {
      let parsedMessage = JSON.parse(msg.data);
      console.log(parsedMessage.action);
      switch(parsedMessage.action) {
        case "started":
          this.timer.start();
        case "paused":
        default:
          console.log("defautl");
      }
    };
    this.socket.onopen = () => console.log("open");
  }


  public start():void {
    this.socket.send('start');
    this.timer.start();
    this.isRunning = true;
  }

  public pause():void {
    this.socket.send('pause');
    this.timer.pause();
    this.isRunning = false;
  }

}

class Timer {
  private time: number = 0;
  private intervalZ;
  constructor(time:number) {
    this.time = time*1000*60;
  }

  public start() {
    this.intervalZ = setInterval(() => this.time = this.time - 1000, 1000);
  }

  public pause() {
    console.log(this.intervalZ);
    clearInterval(this.intervalZ);
  }

  get theTime():number {
    return this.time;
  }

  public getTime() {
    return this.time;
  }
}
