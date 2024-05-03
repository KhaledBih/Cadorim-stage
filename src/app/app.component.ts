import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
      translate.setDefaultLang(preferredLanguage); // Set the default language from local storage
      translate.use(preferredLanguage); // Use the selected language
    } else {
      // If no language preference is found in local storage, set a default language
      translate.setDefaultLang('en');
      translate.use('en');
    }
  }
}
