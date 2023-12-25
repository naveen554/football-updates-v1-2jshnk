import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FootballUpdatesService } from './services/football-updates.service';
import { FootballUpdatesHomeComponent } from './components/football-updates-home/football-updates-home.component';
import { TeamResultsComponent } from './components/team-results/team-results.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    FootballUpdatesHomeComponent,
    TeamResultsComponent,
  ],
  providers: [FootballUpdatesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
