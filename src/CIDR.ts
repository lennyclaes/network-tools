/**
 * Class CIDR
 * Given a CIDR value and extracts the subnet mask based on the significance bits
 */
export default class CIDR {
    private readonly _ipAddress: string;
    private readonly _signBits: number;
    private _subnet: string = "";

    /**
     * Creates a new instance of CIDR
     * @param cidr The IP address and significance bits
     * @example ```new CIDR("192.168.0.25/24")```
     */
    constructor(cidr: string) {
        this._ipAddress = this.splitCidr(cidr)[0];
        this._signBits = parseInt(this.splitCidr(cidr)[1]);
        this._subnet = this.formSubnet();
    }

    /**
     * The IP address in the CIDR
     */
    public get ipAddress(): string {
        return this._ipAddress
    }

    /**
     * The subnet from the CIDR
     */
    public get subnet(): string {
        return this._subnet;
    }

    private splitCidr(cidr: string): string[] {
        const split = cidr.split('/');
        if (!split || split.length != 2) {
            throw new Error('Invalid CIDR: ' + cidr);
        }
        return split;
    }

    /**
     * Forms the subnet based on the significance bits
     * @returns The subnet mask as a string
     */
    private formSubnet(): string {
        let signBits: number = this._signBits;
        const netmask: number[] = [];

        // IP address has 32 bits
        for (let i: number = 32; i >= 0; i -= 8) {
            // Has to be here in case the significance is 32
            if (netmask.length == 4) {
                continue;
            }
            // If there are more than or equal to 8 significance bits the value of the segment is 255
            if (signBits >= 8) {
                netmask.push(255);
                signBits -= 8;;
            } else {
                // If there are less than 8 significance bits, we count the bits manually to find the host section of the netmask
                let hostBits = 0;
                for (let j = 1; j <= signBits; j++) {
                    // We start counting at 128: 256/(2^1) = 128
                    hostBits += 256 / (2 ** j);
                }
                signBits = 0;
                netmask.push(hostBits);
            }
        }

        return netmask.join('.');
    }
}