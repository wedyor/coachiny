import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminService } from "../admin.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  trainers:any = [];
  id:any;

  constructor(private adminService: AdminService,private router: Router){ }

  ngOnInit(): void {
    this. readListTrainers();
  }


  readListTrainers(){
    this.adminService.getAllTrainers().subscribe((data) => {
     this.trainers = data;
     console.log("trainers",this.trainers)
    
    })    
  }


  onUpdateStatus() {
    this.adminService.updateStaus(
        this.trainers.id,
        this.trainers.status
      );
    }
 
}
