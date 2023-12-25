import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TeamLeague, TeamLeagueInfo } from '../../interfaces/team-league';
import {
  TeamStandingsInfo,
  TeamStnding,
} from '../../interfaces/team-standings';
import { FootballUpdatesService } from '../../services/football-updates.service';
import { FOOTBALL_LEAGUES_LIST } from '../../constants/football-league-constants';

@Component({
  selector: 'app-football-updates-home',
  templateUrl: './football-updates-home.component.html',
  styleUrls: ['./football-updates-home.component.css'],
})
export class FootballUpdatesHomeComponent implements OnInit, OnDestroy {
  teamLeaguesList: TeamLeague[] = [];
  standingsData: TeamStnding[] = [];
  selectedTeamId: number;
  hasLoading: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly footballUpdatesService: FootballUpdatesService
  ) {}

  ngOnInit(): void {
    this.getLeaguesData();
  }

  naviagteToFootballTeamResults(id: number): void {
    this.router.navigate(['team-results', id]);
  }

  getTeamStandings(leagueInfo: TeamLeague): void {
    this.hasLoading = true;
    this.selectedTeamId = leagueInfo?.league?.id;
    localStorage.setItem('footballUpdatesData', JSON.stringify(leagueInfo));
    this.subscriptions.add(
      this.footballUpdatesService
        .getTeamStandings(leagueInfo)
        .pipe(
          tap((res: TeamStandingsInfo) => {
            this.standingsData = res.response;
            this.hasLoading = false;
          })
        )
        .subscribe()
    );
  }

  getLeaguesData(): void {
    this.hasLoading = true;
    this.subscriptions.add(
      this.footballUpdatesService
        .getTeamLeaguesData()
        .pipe(
          tap((res: TeamLeagueInfo) => {
            this.hasLoading = false;
            if (res?.response?.length) {
              this.teamLeaguesList = res.response.filter(
                (leagueInfo: TeamLeague) => {
                  const leagueData = FOOTBALL_LEAGUES_LIST.find(
                    (element: number) => element === leagueInfo.league.id
                  );
                  return leagueData === leagueInfo.league.id;
                }
              );
              const getLeague: TeamLeague =
                JSON.parse(localStorage.getItem('footballUpdatesData')!) ||
                this.teamLeaguesList[0];
              this.getTeamStandings(getLeague);
            }
          }),
          catchError((err) => {
            this.hasLoading = false;
            return err;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
