declare interface IP {
    ipAddress: String;
    subnet: String;
    broadcast: String;
    network: String;
}
export declare function networkTools(ipAddress?: string | null, subnet?: string | null): Promise<IP | IP[]>;
export {};
