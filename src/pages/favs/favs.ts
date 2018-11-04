import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: 'page-favs',
  templateUrl: 'favs.html'
})
export class FavsPage {

  recipesFav: any;
  recipeTouched: any;

  constructor(public navCtrl: NavController,
              private themeableBrowser: ThemeableBrowser,
              private sqlite: SQLite,
              private toast: Toast,
              private database: DatabaseProvider) {
                
  }

  ionViewDidLoad() {
       
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.database.getAllRecipes().then( (data) => {
        this.recipesFav = data;
      }, (error) => {
        this.toast.show('No tienes favoritos', '3000', 'center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
        console.log(error);
      });
    }, 200);
  }
}
