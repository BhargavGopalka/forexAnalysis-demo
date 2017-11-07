import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiManagerService} from "../../utility/shared-service/api-manager.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoading = true;

  constructor(private appService: ApiManagerService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.initInitialMethods();
  }

  /* Provide isLoading value to getLoader function */
  private initInitialMethods() {
    this.appService.getLoader().subscribe((isLoading) => {
      this.isLoading = isLoading;
      this.cdr.detectChanges();
    });
  }

}
