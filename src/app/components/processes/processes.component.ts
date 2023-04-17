import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';
import { ChartDataset } from 'chart.js';
import { Process } from 'src/app/model/process';
import { ProcessQueue } from 'src/app/model/process-queue';
import { Snapshot } from 'src/app/model/snapshot';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent implements OnInit {

  public cpuLineChart: any;
  public cpuDoughnut: any;

  queue = new ProcessQueue(5);
  usageData: any;
  firstLoad: boolean = false;


  // CPU slider properties
  cpu_slider_disabled = false;
  cpu_max = 100;
  cpu_min = 0;
  cpu_showTicks = false;
  cpu_step = 1;
  cpu_thumbLabel = false;
  cpu_value:number = 0;


  // CPU radio properties
  cpu_selected_snapshot: string = "";
  cpu_snapshots: string[] = ['5', '10', '15'];

  // CPU toggles
  cpu_auto_terminate = false;
  cpu_policy_active = false;


  constructor() {
    const eventSource = new EventSource("http://localhost:8080/process/top");
    eventSource.addEventListener('processCpuUsage', (event:any) => {
      // console.log(event.data)
      const snapshot : Snapshot = JSON.parse(event.data);
      // console.log(snapshot.processes.length)
      this.queue.enqueue(snapshot.processes)
      this.usageData = snapshot.usageData
      console.log(this.usageData)
      // console.log(this.queue.size())
      if(this.firstLoad == false) {
        this.createChart()
        this.firstLoad= true
      } else {
        this.updateChart();
        console.log('updating chart')
      }
    });
    eventSource.addEventListener('error', ()=> {
      console.log('EventSource Error')
    })
  }

  ngOnInit(): void {
    this.createChart();
  }
  updateChart() {
    var lastList: Process[] = this.queue.lastList();
    var procLabels: string[] = lastList.map((process)=> process.command);
    var procDatasets = this.queueToData();
    // this.cpuLineChart.data.labels = procLabels
    // this.cpuLineChart.data.datasets = procDatasets
    // this.cpuLineChart.update()
    
    this.setCpuDoughnutColors(procLabels, procDatasets)
    this.cpuDoughnut.data.labels = procLabels.slice(0, 10)
    this.cpuDoughnut.data.datasets = procDatasets
    this.cpuDoughnut.update()

  }

  setCpuDoughnutColors(procLabels: string[], procDatasets: ChartDataset[]) {
    procDatasets.forEach((dataset: ChartDataset) => {
      const top10Colors = [
        '#1abc9c',
        '#3498db',
        '#9b59b6',
        '#f1c40f',
        '#e67e22',
        '#e74c3c',
        '#2ecc71',
        '#34495e',
        '#16a085',
        '#27ae60'
        // 'rgba(255, 99, 132, 0.5)',
        // 'rgba(54, 162, 235, 0.5)',
        // 'rgba(255, 206, 86, 0.5)',
        // 'rgba(75, 192, 192, 0.5)',
        // 'rgba(54, 162, 235, 0.5)',
        // 'rgba(255, 206, 86, 0.5)',
        // 'rgba(75, 192, 192, 0.5)',
        // 'rgba(54, 162, 235, 0.5)',
        // 'rgba(255, 206, 86, 0.5)',
        // 'rgba(153, 102, 255, 0.5)'
      ];
      const otherColor = 'rgba(200, 200, 200, 0.5)';
      const backgroundColors = top10Colors.concat(Array(procLabels.length - 10).fill(otherColor));
      dataset.backgroundColor = backgroundColors;
    });
  }

  createChart(){
    var lastList: Process[] = this.queue.lastList();
    var procLabels: string[] = lastList.map((process)=> process.command);
    var procDatasets = this.queueToData();
    this.cpuLineChart = new Chart("cpuLineChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: procLabels, 
	      datasets: procDatasets
      },
      options: {
        aspectRatio:2.5
      }
    });
    this.createCpuDoughnut(procLabels, procDatasets)
  }

  createCpuDoughnut(procLabels: any[], procDatasets: any) {
    // procDatasets.forEach((dataset: ChartDataset) => {
    //   const top5Colors = [
    //     'rgba(255, 99, 132, 0.5)',
    //     'rgba(54, 162, 235, 0.5)',
    //     'rgba(255, 206, 86, 0.5)',
    //     'rgba(75, 192, 192, 0.5)',
    //     'rgba(54, 162, 235, 0.5)',
    //     'rgba(255, 206, 86, 0.5)',
    //     'rgba(75, 192, 192, 0.5)',
    //     'rgba(54, 162, 235, 0.5)',
    //     'rgba(255, 206, 86, 0.5)',
    //     'rgba(153, 102, 255, 0.5)'
    //   ];
    //   const otherColor = 'rgba(200, 200, 200, 0.5)';
    //   const backgroundColors = top5Colors.concat(Array(procLabels.length - 10).fill(otherColor));
    //   dataset.backgroundColor = backgroundColors;
    // });
    this.setCpuDoughnutColors(procLabels, procDatasets)
    this.cpuDoughnut = new Chart("cpuDoughnut", {
      type: 'doughnut', //this denotes the type of chart
      data: {// values on X-Axis
        labels: procLabels.slice(0, 10), 
	      datasets: procDatasets
      },
      options: {
        aspectRatio:2.5
      }

    });

  }

  queueToData() : any {
    var result = [];
    for(let i = 0; i < this.queue.size(); i++) {
      let item: any = {};
      item.label = i;
      var processesAt: Process[] = this.queue.at(i)
      const cpuPercents: string[] = processesAt.map((process) => process.cpuPercent)
      item.data = cpuPercents
      // console.log(item)
      item.backgroundColor = "#cc33ff"
      result.push(item);
    }
    return result;
  }


}
