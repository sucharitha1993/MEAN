import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabs: MenuItem[];

  ngOnInit() {
    this.tabs = [
      { label: 'Dashboard', icon: 'fa-bar-chart', routerLink: ['/dashboard'] },
      { label: 'Students', icon: 'fa-users', routerLink: ['/students'] },
      { label: 'Faculty', icon: 'fa-book', routerLink: ['/faculty'] },
      { label: 'Others', icon: 'fa-support', routerLink: ['/others'] },
      { label: 'Activities', icon: 'fas fa-clone', routerLink: ['/activities'] }
    ];
  }
}
