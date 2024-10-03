import ipaddr from 'ipaddr.js';

export function ipSafe(ipStr: string): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  let ip;
  try {
    ip = ipaddr.parse(ipStr);
  } catch (e) {
    return false; // Invalid IP address
  }

  if (!ip.kind() || (ip.kind() !== 'ipv4' && ip.kind() !== 'ipv6')) {
    return false;
  }
  try {
    if (ip.kind() === 'ipv6') {
      return ipv6Safe(ip as ipaddr.IPv6);
    }

    return ipv4Safe(ip as ipaddr.IPv4);
  } catch (e) {
    return false;
  }
}

function ipv4Safe(ip: ipaddr.IPv4): boolean {
  // Reject private, link-local, loopback, or network IPs
  if (ip.range() === 'private' || ip.range() === 'linkLocal' || ip.range() === 'loopback') {
    return false;
  }

  // Reject network or broadcast addresses
  // We assume /32 is for hosts, so /32 addresses are considered safe, others are not
  const subnetMask = ipaddr.IPv4.subnetMaskFromPrefixLength(32);
  if (!ip.match(subnetMask, 32) || ip.toString() === '0.0.0.0') {
    return false;
  }

  return true;
}

// Function to check if an IPv6 address is safe
function ipv6Safe(ip: ipaddr.IPv6): boolean {
  // If IPv6 address is mapped to an IPv4 address, ensure it's safe
  if (ip.isIPv4MappedAddress()) {
    const ipv4 = ip.toIPv4Address();
    return ipv4Safe(ipv4);
  }

  // Reject loopback, unspecified, link-local, or unique-local IPs
  if (
    ip.range() === 'loopback' ||
    ip.range() === 'unspecified' ||
    ip.range() === 'linkLocal' ||
    ip.range() === 'uniqueLocal'
  ) {
    return false;
  }

  // Assume /64 is for hosts in IPv6; others are not considered safe
  const subnetMask = ipaddr.IPv6.subnetMaskFromPrefixLength(64);
  if (!ip.match(subnetMask, 64)) {
    return false;
  }

  return true;
}
