import {Component, OnInit, Input} from '@angular/core';
import {iInfo, InfoService} from "../../services/info.service";

export enum eInfoType {
  SECURED = 'secured',
  OPEN = 'open'
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() infoType: eInfoType = eInfoType.SECURED

  info: iInfo | undefined;

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
  }

  getInfo(): void {

    if (this.infoType === eInfoType.SECURED) {
      this.infoService.getInfo().subscribe(resp => {
        this.info = resp
      })
    } else if (this.infoType === eInfoType.OPEN) {
      this.infoService.getOpenInfo().subscribe(resp => {
        this.info = resp
      })
    }

  }
}
