import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import * as moment from "moment-timezone";

// For encryption of form data
import * as crypto from 'crypto-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Global Vox Inc';
  defaultLang: string = 'en';
  userTimezone: string;
  initializedTimezone: boolean = false;
  minDate = new Date();
  meetingForm: any;
  showError: boolean = false;
  tableData: any = [];

  // defaultDate: FormControl;


  constructor(
    private formBuilder: FormBuilder,
    public translateService: TranslateService) {
    translateService.setDefaultLang('en');

    // form strcture of Metting form
    this.meetingForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      middleName: ['', []],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      meetingDate: ['', [Validators.required]],
      meetingStartTime: ['', [Validators.required]],
      meetingEndTime: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.initTimezonePicker();
  }

  // called from ngoninit() fro default zone to be loaded on dropdown
  private initTimezonePicker() {
    const timezone: string = moment.tz.guess();
    if (timezone === 'Asia/Calcutta') {
      this.userTimezone = 'Asia/Kolkata';
    } else {
      this.userTimezone = timezone;
    }
    this.initializedTimezone = true;
  }

  // called on change of timezone from header dropdown
  changeTimezone(timezone: string) {
    this.userTimezone = timezone;
  }

  // called on click of either language change
  switchLang(lang: string) {
    this.defaultLang = lang;
    this.translateService.use(lang);
  }

  // metting start time event
  selectedStartTime(event) {
    this.meetingForm.controls['meetingStartTime'].setValue(event);
  }

  // meeting end time event
  selectedEndTime(event) {
    this.meetingForm.controls['meetingEndTime'].setValue(event);
  }

  // called on Submit button click
  scheduleMeeting() {
    if (this.meetingForm.valid) {
      let data = this.meetingForm.getRawValue();
      if (data.meetingStartTime == data.meetingEndTime) {
        this.showError = true;
      }
      else {
        this.showError = false;
        this.meetingForm.reset();
        this.tableData = [data];

        // here 'AlsKdj' is a random string for encyption 
        sessionStorage.setItem('meetingDetails', (crypto.AES.encrypt(JSON.stringify(data), 'AlsKdj').toString()));
      }
    }

  }

}
