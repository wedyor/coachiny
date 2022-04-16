import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminService } from "../services/admin.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  trainers:any = [];
  trainer:any;
  newStatus: string='Activate';
  constructor(private adminService: AdminService,private router: Router,private http: HttpClient){ }

  ngOnInit(): void {
    this. readListTrainers();
  }


  readListTrainers(){
    this.adminService.getAllTrainers().subscribe((data) => {
     this.trainers = data;
     console.log("trainers",this.trainers)
        
    })    
  }
  // udpateStatus(id: string){
  //   this.adminService.changeStatus(this.trainer.id);
  // }
    
    
    changeStatus(id: string) {
    console.log('dkhal lele method');
    let test:any;
    test={
      testData: this.newStatus
    };
    // console.log('Activate');
    this.http.put("http://localhost:3000/admin/home/" + id, test)
    .subscribe(data => {
      console.log(data);
    });
  }
}
