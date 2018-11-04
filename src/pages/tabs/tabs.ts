import { Component } from '@angular/core';

import { FavsPage } from '../favs/favs';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FavsPage;

  constructor() {

  }
}
