import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MemberService } from "../services/member.service";
import { TrainerData } from "../models/trainer.model";
import { TrainerService } from "../services/trainer.service";
import {MatDialog} from '@angular/material/dialog';
import { DialogMessageComponent } from "src/app/dialog-message/dialog-message.component"


export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: "app-trainer-view",
  templateUrl: "./trainer-view.component.html",
  styleUrls: ["./trainer-view.component.css"],
})
export class TrainerViewComponent implements OnInit {
  trainer: any;
  TrainerData: TrainerData[] = [];
  details: any;
  image: any;
  member: any;
  profession: any;
  private TrainerId: any;

  constructor(
    public route: ActivatedRoute,
    public trainerService: TrainerService,
    public memberService: MemberService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.profession = localStorage.getItem("profession");
    this.getTrainer();
  }

  getTrainer() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.TrainerId = paramMap.get("id");
        this.trainerService.getTrainer(this.TrainerId).subscribe((data) => {
          this.trainer = {
            id: data._id,
            first_name: data.first_name,
            last_name: data.last_name,
            profile_image: data.profile_image,
            introduction: data.introduction,
          };
        });
      }
    });
  }

  async onHireTrainer() {
    let trainerH = await this.TrainerId;
    let a = localStorage.getItem("userId") || "";
    this.member = await this.memberService.getMember(a).toPromise();
      let result = await this.trainerService.hireTrainer(
        trainerH,
        this.member._id,
        this.member.first_name,
        this.member.height,
        this.member.weight
      );
     // console.log(this.member);
      this.openDialog(result.message);
  }
  openDialog(msg: string){
    this.dialog.open(DialogMessageComponent, {data :{message :msg} });
}
}
