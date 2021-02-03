import { HttpClientInterceptor } from './shared/common/services/http-client.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './modules/main.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalCommonModule } from '@common/local-common.module';
import { UsersModule } from './modules/users/users.module';
import { AppHttpInterceptor } from './shared/common/services/http-interceptor';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MainModule,
    LocalCommonModule,
    UsersModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
