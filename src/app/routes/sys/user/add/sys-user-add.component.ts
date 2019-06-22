import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SysUserService } from 'app/service/sys-user.service';
import { NzModalRef } from 'ng-zorro-antd';
import { Result } from '@core/common/result';

@Component({
  selector: 'app-sys-user-add',
  templateUrl: './sys-user-add.component.html',
  styles: []
})
export class SysUserAddComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private sysUserService: SysUserService, private ref: NzModalRef) { }

  ngOnInit() {
    this.validateForm = this.fb.group(
      {
        username: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        gender: [null],
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
    this.sysUserService.saveSysUser(value).subscribe((result: Result) => {
      this.ref.close(result);
    });
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
