import React, { useState, useEffect } from "react";

export default function IpDisplay({ useIpv6 }) {
  const [ip, setIp] = useState(null);
  const [ipFetchError, setIpFetchError] = useState(null);

  useEffect(() => {
    function fetchIp(url) {
      fetch(url)
        .then((res) => res.json())
        .then((res) => setIp(res.ip))
        .catch(setIpFetchError);
    }

    if (useIpv6) fetchIp("https://api64.ipify.org?format=json");
    else fetchIp("https://api64.ipify.org?format=json");
  }, [setIp, setIpFetchError, useIpv6]);

  if (ipFetchError) {
    console.log(ipFetchError);
    return <p>Could not get IP (see console)</p>;
  }

  if (ip === null) return <p>Loading...</p>;

  return <p>{`IP address: ${ip}`}</p>;
}
