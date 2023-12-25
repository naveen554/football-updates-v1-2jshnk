import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamFixturesData } from '../interfaces/team-fixtures';
import { TeamStandingsInfo } from '../interfaces/team-standings';
import { TeamLeague, TeamLeagueInfo } from '../interfaces/team-league';

@Injectable()
export class FootballUpdatesService {
  apiPrefixUrl: string = 'https://v3.football.api-sports.io/';

  constructor(private http: HttpClient) {}

  setApiHttpHeaders(): HttpHeaders {
    const httpHeaders = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', '96065ab40fb12af77d841372ee0bcb3d');
    return httpHeaders;
  }

  getTeamFixtures(
    teamId: string,
    leagueId: number
  ): Observable<TeamFixturesData> {
    const date = new Date();
    const year = date.getFullYear();
    const gameStatus = 'FT';
    return this.http.get<TeamFixturesData>(
      `${this.apiPrefixUrl}fixtures?team=${teamId}&league=${leagueId}&last=10&status=${gameStatus}&season=${year}`,
      {
        headers: this.setApiHttpHeaders(),
      }
    );
  }

  getTeamLeaguesData(): Observable<TeamLeagueInfo> {
    return this.http.get<TeamLeagueInfo>(`${this.apiPrefixUrl}leagues`, {
      headers: this.setApiHttpHeaders(),
    });
  }

  getTeamStandings(leagueInfo: TeamLeague): Observable<TeamStandingsInfo> {
    const d = new Date();
    const year = d.getFullYear();
    return this.http.get<TeamStandingsInfo>(
      `${this.apiPrefixUrl}standings?league=${leagueInfo?.league?.id}&season=${year}`,
      {
        headers: this.setApiHttpHeaders(),
      }
    );
  }
}
