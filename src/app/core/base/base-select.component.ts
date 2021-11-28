import { BaseInputComponent } from './base-input.component';
import { Component, Input, HostBinding, Optional, Self, ElementRef, ViewChild, ChangeDetectorRef } from "@angular/core";
import { NgControl, NgForm, FormGroupDirective } from "@angular/forms";
import { FocusMonitor } from "@angular/cdk/a11y";
import { Observable, Subject, of } from 'rxjs';
import { NgSelectComponent } from '@ng-select/ng-select';
import { debounceTime, distinctUntilChanged, filter, tap, switchMap, catchError } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'base-select',
    templateUrl: './blank.html'
})
export class BaseSelectComponent<T> extends BaseInputComponent<T> {

    filtered: Observable<T[]>;
    loading: boolean = false;
    pesquisa = new Subject<string>();

    @ViewChild('select', { static: false }) select: NgSelectComponent;

    @Input() label: string = 'Selecione';
    @Input() filtraEmBranco: boolean = false;

    controlType = 'base-select';
    @HostBinding() id = `base-select-${BaseSelectComponent.nextId++}`;

    get empty() {
        return this.select && !this._value && !this.select.focused;
    }

    constructor(
        @Optional() @Self() ngControl: NgControl,
        fm: FocusMonitor,
        elRef: ElementRef<HTMLElement>,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional() _defaultErrorStateMatcher: ErrorStateMatcher,
        protected _dialog: MatDialog,
        protected _cd: ChangeDetectorRef
    ) {
        super(ngControl, fm, elRef, _parentForm, _parentFormGroup, _defaultErrorStateMatcher);
    }

    ngOnInit() {
        this.filtered = this.pesquisa.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            filter(term => {
                if (!this.filtraEmBranco) return true;
                return !!term;
            }),
            tap(() => this.loading = true),
            switchMap((term: string) => this.pesquisaFn(term || '').pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.loading = false)
            ))
        ) as Observable<T[]>;
    }

    ngAfterViewInit() {
        console.log(this.filtered)
        this.select.focusEvent.subscribe(() => {
            this.focused = true;
            this.stateChanges.next();
        });
        this.select.blurEvent.subscribe(() => {
            this.focused = false;
            this.stateChanges.next();
        });
        this.select.changeEvent.subscribe((v) => {
            if (v) {
                this.pesquisa.next('');
            }
            this._onChange(v);
            this.change.emit(v);
        });
        this.pesquisa.next('');
    }

    registerOnTouched(fn: any): void {
        this.select && this.select.registerOnTouched(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        this.select && this.select.setDisabledState(isDisabled);
    }

    pesquisaFn(filtro: string): Observable<T[]>{
        return of([]);
    }

    openForm(params: any, dialog: any, customConfig: any = null) {

        let defaultConfig: any = {
            width: '95vw',
            maxHeight: '95vh',
            autoFocus: true
        }

        if (customConfig) {
            Object.assign(defaultConfig, customConfig);
        }

        defaultConfig.data = params;

        let dialogRef = this._dialog.open(dialog, defaultConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.value = result;
                if (this._onChange) this._onChange(result);
                this._cd.detectChanges();
            }
        });
    }

}