import ipaddr from 'ipaddr.js';

export function ipSafe(ipStr: string): boolean {
  try {
    const ip = ipaddr.parse(ipStr);
    if (!ip) {
      return false;
    }

    const kind = ip.kind();
    if (!kind || (kind !== 'ipv4' && kind !== 'ipv6')) {
      return false;
    }
    try {
      if (kind === 'ipv6') {
        return ipv6Safe(ip as ipaddr.IPv6);
      }

      return ipv4Safe(ip as ipaddr.IPv4);
    } catch (e) {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function ipv4Safe(ip: ipaddr.IPv4): boolean {
  const range = ip.range();

  // Reject private, link-local, loopback, or broadcast IPs
  if (['private', 'linkLocal', 'loopback', 'broadcast'].includes(range)) {
    return false;
  }

  // Reject special IPs like 0.0.0.0 and non-standard prefixes
  if (ip.toString() === '0.0.0.0') {
    return false;
  }

  return true;
}

function ipv6Safe(ip: ipaddr.IPv6): boolean {
  // If IPv6 address is mapped to an IPv4 address, ensure it's safe
  if (ip.isIPv4MappedAddress()) {
    const ipv4 = ip.toIPv4Address();
    return ipv4Safe(ipv4);
  }

  // Reject loopback, unspecified, link-local, or unique-local IPs
  const range = ip.range();
  if (['loopback', 'unspecified', 'linkLocal', 'uniqueLocal'].includes(range)) {
    return false;
  }

  return true;
}
