import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';
import { Process } from 'src/app/model/process';
import { ProcessQueue } from 'src/app/model/process-queue';
import { Snapshot } from 'src/app/model/snapshot';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent implements OnInit {

  public chart: any;
  queue = new ProcessQueue(5);
  usageData: any;
  firstLoad: boolean = false;

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
    this.chart.data.labels = procLabels
    this.chart.data.datasets = procDatasets
    this.chart.update()

  }

  createChart(){
    var lastList: Process[] = this.queue.lastList();
    var procLabels: string[] = lastList.map((process)=> process.command);
    var procDatasets = this.queueToData();
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: procLabels, 
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
      item.backgroundColor = "pink"
      result.push(item);
    }
    return result;
  }


}
