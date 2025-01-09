// TODO: user should get their nat type, ip and port
// fetch to some stun server, parse data etc

export class Client {
    constructor() {
    }

    /**
     * 
     * @param stun_host Server STUN host
     * @param stun_port STUN server's port to get data
     * @returns NAT type, IP and user's port 
     */

    async getNATData(stun_host="stun:stun.l.google.com", stun_port=19302) {
        const pc = new RTCPeerConnection({ iceServers: [
            {
                urls: `${stun_host}:${stun_port}`
            }
        ] });

        pc.createDataChannel('');
        pc.createOffer().then(offer => pc.setLocalDescription(offer));
        pc.onicecandidate = (ice) => {
            if(!ice || !ice.candidate || !ice.candidate.candidate) {
                console.log("all done");
                pc.close();
                return;
            }
            const split = ice.candidate.candidate.split(" ");
            if(split[7] === "host") {
                console.log("Local IP", split[4]);
            }  else {
                console.log("External IP", split[4]);
            }
        }
    }
}