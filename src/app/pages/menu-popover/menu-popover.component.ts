import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit() { }

  async signOut($event) {
    this.authService.logout();
    this.router.navigate(['auth']);

  }

}
