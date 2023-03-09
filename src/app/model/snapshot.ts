import { Process } from "./process";

export interface Snapshot {
    usageData: Map<string, string>;
    processes : Process [];
}
