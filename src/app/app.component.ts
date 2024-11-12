import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isAccountSelected: boolean = false;
  title = 'csulb-micro-front';

  public onAccountSelected(): void {
    this.isAccountSelected = true;
  }

  public onBackButtonClick(): void {
    this.isAccountSelected = false;
  }
  

}
