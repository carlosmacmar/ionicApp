import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private inAppBrowser: InAppBrowser) {
    this.recipes = navParams.get("recipes");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  onOpenRecipe(url: string){
    const browserOptions: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.inAppBrowser.create(url, '_self', browserOptions);
  }

}
