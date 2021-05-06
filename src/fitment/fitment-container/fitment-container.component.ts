import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoadYears, LoadMakes, LoadModels, LoadTrims } from "../store/actions";
import * as fromReducers from "../store/reducers";

@Component({
  selector: "app-fitment-container",
  templateUrl: "./fitment-container.component.html",
  styleUrls: ["./fitment-container.component.css"]
})
export class FitmentContainerComponent implements OnInit {
  years$: Observable<any>;
  makes$: Observable<any>;
  models$: Observable<any>;
  trims$: Observable<any>;
  selectedYear: string;
  selectedMake: string;
  selectedModel: string;
  // import the store into the constructor
  constructor(private store: Store<fromReducers.FitmentState>) {}

  ngOnInit() {
    this.years$ = this.store.select(fromReducers.getYears);
    // .pipe(tap(v => console.log("Received data")));

    this.makes$ = this.store.select(fromReducers.getMakes);
    // .pipe(tap(v => console.log("Received makes data")));

    this.models$ = this.store.select(fromReducers.getModels);
    // .pipe(tap(v => console.log("Received models data")));

    this.trims$ = this.store.select(fromReducers.getTrims);
    // .pipe(tap(v => console.log("Received trims data")));
  }

  getYears() {
    console.log("getYears");
    // dispatch an action to get array of years
    this.store.dispatch(new LoadYears());
    // Year
    // https://6080be3273292b0017cdbf2a.mockapi.io/years
  }

  getVehicleMake(event) {
    this.selectedYear = event.target.value;
    console.log("Year: ", event.target.value);
    this.store.dispatch(new LoadMakes(this.selectedYear));
  }

  getVehicleModel(event) {
    this.selectedMake = event.target.value;
    console.log("Make: ", event.target.value);
    this.store.dispatch(
      new LoadModels({ year: this.selectedYear, make: this.selectedMake })
    );
  }

  getVehicleTrim(event) {
    this.selectedModel = event.target.value;
    console.log("Model: ", event.target.value);
    this.store.dispatch(
      new LoadTrims({
        year: this.selectedYear,
        make: this.selectedMake,
        model: this.selectedModel
      })
    );
  }

  // Make with year (2021)
  // https://6080be3273292b0017cdbf2a.mockapi.io/makes

  // Model with year and make (Acura)
  // https://6080be3273292b0017cdbf2a.mockapi.io/models

  // Trim with year, make, model (RDX)
  // https://6080be3273292b0017cdbf2a.mockapi.io/trim
}
