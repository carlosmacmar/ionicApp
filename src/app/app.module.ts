import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { FavsPage } from '../pages/favs/favs';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RecipesPage } from '../pages/recipes/recipes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Proveedor1Provider } from '../providers/proveedor1/proveedor1';
import { HttpClientModule } from "@angular/common/http";
import { ThemeableBrowser } from "@ionic-native/themeable-browser";
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from '../providers/database/database';

@NgModule({
  declarations: [
    MyApp,
    FavsPage,
    HomePage,
    TabsPage,
    RecipesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavsPage,
    HomePage,
    TabsPage,
    RecipesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Proveedor1Provider,
    ThemeableBrowser,
    SQLite,
    Toast,
    DatabaseProvider
  ]
})
export class AppModule {}
