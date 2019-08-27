import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysUserService } from 'app/service/sys-user.service';

@Component({
  selector: 'app-sys-user-edit',
  templateUrl: './sys-user-edit.component.html',
})
export class SysUserEditComponent implements OnInit {
  validateForm: FormGroup;

  record: any = {};

  constructor(
    private ref: NzModalRef,
    public http: _HttpClient,
    private fb: FormBuilder,
    private sysUserService: SysUserService
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [this.record.username, [Validators.required]],
      email: [this.record.email, [Validators.required, Validators.email]],
      gender: [this.record.gender],
    });
  }


  close() {
    this.ref.destroy();
  }

  //保存更改
  submitForm(value: { id: any; }) {
    value.id = this.record.id
    if (this.username.invalid || this.email.invalid) {
      this.username.markAsDirty();
      this.username.updateValueAndValidity();
      this.email.markAsDirty();
      this.email.updateValueAndValidity();
      return;
    }
    this.sysUserService.update(value).subscribe(next => {
      this.ref.close(next.msg);
    }, err => {
      this.ref.destroy()
    });
  }

  /**
   * get方法
   */
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
