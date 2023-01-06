"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IpAnalyser = /** @class */ (function () {
    function IpAnalyser(ipAddress, netmask) {
        this.ipLength = 4;
        this.bitmask = 255;
        this.ipAddress = this.splitIp(ipAddress);
        this.netmask = this.splitIp(netmask);
        this.wildcard = this.getWildcard();
    }
    IpAnalyser.prototype.splitIp = function (ipAddress) {
        var ipSegments = ipAddress.match(/[0-9]{1,3}/gi);
        if (!ipSegments || ipSegments.length != this.ipLength) {
            throw new Error('Invalid IP address: ' + ipAddress);
        }
        return ipSegments.map(function (segment) { return parseInt(segment); });
    };
    IpAnalyser.prototype.getWildcard = function () {
        var _this = this;
        return this.netmask.map(function (segment) { return segment ^ _this.bitmask; });
    };
    /**
     * Gets the IPv4 network address based on the IP address and subnet
     * @returns The networkaddress of the networksegment
     */
    IpAnalyser.prototype.getNetworkAddress = function () {
        var _this = this;
        var networkAddress = this.ipAddress.map(function (segment, i) {
            return segment & _this.netmask[i];
        });
        return networkAddress.join('.');
    };
    /**
     * Gets the IPv4 broadcast address based on the IP address and subnet
     * @returns The broadcastaddress of the networksegment
     */
    IpAnalyser.prototype.getBroadcastAddress = function () {
        var _this = this;
        var broadcastAddress = this.ipAddress.map(function (segment, i) {
            return segment | _this.wildcard[i];
        });
        return broadcastAddress.join('.');
    };
    return IpAnalyser;
}());
exports.default = IpAnalyser;
