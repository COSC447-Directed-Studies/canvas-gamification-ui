import {Component} from '@angular/core'
import {HeaderComponent} from '../header/header.component'
import {NightModeService} from "@app/_services/night-mode.service"

@Component({
    providers: [HeaderComponent],
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    constructor(private nightModeService: NightModeService) {
    }

    getNightMode(): boolean {
        return this.nightModeService.getNightMode()
    }
}
