import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

// Angular 21 hands the server bootstrap a context and requires it be passed
// through; without it the prerender fails with NG0401 Missing Platform.
export default (context: BootstrapContext) => bootstrapApplication(App, config, context);
