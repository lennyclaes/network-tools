"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class CIDR
 * Given a CIDR value and extracts the subnet mask based on the significance bits
 */
var CIDR = /** @class */ (function () {
    /**
     * Creates a new instance of CIDR
     * @param cidr The IP address and significance bits
     * @example ```new CIDR("192.168.0.25/24")```
     */
    function CIDR(cidr) {
        this._subnet = "";
        this._ipAddress = this.splitCidr(cidr)[0];
        this._signBits = parseInt(this.splitCidr(cidr)[1]);
        this._subnet = this.formSubnet();
    }
    Object.defineProperty(CIDR.prototype, "ipAddress", {
        /**
         * The IP address in the CIDR
         */
        get: function () {
            return this._ipAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CIDR.prototype, "subnet", {
        /**
         * The subnet from the CIDR
         */
        get: function () {
            return this._subnet;
        },
        enumerable: false,
        configurable: true
    });
    CIDR.prototype.splitCidr = function (cidr) {
        var split = cidr.split('/');
        if (!split || split.length != 2) {
            throw new Error('Invalid CIDR: ' + cidr);
        }
        return split;
    };
    /**
     * Forms the subnet based on the significance bits
     * @returns The subnet mask as a string
     */
    CIDR.prototype.formSubnet = function () {
        if (this._signBits > 32) {
            throw new Error('Significance bits cannot be higher than 32, received: ' + this._signBits);
        }
        var signBits = this._signBits;
        var netmask = [];
        // IP address has 32 bits
        for (var i = 32; i >= 0; i -= 8) {
            // Has to be here in case the significance is 32
            if (netmask.length == 4) {
                continue;
            }
            // If there are more than or equal to 8 significance bits the value of the segment is 255
            if (signBits >= 8) {
                netmask.push(255);
                signBits -= 8;
                ;
            }
            else {
                // If there are less than 8 significance bits, we count the bits manually to find the host section of the netmask
                var hostBits = 0;
                for (var j = 1; j <= signBits; j++) {
                    // We start counting at 128: 256/(2^1) = 128
                    hostBits += 256 / (Math.pow(2, j));
                }
                signBits = 0;
                netmask.push(hostBits);
            }
        }
        return netmask.join('.');
    };
    return CIDR;
}());
exports.default = CIDR;
