"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkTools = void 0;
var node_os_1 = require("node:os");
var IpAnalyser_1 = require("./IpAnalyser");
var CIDR_1 = require("./CIDR");
/**
 * Analyses the network interfaces on the machine.
 * @returns Found non-internal IPv4 interfaces
 */
function analyseNetworkInterfaces() {
    var interfaces = (0, node_os_1.networkInterfaces)();
    var keys = Object.keys(interfaces);
    var foundInterfaces = [];
    for (var i = 0; i < keys.length; i++) {
        var networkInterface = interfaces[keys[i]];
        if (!networkInterface) {
            throw new Error();
        }
        for (var j = 0; j < (networkInterface === null || networkInterface === void 0 ? void 0 : networkInterface.length); j++) {
            var ni = networkInterface[j];
            if (ni.family == "IPv6" || ni.internal) {
                continue;
            }
            foundInterfaces.push(ni);
        }
    }
    return foundInterfaces;
}
function networkTools(ipAddress, subnet) {
    var ip = {
        ipAddress: "",
        subnet: "",
        broadcast: "",
        network: ""
    };
    var ipa;
    return new Promise(function (resolve, reject) {
        if (ipAddress && subnet) {
            try {
                ipa = new IpAnalyser_1.default(ipAddress, subnet);
                return resolve({
                    ipAddress: ipAddress,
                    subnet: subnet,
                    broadcast: ipa.getBroadcastAddress(),
                    network: ipa.getNetworkAddress()
                });
            }
            catch (err) {
                return reject(err);
            }
        }
        if (ipAddress && !subnet) {
            try {
                var cidr = new CIDR_1.default(ipAddress);
                ipa = new IpAnalyser_1.default(cidr.ipAddress, cidr.subnet);
                resolve({
                    ipAddress: cidr.ipAddress,
                    subnet: cidr.subnet,
                    broadcast: ipa.getBroadcastAddress(),
                    network: ipa.getNetworkAddress()
                });
            }
            catch (err) {
                reject(err);
            }
        }
        if (!ipAddress) {
            try {
                var interfaces = analyseNetworkInterfaces();
                if (!interfaces || interfaces.length <= 0) {
                    reject(new Error("Can't find network interfaces. Provide an IP address and subnet mask"));
                }
                ip = [];
                for (var i = 0; i < interfaces.length; i++) {
                    var networkInterface = interfaces[i];
                    ipa = new IpAnalyser_1.default(networkInterface.address, networkInterface.netmask);
                    ip.push({
                        ipAddress: networkInterface.address,
                        subnet: networkInterface.netmask,
                        broadcast: ipa.getBroadcastAddress(),
                        network: ipa.getNetworkAddress()
                    });
                }
                resolve(ip);
            }
            catch (err) {
                reject(err);
            }
        }
    });
}
exports.networkTools = networkTools;
