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

    getNetworkAddress(): string {
        let networkAddress: string = "";
        for (let i = 0; i < this.ipLength; i++) {
            networkAddress += this.ipAddress[i] & this.netmask[i];
            if (i < this.ipLength) { networkAddress += '.' };
        }
        return networkAddress;
    }

    getBroadcastAddress(): string {
        let broadcastAddress: string = "";
        for (let i = 0; i < this.ipLength; i++) {
            broadcastAddress += this.ipAddress[i] | this.wildcard[i];
            if (i < this.ipLength) { broadcastAddress += '.' };
        }
        return broadcastAddress;
    }
}