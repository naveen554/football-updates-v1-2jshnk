import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FootballUpdatesService } from '../../services/football-updates.service';
import { TeamFixture, TeamFixturesData } from '../../interfaces/team-fixtures';
import { TeamLeague } from '../../interfaces/team-league';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.css'],
})
export class TeamResultsComponent implements OnInit, OnDestroy {
  footballTeamData: TeamFixture[] = [];
  teamId: string = '';
  hasLoading: boolean = false;
  subscriptions: Subscription = new Subscription();
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly footballUpdatesService: FootballUpdatesService
  ) {}

  ngOnInit(): void {
    const teamLeague: TeamLeague =
      JSON.parse(localStorage.getItem('footballUpdatesData')!) || [];
    this.teamId = this.activatedRoute.snapshot.paramMap.get('teamId');
    this.getTeamFixtures(this.teamId, teamLeague.league.id);
  }

  goToFootballUpdatesHome(): void {
    this.router.navigate(['/']);
  }

  getTeamFixtures(id: string, leagueId: number): void {
    this.hasLoading = true;
    this.subscriptions.add(
      this.footballUpdatesService
        .getTeamFixtures(id, leagueId)
        .subscribe((res: TeamFixturesData) => {
          this.footballTeamData = res.response;
          this.hasLoading = false;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
