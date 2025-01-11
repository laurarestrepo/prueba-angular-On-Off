import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';


import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ROUTES } from './app-routing';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(ROUTES),
    provideAnimationsAsync(),
    providePrimeNG({ 
      theme: {
        preset: Aura
      }
    })
  ]
};
