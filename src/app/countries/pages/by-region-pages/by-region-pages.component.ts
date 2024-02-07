import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';
 //? optimizacion para la experiencia del usuario


@Component({
  selector: 'app-by-region-pages',
  templateUrl: './by-region-pages.component.html',
  styles: [
  ]
})

export class ByRegionPagesComponent implements OnInit{

  public countries: Country[] = []

  //? optimizacion para la experiencia del usuario
  public regions:Region[]=['Africa' ,'Americas' ,'Europe' ,'Oceania' ,'Asia']
  public selectedRegion?:Region
  public initValuesPageRegion?:Region

  constructor(private countriesServices: CountriesService) { }
  ngOnInit(): void {
    this.countries=this.countriesServices.cacheStore.byRegion.countries
    this.initValuesPageRegion=this.countriesServices.cacheStore.byRegion.region
    this.selectedRegion=this.initValuesPageRegion
  }

  searchByRegion(buscar: Region) {
    //? optimizacion para la experiencia del usuario
    this.selectedRegion=buscar
    this.countriesServices.searchByRegion(buscar)
      .subscribe(countries => {
        this.countries = countries
      })
  }
}
