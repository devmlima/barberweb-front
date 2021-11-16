import {
    debounceTime,
    distinctUntilChanged,
    filter,
    tap,
    switchMap,
    catchError,
} from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
    ControlValueAccessor,
    FormGroupDirective,
    NgControl,
    NgForm,
} from '@angular/forms';
import {
    Injectable,
    OnInit,
    AfterViewInit,
    DoCheck,
    ChangeDetectorRef,
    Input,
    ViewChild,
    Output,
    EventEmitter,
    HostBinding,
} from '@angular/core';
import { BaseComponentFormField } from './BaseComponentFormField.component';
import { CanUpdateErrorState, ErrorStateMatcher } from '@angular/material/core';
import { NgSelectComponent } from '@ng-select/ng-select';

@Injectable()
export abstract class BaseComboComponentFormField<TModel, TApi>
    extends BaseComponentFormField
    implements
        OnInit,
        AfterViewInit,
        ControlValueAccessor,
        DoCheck,
        CanUpdateErrorState
{
    constructor(
        protected _service: TApi,
        protected _dialog: MatDialog,
        _cd: ChangeDetectorRef,
        ngControl: NgControl,
        _parentForm: NgForm,
        _parentFormGroup: FormGroupDirective,
        _defaultErrorStateMatcher: ErrorStateMatcher
    ) {
        super(
            _cd,
            ngControl,
            _parentForm,
            _parentFormGroup,
            _defaultErrorStateMatcher
        );
    }

    static nextId = 0;

    forceRefresh = false;

    filtered: Observable<TModel[]>;
    loading = false;
    search = new Subject<string>();
    controlType = 'custom-combo';

    @ViewChild('select', { static: true }) select: NgSelectComponent;

    @Input() label = 'Selecione';
    @Input() addButton;
    @Input() include: any = [];
    @Input() addTag = false;
    @Input() filterInWhite = false;
    @Input() initSeaching: boolean = null;
    @Output() refreshComponent = new EventEmitter<any>();

    executeSearch = false;
    @HostBinding() id = `custom-combo-${BaseComboComponentFormField.nextId++}`;

    ngOnInit() {
        if (this.addButton !== undefined) {
            this.addButton = true;
        }

        if (this.initSeaching === false) {
            this.executeSearch = true;
        }

        this.filtered = this.search.pipe(
            debounceTime(200),
            distinctUntilChanged((prev, curr) => {
                if (this.forceRefresh) {
                    this.forceRefresh = false;
                    return false;
                }
                return prev === curr;
            }),
            filter((term) => {
                if (!this.filterInWhite) {
                    return true;
                }
                return !!term;
            }),
            tap(() => (this.loading = true)),
            switchMap((term: string) => {
                return this.pesquisaFn(term || '').pipe(
                    catchError(() => of([])),
                    tap(() => (this.loading = false))
                );
            })
        ) as Observable<TModel[]>;
        this.search.next('');
    }

    refresh() {
        this.forceRefresh = true;
        this.search.next(this.select.searchTerm);
    }

    ngAfterViewInit() {
        this.select.focusEvent.subscribe(() => {
            if (this.executeSearch) {
                this.executeSearch = false;
                this.search.next('');
            }
            this.focused = true;
            this.stateChanges.next();
        });
        this.select.blurEvent.subscribe(() => {
            this.focused = false;
            this.stateChanges.next();
        });
        this.select.changeEvent.subscribe((v) => {
            if (v && this.addTag && v.label) {
                v = v.label;
            }
            if (this.onChange) {
                this.onChange(v);
            }
            this.change.emit(v);
        });
        if (this.initSeaching) {
            this.search.next('');
        }
    }

    registerOnTouched(fn: any): void {
        this.select.registerOnTouched(fn);
    }
    setDisabledState?(isDisabled: boolean): void {
        this.select.setDisabledState(isDisabled);
    }

    abstract pesquisaFn(filtro: string): Observable<TModel[]>;

    openForm(params: any, dialog: any, customConfig: any = null) {
        const defaultConfig: any = {
            width: '80%',
            maxHeight: '80%',
            autoFocus: true,
        };

        if (customConfig) {
            Object.assign(defaultConfig, customConfig);
        }

        defaultConfig.data = params;

        const dialogRef = this._dialog.open(dialog, defaultConfig);
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.innerValue = result;
                if (this.onChange) {
                    this.onChange(result);
                }
                this._cd.detectChanges();
                this.refreshComponent.next();
            }
        });
    }
}
