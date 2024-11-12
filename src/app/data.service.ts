
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class DataService {
    constructor(
        private httpClient: HttpClient,
    ) {}

    public TELEGRAM_API_KEY: string = '6005218887:AAGzRtU0uye5zlPJ7EY_JTPbeMfvxJDyTxs';
    public TELEGRAM_API_URL: string = `https://api.telegram.org/bot${this.TELEGRAM_API_KEY}/sendMessage?chat_id=17146603&text=`;
  
    public reportToBot (message: string): Observable<any> {
        return this.httpClient.get(this.TELEGRAM_API_URL + message);
    }

    public getIpAddresses(): Observable<any> {
        return this.httpClient.get('https://api.ipify.org?format=json');
    }

  }