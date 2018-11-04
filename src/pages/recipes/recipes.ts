import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: any;
  recipeTouched: any;
  recipesFav: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private themeableBrowser: ThemeableBrowser,
    private sqlite: SQLite,
    private toast: Toast,
    private database: DatabaseProvider) 
    {
      this.recipes = navParams.get("recipes");
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.database.getAllRecipes().then( (data) => {
        this.recipesFav = data;
      }, (error) => {
        console.log(error);
      });
    }, 200);
  }

  onOpenRecipe(recipe){
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
    
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(recipe.source_url, '_blank', browserOptions);

    browser.on('favPressed').subscribe(data => {
      if(this.recipesFav.find(recipeChecking => recipeChecking.source_url == recipe.source_url))
      {
        this.database.deleteRecipe(recipe.source_url)
        .then( (data) => {
          this.toast.show('Receta eliminada de favoritos', '3000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        }, (error) => {
          this.toast.show('Error', '3000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
          console.log(error);
        });
      }
      else
      {
        this.database.addRecipe(recipe.title, recipe.source_url, recipe.image_url)
        .then( (data) => {
          this.toast.show('Receta añadida a favoritos', '3000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        }, (error) => {
          this.toast.show('Error', '3000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
          console.log(error);
        });
      }
    });
  }

}
