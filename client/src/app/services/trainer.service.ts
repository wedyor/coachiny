import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, Subscriber, Subscription } from 'rxjs'
import { memberData } from "../models/member.model";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { HeadService } from "../header/head.service";


@Injectable({ providedIn: 'root' })
export class TrainerService {
    private trainers: memberData[] = [];
    trainer: any;
    imageD: string = "";
    constructor(
      private http: HttpClient,
      private router: Router,
      private headService: HeadService) { }


    getTrainer(userId: string){
      return this.http.get<{
          _id: string;
          first_name: string;
          last_name: string;
          email: string;
          password: string;
          profile_image: string;
          profession: string;
          members: Array<string>;
      }>("http://localhost:3000/auth/trainer/profile/" + userId);
    };  
   
    async updatePicture(id: string, username: string, image: File) {
      await this.convertToBase64(image);
      let a = new FormData();
      a.append("image", this.imageD);
      this.http.post("http://localhost:3000/auth/trainer/profileimg/" + id, a)
        .subscribe(Response => {
          this.router.navigate(["/"]);
        });
  
    }
  
    async convertToBase64(file: File) {
      const observable = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber);
      });
      this.imageD = await observable.toPromise();
    }
  
    readFile(file: File, subscriber: Subscriber<any>) {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        subscriber.next(filereader.result);
        subscriber.complete();
      };
      filereader.onerror = (error) => {
        subscriber.error(error);
        subscriber.complete();
      };
    }
  
    getImage(img:string){
      console.log("img service")
      return this.http.get<{ content: string }>("http://localhost:3000/auth/trainer/profileimg/" + img);
    }
  
};










