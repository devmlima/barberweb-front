import { Component, Input, HostBinding, Optional, Self, ElementRef, Output, EventEmitter, DoCheck, OnDestroy, OnChanges } from "@angular/core";
import { Subject } from "rxjs";
import { NgControl, ControlValueAccessor, NgForm, FormGroupDirective, FormControl } from "@angular/forms";
import { FocusMonitor } from "@angular/cdk/a11y";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { ErrorStateMatcher, CanUpdateErrorState } from '@angular/material/core';

@Component({
    selector: 'base-inpu',
    templateUrl: './blank.html'
})
export class BaseInputComponent<T> implements ControlValueAccessor, DoCheck, CanUpdateErrorState, OnDestroy, OnChanges {

    static nextId = 0;

    _value: T = null;
    protected _required = false;
    protected _placeholder: string;
    protected _disabled = false;
    protected _onChange: (_: any) => void;
    protected _onTouched: any;

    controlType = 'base-input';

    stateChanges = new Subject<void>();
    focused = false;
    errorState = false;

    @Input('aria-describedby') userAriaDescribedBy: string;
    @HostBinding() id = `base-input-${BaseInputComponent.nextId++}`;
    @Input() errorStateMatcher: ErrorStateMatcher;

    @Output() change: EventEmitter<T> = new EventEmitter<T>();
    @Output() clear: EventEmitter<void> = new EventEmitter<void>();

    protected _readonly = false;

    @Input()
    get value(): T | null {
        return this._value;
    }
    set value(val: T | null) {
        this._value = val;
        this.stateChanges.next();
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(plh: string) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    get empty() {
        return !this._value;
    }

    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input()
    get required() {
        return this._required;
    }
    set required(req) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }

    @Input()
    get readonly(): boolean {
        return this._readonly;
    }
    set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    constructor(
        @Optional() @Self() public ngControl: NgControl,
        protected fm: FocusMonitor,
        protected elRef: ElementRef<HTMLElement>,
        public _parentForm: NgForm,
        public _parentFormGroup: FormGroupDirective,
        public _defaultErrorStateMatcher: ErrorStateMatcher
    ) {
        if (this.ngControl != null) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
        fm.monitor(elRef.nativeElement, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }

    ngOnChanges() {
        this.stateChanges.next();
    }

    ngDoCheck() {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    onClear() {
        this.clear.next();
    }

    onContainerClick(event: MouseEvent) { }

    setDescribedByIds(ids: string[]) { }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void { }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }

    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newState = matcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    }

}