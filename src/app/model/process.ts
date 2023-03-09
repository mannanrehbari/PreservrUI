export interface Process {
    pid: string;
    command: string;
    cpuPercent: string;
    cpuTime: string;
    memory: string;
    ppid: string;
    user: string;
}
