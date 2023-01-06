import { networkInterfaces } from "node:os";
import IpAnalyser from './IpAnalyser';
import CIDR from "./CIDR";

declare interface IP {
    ipAddress: String,
    subnet: String,
    broadcast: String,
    network: String
}

/**
 * Analyses the network interfaces on the machine. 
 * @returns Found non-internal IPv4 interfaces
 */
function analyseNetworkInterfaces(): Array<any> {
    const interfaces = networkInterfaces();
    const keys: string[] = Object.keys(interfaces);
    const foundInterfaces = [];
    for (let i: number = 0; i < keys.length; i++) {
        const networkInterface = interfaces[keys[i]];
        if (!networkInterface) {
            throw new Error();
        }
        for (let j = 0; j < networkInterface?.length; j++) {
            const ni = networkInterface[j];
            if (ni.family == "IPv6" || ni.internal) {
                continue;
            }
            foundInterfaces.push(ni);
        }
    }
    return foundInterfaces;
}

export function networkTools(ipAddress?: string | null, subnet?: string | null): Promise<IP | IP[]> {
    let ip: IP | IP[] = {
        ipAddress: "",
        subnet: "",
        broadcast: "",
        network: ""
    }

    let ipa: IpAnalyser;

    return new Promise((resolve, reject) => {

        if (ipAddress && subnet) {
            try {
                ipa = new IpAnalyser(ipAddress, subnet);
                return resolve({
                    ipAddress: ipAddress,
                    subnet: subnet,
                    broadcast: ipa.getBroadcastAddress(),
                    network: ipa.getNetworkAddress()
                })
            } catch (err) {
                return reject(err);
            }
        }

        if (ipAddress && !subnet) {
            try {
                const cidr: CIDR = new CIDR(ipAddress);
                ipa = new IpAnalyser(cidr.ipAddress, cidr.subnet);
                resolve({
                    ipAddress: cidr.ipAddress,
                    subnet: cidr.subnet,
                    broadcast: ipa.getBroadcastAddress(),
                    network: ipa.getNetworkAddress()
                })
            } catch (err) {
                reject(err);
            }
        }

        if (!ipAddress) {
            try {
                const interfaces = analyseNetworkInterfaces();
                if (!interfaces || interfaces.length <= 0) {
                    reject(new Error(`Can't find network interfaces. Provide an IP address and subnet mask`));
                }
                ip = [];
                for (let i = 0; i < interfaces.length; i++) {
                    const networkInterface = interfaces[i];
                    ipa = new IpAnalyser(networkInterface.address, networkInterface.netmask);
                    ip.push({
                        ipAddress: networkInterface.address,
                        subnet: networkInterface.netmask,
                        broadcast: ipa.getBroadcastAddress(),
                        network: ipa.getNetworkAddress()
                    });
                }
                resolve(ip);
            } catch (err) {
                reject(err);
            }
        }
    });
}