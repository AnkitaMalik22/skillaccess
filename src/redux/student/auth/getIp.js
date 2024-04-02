// Make an HTTP GET request to an IP echo service
const getIp = async () => {


    let ipAddress= ''   ;
  await fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    // Extract the IP address from the response
   ipAddress = data.ip;
    console.log('User IP address:', ipAddress);
    return ipAddress;
  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });

    return ipAddress;


}

export default getIp;