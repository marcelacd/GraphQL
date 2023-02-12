import { Component } from '@angular/core';
import { ApiService } from './services/apiServices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularGraphQL';

  constructor(private apiService: ApiService) { }

  a() {
    this.apiService.getData().subscribe(console.log)
  }
}
