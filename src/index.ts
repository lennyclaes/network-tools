import { networkInterfaces } from "node:os";
import IpAnalyser from './IpAnalyser';

const ip = "210.1.1.95";
const subnet = "255.255.255.224";

try {
    const ipa = new IpAnalyser(ip, subnet);
    console.log(ipa.getNetworkAddress());
    console.log(ipa.getBroadcastAddress());
} catch (err) {
    console.log(err);
}
