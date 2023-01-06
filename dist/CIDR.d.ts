/**
 * Class CIDR
 * Given a CIDR value and extracts the subnet mask based on the significance bits
 */
export default class CIDR {
    private readonly _ipAddress;
    private readonly _signBits;
    private _subnet;
    /**
     * Creates a new instance of CIDR
     * @param cidr The IP address and significance bits
     * @example ```new CIDR("192.168.0.25/24")```
     */
    constructor(cidr: string);
    /**
     * The IP address in the CIDR
     */
    get ipAddress(): string;
    /**
     * The subnet from the CIDR
     */
    get subnet(): string;
    private splitCidr;
    /**
     * Forms the subnet based on the significance bits
     * @returns The subnet mask as a string
     */
    private formSubnet;
}
