import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { RecipesPage } from '../recipes/recipes';
import { Proveedor1Provider } from "../../providers/proveedor1/proveedor1";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarios
  ingredients
  recipes
  loading

  constructor(public navCtrl: NavController,
              public alerta: AlertController,
              public proveedor: Proveedor1Provider,
              public loadingCtrl: LoadingController) {
 
  }

  onSearch(){
    this.presentLoadingDefault();

    this.proveedor.getRecipes(this.ingredients)
      .subscribe(
        (data) => {
          this.recipes = data['recipes'];

          this.loading.dismiss();
          if(typeof this.recipes != "undefined" && this.recipes != null && this.recipes.length != null && this.recipes.length > 0){
            this.navCtrl.push(RecipesPage, {
              recipes: this.recipes
            });
          }else{
            this.basicAlert("Error", "No se encontraron resultados para esos ingredientes, por favor, prueba con otros")
          }
        },
        (error) => {console.log(error);}
      )
  }

  basicAlert(title: string, message: string){
    let alert = this.alerta.create({
      title: title,
      message: message,
      buttons: ['Entendido']
    });
    alert.present();
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Espera por favor...'
    });
  
    this.loading.present();
  }

}
