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
  d = [];
  data = {
    labels: this.labels,
    datasets: [{
      label: 'Chiffres d\'affaires',
      data: this.d,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  transactions = null;
  filtrage = [{ name: 'all' }, { name: 'année' }, { name: 'mois' }, { name: 'semaine' }, { name: 'jour' }]
  chiffreAffaires = 0;
  categories = [
    { "id": 0, "name": "poissons", "products": null },
    { "id": 2, "name": "crustaces", "products": null },
    { "id": 1, "name": "coquillages", "products": null },
  ];

  constructor(public productsService: ProductsService, public datePipe: DatePipe) { }

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction() {
    this.productsService.getTransaction().subscribe(res => {
      this.transactions = res;
      this.getchiffresAffaire("année")
    },
      (err) => {
        alert('failed loading json data');
      });
  }

  getTransactionCategory(idCategory) {
    this.productsService.getTransactionCategory(idCategory).subscribe(res => {
      this.transactions = res;
      this.getchiffresAffaire("année")
    },
      (err) => {
        alert('failed loading json data');
      });
  }

  convertDate(filtrage, date){
    let dateConvert = ""
    if (filtrage == "année") {
      dateConvert = date.toLocaleString('default', { month: 'long' })
    }
    else if (filtrage == "mois") {
      dateConvert = date.getDate()
    }
    else if (filtrage == "semaine") {
      dateConvert = date.toLocaleString('default', { weekday: 'long' })
    }
    else if (filtrage == "jour") {
      dateConvert = date.getHours()
    } else {
      dateConvert = date.getFullYear()
    }
    return dateConvert;
  }

  getchiffresAffaire(filtrage){
    this.chiffreAffaires = 0
    let today = new Date();
    let dateToday;
    if (filtrage == "année"){
      dateToday = today.toLocaleString('default', { month: 'long' })
    }
    else if (filtrage == "mois") {
      dateToday = today.getDate()
    }
    else if (filtrage == "semaine") {
      dateToday = today.toLocaleString('default', { weekday: 'long' })
    }
    else if (filtrage == "jour") {
      dateToday = today.getHours()
    } else {
      dateToday = today.getFullYear()
    }
    for (let i = 0; i < this.transactions.length; i++) {
      let date = new Date(this.transactions[i].created)
      let dateTransac;
      if (filtrage == "année") {
        dateTransac = date.toLocaleString('default', { month: 'long' })
      }
      else if (filtrage == "mois") {
        dateTransac = date.getDate()
      }
      else if (filtrage == "semaine") {
        dateTransac = date.toLocaleString('default', { weekday: 'long' })
      }
      else if (filtrage == "jour") {
        dateTransac = date.getHours()
      } else {
        dateTransac = date.getFullYear()
      }
      if (this.transactions[i].type == "Sale") {
        if (dateTransac == dateToday) {
          this.chiffreAffaires = this.chiffreAffaires + this.transactions[i].price
        }
      }
    }
    this.initData(filtrage);
  }

  initData(filtrage){
    this.labels = [];
    this.d = [];
    for (let i = 0; i < this.transactions.length; i++) {
      let dateExist = false
      let date = new Date(this.transactions[i].created)
      let dateTransac;
      if (filtrage == "année") {
        dateTransac = date.toLocaleString('default', { month: 'long' })
      }
      else if (filtrage == "mois") {
        dateTransac = date.getDate()
      }
      else if (filtrage == "semaine") {
        dateTransac = date.toLocaleString('default', { weekday: 'long' })
      }
      else if (filtrage == "jour") {
        dateTransac = date.getHours()
      } else {
        dateTransac = date.getFullYear()
      }
      console.log(dateTransac)
      if (this.transactions[i].type == "Sale"){
        for (let j = 0; j < this.labels.length; j++) {
          if (this.labels[j] == dateTransac){
            this.d[j] = this.d[j] + this.transactions[i].price
            dateExist = true;
          }
        }
        if (dateExist == false) {
          this.d[this.d.length] = this.transactions[i].price;
          this.labels[this.labels.length] = dateTransac;
        }
      }
    }
    console.log(this.d);
    console.log(this.labels);
    this.initChart();
  }

  initChart() {
    try {
      this.chart.destroy();
    } catch (error) {

    }
    Chart.defaults.scales.linear.min = 0;
    this.chart = new Chart('myChart', {
      type: 'line',
      data: this.data,
    });
    this.chart.data.labels = this.labels
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data = this.d;
    });
    this.chart.update();
  }
}
