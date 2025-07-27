import { bootstrapApplication } from '@angular/platform-browser';
import { LandingComponent } from './app/components/landing/landing.component';
import { appConfig } from './app/app.config';

bootstrapApplication(LandingComponent, appConfig)
  .catch((err) => console.error(err));
