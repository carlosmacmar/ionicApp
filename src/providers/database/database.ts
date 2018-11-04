import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(
    public http: HttpClient,
    public storage: SQLite) {
      if(!this.isOpen){
        this.storage = new SQLite();
        this.storage.create({name: "data.db", location: "default"})
          .then((db:SQLiteObject) => {
            this.db = db;
            db.executeSql("CREATE TABLE IF NOT EXISTS recipes(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, source_url TEXT, image_url TEXT)", []);
            this.isOpen = true;
          })
          .catch((error) => {
            console.log(error);
          })
      }
  }

  addRecipe(title: string, source_url: string, image_url: string){
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO recipes(title, source_url, image_url) VALUES(?,?,?)";
      this.db.executeSql(sql, [title, source_url, image_url])
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getAllRecipes(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM recipes", [])
      .then((data) => {
        let arrayRecipes = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayRecipes.push({
              id: data.rows.item(i).id,
              title: data.rows.item(i).title,
              source_url: data.rows.item(i).source_url,
              image_url: data.rows.item(i).image_url
            });            
          }          
        }
        resolve(arrayRecipes);
      }, (error) => {
        reject(error);
      })
    })
  }

}
