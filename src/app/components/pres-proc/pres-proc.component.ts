import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface Process {
  pid: string;
  command: string;
  cpuPercent: string;
  cpuTime: string;
  memory: string;
  ppid: string;
  user: string;
}

export interface Snapshot {
  usageData: Map<string, string>;
  processes : Process [];
}

class ProcessQueue {
  private data: Process[][] = [];
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }
  // Add an item to the back of the queue
  enqueue(item: Process[]) {
    if (this.data.length >= this.maxSize) {
      this.dequeue();
    }
    this.data.push(item);
  }

  // Remove and return the item at the front of the queue
  dequeue(): Process[] | undefined {
    return this.data.shift();
  }

  // Return the item at the front of the queue without removing it
  peek(): Process[] | undefined {
    return this.data[0];
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // Get the number of items in the queue
  size(): number {
    return this.data.length;
  }

  // Clear the queue
  clear() {
    this.data = [];
  }

  currentProcessData() {
    return this.data
  }

}


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-pres-proc',
  templateUrl: './pres-proc.component.html',
  styleUrls: ['./pres-proc.component.css']
})
export class PresProcComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;
  // dataSource: MatTableDataSource<Process>;

  //preservr
  queue = new ProcessQueue(5);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    
    // preservr
    const eventSource = new EventSource("http://localhost:8080/process/top");
    eventSource.addEventListener('processCpuUsage', (event:any) => {
      // console.log(event.data)
      const snapshot : Snapshot = JSON.parse(event.data);
      console.log(snapshot.processes.length)
      this.queue.enqueue(snapshot.processes)
      console.log(this.queue.size())
    });
    eventSource.addEventListener('error', ()=> {
      console.log('EventSource Error')
    })
    // this.dataSource = new MatTableDataSource(this.queue.currentData());
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };

}
