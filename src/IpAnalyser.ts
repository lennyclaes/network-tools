export default class IpAnalyser {
    private ipLength: number = 4;
    private bitmask: number = 0b11111111;

    ipAddress: number[];
    netmask: number[];
    wildcard: number[];

    constructor(ipAddress: string, netmask: string) {
        this.ipAddress = this.splitIp(ipAddress);
        this.netmask = this.splitIp(netmask);
        this.wildcard = this.getWildcard();
    }

    private splitIp(ipAddress: string): number[] {
        const ipSegments: string[] | null = ipAddress.match(/[0-9]{1,3}/gi);
        if (!ipSegments || ipSegments.length != this.ipLength) {
            throw new Error('Invalid IP address: ' + ipAddress);
        }
        return ipSegments.map((segment: string) => parseInt(segment));
    }

    private getWildcard(): number[] {
        return this.netmask.map((segment: number): number => { return segment ^ this.bitmask });
    }

    /**
     * Gets the IPv4 network address based on the IP address and subnet
     * @returns The networkaddress of the networksegment
     */
    getNetworkAddress(): string {
        let networkAddress: number[] = this.ipAddress.map((segment: number, i: number) => {
            return segment & this.netmask[i];
        });
        return networkAddress.join('.');
    }

    /**
     * Gets the IPv4 broadcast address based on the IP address and subnet
     * @returns The broadcastaddress of the networksegment
     */
    getBroadcastAddress(): string {
        let broadcastAddress: number[] = this.ipAddress.map((segment: number, i: number) => {
            return segment | this.wildcard[i];
        });
        return broadcastAddress.join('.');
    }
}