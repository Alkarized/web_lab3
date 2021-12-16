window.onload = () =>{
    start_watch()
}

function start_watch(){
    let watch = document.getElementById("watch")
    let time = new Date()
    watch.innerText = time.getDate() + "." + time.getMonth() + "." + time.getFullYear() + " " + time.getHours()
        + ":" + time.getMinutes() + ":" + time.getSeconds();
    setInterval(()=>{
        start_watch();
    }, 10000)
}