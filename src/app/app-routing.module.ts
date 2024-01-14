import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './shared/components/pages/home-pages/home-pages.component';
import { AboutPagesComponent } from './shared/components/pages/about-pages/about-pages.component';
import { ContactPagesComponent } from './shared/components/pages/contact-pages/contact-pages.component';
import { CountriesModule } from './countries/countries.module';

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: HomePagesComponent
  // },
  {
    path: 'about',
    component: AboutPagesComponent
  },
  {
    path: 'contact',
    component: ContactPagesComponent
  },
  {
    path: 'countries',
    //? sintaxis basica para establecer las rutas hijas del Countries Module, carga perezosa
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: '**',//? especificar cualquier ruta
    redirectTo: 'countries'
  }
]

@NgModule({
  imports: [
    //! cuando las rutas son las principales de la app usar forRoot
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

