import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ControlValueAccessor,
    FormControl,
    FormGroupDirective,
    NgControl,
    NgForm,
} from '@angular/forms';
import {
    Injectable,
    OnInit,
    AfterViewInit,
    DoCheck,
    OnDestroy,
    OnChanges,
    ChangeDetectorRef,
    HostBinding,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { CanUpdateErrorState, ErrorStateMatcher } from '@angular/material/core';

@Injectable()
export abstract class BaseComponentFormField
    implements
        OnInit,
        AfterViewInit,
        ControlValueAccessor,
        DoCheck,
        CanUpdateErrorState,
        OnDestroy,
        OnChanges
{
    constructor(
        protected _cd: ChangeDetectorRef,
        public ngControl: NgControl,
        public _parentForm: NgForm,
        public _parentFormGroup: FormGroupDirective,
        public _defaultErrorStateMatcher: ErrorStateMatcher
    ) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    set value(val) {
        this.writeValue(val);
    }

    @Input()
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    get empty() {
        return !this.innerValue;
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
    get disabled() {
        return this._disabled;
    }
    set disabled(dis) {
        this._disabled = coerceBooleanProperty(dis);
        this.stateChanges.next();
    }

    @Input()
    get readonly(): boolean {
        return this._readonly;
    }
    set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
    }

    static nextId = 0;

    focused = false;
    stateChanges = new Subject<void>();
    errorState = false;
    controlType = 'custom-formfield';

    innerValue: any = null;
    onChange = null;

    @Input() errorStateMatcher: ErrorStateMatcher;

    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    @Output() clear: EventEmitter<any> = new EventEmitter<any>();
    @HostBinding() id = `custom-formfield-${BaseComponentFormField.nextId++}`;
    protected _placeholder: string;
    protected _required = false;
    protected _disabled = false;
    protected _readonly = false;

    @HostBinding('attr.aria-describedby') describedBy = '';
    setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    ngOnInit() {}

    ngOnChanges() {
        this.stateChanges.next();
    }

    ngDoCheck() {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    onClear() {
        this.clear.next(true);
    }

    ngAfterViewInit() {}

    writeValue(obj: any): void {
        this.innerValue = obj || null;
        this.stateChanges.next();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {}

    setDisabledState?(isDisabled: boolean): void {}

    ngOnDestroy() {
        this.stateChanges.complete();
    }

    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const matcher =
            this.errorStateMatcher || this._defaultErrorStateMatcher;
        const control = this.ngControl
            ? (this.ngControl.control as FormControl)
            : null;
        const newState = matcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    }

    update() {
        if (this.onChange) {
            this.onChange(this.innerValue);
        }
    }
}
