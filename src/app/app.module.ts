import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material Imports
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
} from '@angular/material';

// external libraries
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';  //for translation
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; // for translation
import { TimezonePickerModule } from 'ng2-timezone-selector'; // for timezone dropdown

//pipes
import { DateLocalePipe } from '../pipes/dateLocale.pipe';
import { TimeZonePipe } from '../pipes/timeZone.pipe';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DateLocalePipe,
    TimeZonePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    //Angular Material
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,

    // External Modules
    TimezonePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
