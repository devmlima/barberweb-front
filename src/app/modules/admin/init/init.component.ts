import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'init',
    templateUrl: './init.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class InitComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
    }
}
