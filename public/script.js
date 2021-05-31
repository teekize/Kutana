const socket = io.connect("/");

const videoGrid = document.getElementById("video-grid");

const myPeer = new Peer(undefined, {
    host: "/",
    port:"3001"
})

myPeer.on("open", id=>{

    socket.emit("join-room", ROOMID, id);
})

const myvideo =document.createElement("video");

myvideo.muted=true;

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    addVideoStream(myvideo, stream)

    myPeer.on("call", call=>{
        call.answer(stream)
        const video =document.createElement("video");
        call.on("stream", uservideoStream=>{
            addVideoStream(video, uservideoStream)
        })
    })

    socket.on("user-connected", userid=>{
        connectToNewUser(userid, stream)
    })
})


// socket.on("user-connected", userid=>{
//     console.log("Huyu user ameconnect to meeting yetu" + userid)
// })

function connectToNewUser(userid, stream){

    const call =myPeer.call(userid,stream)
    video =document.createElement("video");
    call.on("stream", uservideoStream=>{
        addVideoStream(video, uservideoStream)
    })

    call.on("close", ()=>{
        video.remove()
    })
}

function addVideoStream (video, stream){
    video.srcObject=stream;
    video.addEventListener("loadedmetadata", ()=>{
        video.play();
    })

    videoGrid.append(video)
}