import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysUserService } from 'app/routes/sys/user/shared/sys-user.service';
import { NzModalRef } from 'ng-zorro-antd';
import { Result } from '@shared/result';

@Component({
    selector: 'sys-user-modal',
    templateUrl: './user-modal.component.html',
    styles: []
})
export class UserModalComponent implements OnInit {
    validateForm: FormGroup;
    record: any = {}; // 从UserComponent传过来
    title; // 从UserComponent传过来

    constructor(private fb: FormBuilder, private sysUserService: SysUserService, private ref: NzModalRef) { }

    ngOnInit() {
        this.validateForm = this.fb.group(
            {
                username: [this.record.username, [Validators.required]],
                email: [this.record.email, [Validators.required, Validators.email]],
                gender: [this.record.gender],
            }
        );
    }

    // 提交表单
    submitForm(value) {
        if (this.username.invalid || this.email.invalid) {
            this.username.markAsDirty();
            this.username.updateValueAndValidity();
            this.email.markAsTouched();
            this.email.updateValueAndValidity();
            return;
        }
        if (this.record.id === undefined) { // 新增用户
            this.sysUserService.add(value).subscribe((result) => {
                this.ref.close(result);
            });
        } else {
            value.id = this.record.id;
            this.sysUserService.update(value).subscribe((result) => {
                this.ref.close(result);
            });
        }

    }
    close() {
        this.ref.destroy();
    }

    get username() {
        return this.validateForm.controls.username;
    }
    get email() {
        return this.validateForm.controls.email;
    }

    get gender() {
        return this.validateForm.controls.gender;
    }

}
