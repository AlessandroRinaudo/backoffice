import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductsService } from '../services/products.service';
Chart.register(...registerables);
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  chart = null;
  labels = [];
  d = [{x:null,y:null}];
  data = {
    datasets: [{
      label: 'Chiffres d\'affaires',
      data: this.d,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  transactions = null;

  constructor(public productsService: ProductsService, public datePipe: DatePipe) { }

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction() {
    this.productsService.getTransaction().subscribe(res => {
      this.transactions = res;
      this.initData();
    },
      (err) => {
        alert('failed loading json data');
      });
  }

  initData(){
    for (let i = 0; i < this.transactions.length; i++) {
      let dateExist = false;
      let date = this.datePipe.transform(this.transactions[i].created, 'yyyy-MM-dd')
      for (let j = 0; j < this.d.length; j++) {
        if (this.d[j].x == date){
          this.d[j].y = this.d[j].y + this.transactions[i].price
          dateExist = true;
        }
      }
      if (dateExist == false) {
        this.d[this.d.length] = { x: date, y: this.transactions[i].price};
      }
    }
    console.log(this.d);
    this.initChart()

  }

  initChart() {
    Chart.defaults.scales.linear.min = 0;
    this.chart = new Chart('myChart', {
      type: 'line',
      data: this.data,
    });
  }
}
