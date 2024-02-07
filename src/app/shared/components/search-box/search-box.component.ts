import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  //? tipo especial de observable:
  private debouncer: Subject<string> = new Subject<string>
  private debouncerSubscription?: Subscription

  @Input()
  public placeholder: string = ''

  @Output()
  public onValue = new EventEmitter<string>()

  @Output()
  public onValueDebounce = new EventEmitter<string>()

  @Input()
  public initialValueSearch:string=''

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(500)//? cuanto tiempo esperar para realizar la siguiente emision (medio segundo), luego emite el valor
      )
      .subscribe(
        //?value => { console.log('debouncer: ', value) }
        //?value => this.emitValue(value) una forma para emitir
        value => { this.onValueDebounce.emit(value) }
      )
  }
  //? limpiar la suscripcion mediante el destroy:
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }
  //? emitir el valir
  emitValue(value: string): void {
    this.onValue.emit(value)
  }
  //? debounce, peticiones cuando el usuario deje de escribir
  //? usar rxjs
  onKeyPress(searchTerm: string) {
    //console.log(searchTerm)
    //? realizar la siguiente emision del observable debouncer:
    this.debouncer.next(searchTerm)
  }

}
