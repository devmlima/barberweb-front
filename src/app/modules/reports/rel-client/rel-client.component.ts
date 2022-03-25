import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from './../../../../@fuse/animations/public-api';

@Component({
    selector: 'rel-client',
    templateUrl: './rel-client.component.html',
    styleUrls: ['./rel-client.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class RelClientComponent implements OnInit {
    ngOnInit(): void {
    }

}
