export default class IpAnalyser {
    private ipLength;
    private bitmask;
    ipAddress: number[];
    netmask: number[];
    wildcard: number[];
    constructor(ipAddress: string, netmask: string);
    private splitIp;
    private getWildcard;
    /**
     * Gets the IPv4 network address based on the IP address and subnet
     * @returns The networkaddress of the networksegment
     */
    getNetworkAddress(): string;
    /**
     * Gets the IPv4 broadcast address based on the IP address and subnet
     * @returns The broadcastaddress of the networksegment
     */
    getBroadcastAddress(): string;
}
