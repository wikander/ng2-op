import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import { ROUTER_PROVIDERS } from '@angular/router';
import {provide}           from '@angular/core';
import {LocationStrategy,
        HashLocationStrategy} from '@angular/common';
import 'rxjs/Rx';

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(LocationStrategy,
         {useClass: HashLocationStrategy})]);
