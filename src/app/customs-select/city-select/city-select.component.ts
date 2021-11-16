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
import { BaseComboComponentFormField } from 'app/core/base/BaseComboComponentFormField.component';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
    selector: 'city-select',
    templateUrl: './city-select.component.html',
    styleUrls: ['./city-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CitySelectComponent extends BaseComboComponentFormField<
    City,
    ApiService
> {
    _disabled = false;

    @Input()
    get disabled() {
        return this._disabled;
    }
    set disabled(dis) {
        this._disabled = dis;
        this.stateChanges.next();
    }

    constructor(
        _service: ApiService,
        _dialog: MatDialog,
        _cd: ChangeDetectorRef,
        @Optional() ngControl: NgControl,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        _defaultErrorStateMatcher: ErrorStateMatcher
    ) {
        super(
            _service,
            _dialog,
            _cd,
            ngControl,
            _parentForm,
            _parentFormGroup,
            _defaultErrorStateMatcher
        );
    }

    pesquisaFn(filtro: any): Observable<City[]> {
        const whereObj: any = {
            $and: [
                {
                    $or: [{ descricao: { $iLike: `%${filtro}%` } }],
                },
            ],
        };

        return this._service.cityFind({
            where: whereObj,
            limit: 30,
        });
    }
}
