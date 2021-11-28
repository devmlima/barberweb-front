import { ElementRef, Self } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BaseSelectComponent } from './../../core/base/base-select.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { City } from './../../api/models/city';
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
    selector: 'city-select',
    templateUrl: './city-select.component.html',
    styleUrls: ['../customs-select.scss', './city-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CitySelectComponent extends BaseSelectComponent<any> {
    _disabled = false;
    controlType = 'base-select';

    @Input()
    uf: string
    
    @Input()
    get disabled() {
        return this._disabled;
    }
    set disabled(dis) {
        this._disabled = dis;
        this.stateChanges.next();
    }

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


    pesquisaFn(filtro: any): Observable<City[]> {
        if (!this.uf) {
            this.loading = false;
            return;
        }

        const whereObj: any = {
            estadoId: this.uf,
        };

        if (filtro) {
            whereObj.descricao =  { $iLike: `%${filtro}%` };
        }

        return this._service.cityFind({
            where: whereObj,
            offset: 0,
            order: [['descricao', 'asc']],
            limit: 30,
        });
    }
}
