import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './common/components/navigation/navigation.component';
import { SpinnerComponent } from './common/components/spinner/spinner.component';

@NgModule({
  declarations: [AppComponent, SpinnerComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NavigationComponent,
    HttpClientModule,
  ],
  providers: [
    RouterLink,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (): HttpInterceptor => ({
        intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
          if (localStorage.getItem('userToken')) {
            const clonedRequest = req.clone({
              setHeaders: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
              },
            });
            return next.handle(clonedRequest);
          }
          return next.handle(req.clone());
        },
      }),
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
