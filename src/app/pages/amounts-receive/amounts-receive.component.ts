import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-amounts-receive',
  templateUrl: './amounts-receive.component.html',
  styleUrls: ['./amounts-receive.component.scss'],
})
export class AmountsReceiveComponent implements OnInit {

  constructor(public modalCtrl : ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }
  items=[
    {img:"avatar-02", name:"John Smith",amount:"1,500"},
    {img:"avatar-03", name:"John Smith",amount:"1,500"},
    {img:"avatar-04", name:"John Smith",amount:"1,500"},
    {img:"avatar-02", name:"John Smith",amount:"1,500"},
    {img:"avatar-03", name:"John Smith",amount:"1,500"},
    {img:"avatar-04", name:"John Smith",amount:"1,500"},
    {img:"avatar-03", name:"John Smith",amount:"1,500"},
    {img:"avatar-04", name:"John Smith",amount:"1,500"},
    {img:"avatar-02", name:"John Smith",amount:"1,500"},
  ]
}
