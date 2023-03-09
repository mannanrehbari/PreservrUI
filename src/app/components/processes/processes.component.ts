import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';
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

  constructor() {
    const eventSource = new EventSource("http://localhost:8080/process/top");
    eventSource.addEventListener('processCpuUsage', (event:any) => {
      // console.log(event.data)
      const snapshot : Snapshot = JSON.parse(event.data);
      // console.log(snapshot.processes.length)
      this.queue.enqueue(snapshot.processes)
      // console.log(this.queue.size())
    });
    eventSource.addEventListener('error', ()=> {
      console.log('EventSource Error')
    })
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }


}
