import { AboutPagesComponent } from './components/pages/about-pages/about-pages.component';
import { CommonModule } from '@angular/common';
import { ContactPagesComponent } from './components/pages/contact-pages/contact-pages.component';
import { HomePagesComponent } from './components/pages/home-pages/home-pages.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';




@NgModule({
  declarations: [
    AboutPagesComponent,
    ContactPagesComponent,
    HomePagesComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AboutPagesComponent,
    ContactPagesComponent,
    HomePagesComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SidebarComponent,
  ]

})
export class SharedModule { }
