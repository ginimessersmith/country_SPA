import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-pages',
  templateUrl: './country-pages.component.html',
  styles: [
  ]
})
export class CountryPagesComponent implements OnInit {

  public country?: Country

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesServices: CountriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesServices.searchByCountryAlphaCode(id))//? recibe el valor anterior, y retorna un nuevo observable
      )
      .subscribe(
        //({ id }) => console.log({ params: id })
        //params => console.log({params:params['id']}) otra forma de obtener la url
        // ({ id }) => {
        //   this.countriesServices.searchByCountryAlphaCode(id)
        //     .subscribe(
        //       country => console.log(country)
        //     )
        // }
        (countrySubscribe) => {
          //? si el country == null, lo manda al home
          if (!countrySubscribe) {
            return this.router.navigateByUrl('')
          }
          this.country=countrySubscribe
          return
        }

      )
  }



}
