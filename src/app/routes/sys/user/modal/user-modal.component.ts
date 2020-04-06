import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysUserService } from 'app/routes/sys/user/shared/sys-user.service';
import { NzModalRef } from 'ng-zorro-antd';
import { Result } from '@shared/result';

@Component({
    selector: 'sys-user-modal',
    templateUrl: './user-modal.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
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
                nickname: [this.record.nickname, [Validators.required]],
                password: [null],
                email: [this.record.email, [Validators.required, Validators.email]],
            }
        );
    }

    // 提交表单
    submitForm(value) {
        
        if (this.username.invalid || this.nickname.invalid || this.email.invalid) {
            this.username.markAsDirty();
            this.username.updateValueAndValidity();
            this.nickname.markAsTouched();
            this.nickname.updateValueAndValidity();
            this.email.markAsTouched();
            this.email.updateValueAndValidity();
            return;
        }
        if (this.record.id == undefined) { // 新增用户密码必填
            if (this.password == null || this.password.value == null || this.password.value.length < 6) {
                this.password.setValidators([Validators.required, Validators.minLength(6)]);
                this.password.markAsDirty();
                this.password.updateValueAndValidity();
                return;
            }
            this.sysUserService.add(value).subscribe((result) => {
                this.ref.close(result.msg);
            });
        } else {
            value.id = this.record.id;
            this.sysUserService.update(value).subscribe((result) => {
                this.ref.close(result.msg);
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
    get nickname() {
        return this.validateForm.controls.nickname;
    }
    get password() {
        return this.validateForm.controls.password;
    }

}
