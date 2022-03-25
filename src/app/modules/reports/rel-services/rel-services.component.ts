import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations/public-api';

@Component({
    selector: 'rel-services',
    templateUrl: './rel-services.component.html',
    styleUrls: ['./rel-services.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class RelServicesComponent implements OnInit {
    ngOnInit(): void {
    }

}
