import { Component } from '@angular/core';
import {eInfoType} from "../info/info.component";
import {InfoService} from "../../services/info.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  types = eInfoType;

  constructor(private infoService: InfoService) {
  }

  invalidRequest(): void {

    this.infoService.getInfoWithInvalidToken().subscribe()

  }

}
