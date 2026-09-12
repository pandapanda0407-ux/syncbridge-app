import { bootstrapApplication } from '@angular/platform-browser';
import { mergeApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Browser-only: this provider attaches window error listeners, so it cannot be
// part of the config the prerender build shares.
bootstrapApplication(
  App,
  mergeApplicationConfig(appConfig, { providers: [provideBrowserGlobalErrorListeners()] })
).catch((err) => console.error(err));
