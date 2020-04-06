import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { Result } from '@shared/result';
import { SysPermissionService } from '../shared/sys-permission.service';

@Component({
    selector: 'sys-permission-modal',
    templateUrl: './permission-modal.component.html',
    styles: [],
})
export class PermissionModalComponent implements OnInit {
    validateForm: FormGroup;
    record: any = {};
    title;

    constructor(private fb: FormBuilder, private permissionService: SysPermissionService, private ref: NzModalRef) { }

    ngOnInit() {
        this.validateForm = this.fb.group(
            {
                name: [this.record.name, [Validators.required]],
                mark: [this.record.mark, [Validators.required]],
                scope: [this.record.scope, [Validators.required]],
                url: [this.record.url, [Validators.required]],
                method: [this.record.method, [Validators.required]],
            }
        );
    }

    // 提交表单                                                                                               
    submitForm(value) {

        if (this.name.invalid) {
            this.name.markAsDirty();
            this.name.updateValueAndValidity();
            return;
        }
        if (this.record.id == undefined) {
            this.permissionService.add(value).subscribe((result) => {
                this.ref.close(result.msg);
            });
        } else {
            value.id = this.record.id;
            this.permissionService.update(value).subscribe((result) => {
                this.ref.close(result.msg);
            });
        }

    }
    close() {
        this.ref.destroy();
    }

    get name() {
        return this.validateForm.controls.name;
    }
    get mark() {
        return this.validateForm.controls.mark;
    }
    get url() {
        return this.validateForm.controls.url;
    }
    get method() {
        return this.validateForm.controls.method;
    }
    get scope() {
        return this.validateForm.controls.scope;
    }
}