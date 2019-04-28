import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { STColumn, STColumnTag } from "@delon/abc";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  q: any = {
    username: "",
    gender: null
  };


  loading: Boolean = false;
  error: string = "";

  columns: STColumn[] = [
    { title: "编号", index: "id" },
    { title: "用户名", index: "username" },
    { title: "头像", index: "avatar" },
    { title: "邮箱", index: "email" }
  ]

  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
  }

  getData() {
    this.http.get("/api/v1/sysUsers").subscribe((data) => {
      console.log(data)
    }, error => {
      this.error = error;
    });
  }

}
