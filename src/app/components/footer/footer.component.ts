import {Component} from '@angular/core'
import {HeaderComponent} from '../header/header.component'

@Component({
    providers: [HeaderComponent],
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    constructor(private headerComponent: HeaderComponent) {
    }

    // this only updates when the page is reloaded
    public isNightMode(): boolean {
        console.log(this.headerComponent.isNightMode())
        return this.headerComponent.isNightMode()
    }
}
