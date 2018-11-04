import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private themeableBrowser: ThemeableBrowser) {
    this.recipes = navParams.get("recipes");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  onOpenRecipe(url: string){
    const browserOptions: ThemeableBrowserOptions = {
      statusbar: {
          color: '#FF8C00'
      },
      toolbar: {
          height: 44,
          color: '#FF8C00'
      },
      title: {
          color: '#ffffff',
          showPageTitle: true,
          staticText: 'Receta'
      },
      closeButton: {
          wwwImage: 'assets/imgs/back-arrow.png',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed'
      },
      customButtons: [
          {
              wwwImage: 'assets/imgs/fav-empty.png',
              wwwImagePressed: 'assets/imgs/fav-filled.png',
              align: 'right',
              event: 'favPressed'
          }
      ],
      backButtonCanClose: true
    };
    
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', browserOptions);

    browser.on('favPressed').subscribe(data => {
      browser.close();
    });
  }

}
