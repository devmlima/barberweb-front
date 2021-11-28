import { ElementRef, Output, Self, EventEmitter } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BaseSelectComponent } from './../../core/base/base-select.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { State } from './../../api/models/state';
import { ApiService } from './../../api/services/api.service';
import { fuseAnimations } from './../../../@fuse/animations/public-api';
import {
    Component,
    ViewEncapsulation,
    ChangeDetectorRef,
    Optional,
    Input,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
    selector: 'client-select',
    templateUrl: './client-select.component.html',
    styleUrls: ['../customs-select.scss', './client-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ClientSelectComponent extends BaseSelectComponent<any> {
    _disabled = false;
    controlType = 'base-select';

    @Input()
    get disabled() {
        return this._disabled;
    }
    set disabled(dis) {
        this._disabled = dis;
        this.stateChanges.next();
    }

    @Output()
    selectService: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Constructor
     *
     * @param {NgControl} ngControl
     * @param {FocusMonitor} fm
     * @param {ElementRef<HTMLElement>} elRef
     */
     constructor(
        @Optional() @Self() ngControl: NgControl,
        fm: FocusMonitor,
        elRef: ElementRef<HTMLElement>,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional() _defaultErrorStateMatcher: ErrorStateMatcher,
        _dialog: MatDialog,
        _cd: ChangeDetectorRef,
        protected _service: ApiService,
    ) {
        super(ngControl, fm, elRef, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, _dialog, _cd);
    }

    ngOnChanges() {
        this.pesquisaFn(null);
    }


    pesquisaFn(filtro: any): Observable<State[]> {
        const whereObj: any = { };

        if (filtro) {
            whereObj.descricao =  { $iLike: `%${filtro}%` };
        }

        return this._service.clientFindAll({
            where: whereObj,
            offset: 0,
            order: [['descricao', 'asc']],
            limit: 30,
        });
    }

    handleSelectState(value: State) {
        this.selectService.next(value);
    }
}
