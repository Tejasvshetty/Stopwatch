function getClocks() {
    let clocks = [];
    let clocks_prime = [];
//    $(document.getElementsByClassName("clocks")).each(function () {
//         if (this.id) {
//             clocks.push(this.id);
//         }
//     });
   
    clocks_prime = document.getElementsByClassName("clocks")
    for (var i=0; i< clocks_prime.length; i++ ) {
        clocks.push(clocks_prime[i].id)
    }
    return clocks;

// }

// var ele = document.getElementsByClassName('translation_box');
// for (var i=0; i< ele.length; i++ ) {
//   alert(ele[i].id);
}


ids = getClocks()
let startBtn = []
let stopBtn = []
let resetBtn = []

let hour = {}; 
let hour_track = {};
let minute = {}; 
let minute_track = {};
let second = {}; 
let second_track = {};
let count = {}; 
let count_track = {};
let timer = {};
let oneTimerOn = true;
let time = {};
let start = {};

oneTimerOnElem = document.getElementById("oneTimer")

submit = document.getElementById("submit")


for (let i = 0; i<ids.length; i++){
    // Identifying all the start buttons
    startBtn.push(document.getElementById(ids[i]).getElementsByClassName("start"))
    stopBtn.push(document.getElementById(ids[i]).getElementsByClassName("stop"))
    resetBtn.push(document.getElementById(ids[i]).getElementsByClassName("reset"))

    // Identifying all the hour locations
    Object.assign(hour, {[ids[i]]: document.getElementById(ids[i]).getElementsByClassName("hr")})
    Object.assign(minute, {[ids[i]]: document.getElementById(ids[i]).getElementsByClassName("min")})
    Object.assign(second, {[ids[i]]: document.getElementById(ids[i]).getElementsByClassName("sec")})
    Object.assign(count, {[ids[i]]: document.getElementById(ids[i]).getElementsByClassName("count")})


    // Creating time variables for each id
    Object.assign(hour_track, {[ids[i]] : hour[ids[i]][0].innerText})
    if(hour[ids[i]][0].innerText.length<2){
        hour[ids[i]][0].innerText="0"+hour[ids[i]][0].innerText
    }
    Object.assign(minute_track, {[ids[i]] : minute[ids[i]][0].innerText})
    if(minute[ids[i]][0].innerText.length<2){
        minute[ids[i]][0].innerText="0"+minute[ids[i]][0].innerText
    }
    Object.assign(second_track, {[ids[i]] : second[ids[i]][0].innerText})
    if(second[ids[i]][0].innerText.length<2){
        second[ids[i]][0].innerText="0"+second[ids[i]][0].innerText
    }
    Object.assign(count_track, {[ids[i]] : count[ids[i]][0].innerText})
    if(count[ids[i]][0].innerText.length<2){
        count[ids[i]][0].innerText="0"+count[ids[i]][0].innerText
    }
    Object.assign(timer, {[ids[i]] : false})
}



for (let i = 0; i<ids.length; i++){
    stopBtn[i][0].addEventListener('click', updateTime);
    startBtn[i][0].addEventListener('click', startTime);
    resetBtn[i][0].addEventListener('click', resetTime); 
    stopBtn[i][0].addEventListener('touchstart', updateTime);
    startBtn[i][0].addEventListener('touchstart', startTime);
    resetBtn[i][0].addEventListener('touchstart', resetTime); 

    async function startTime(event){
        event.preventDefault();
        // alert("This works")
        if (oneTimerOn == false){
            if (timer[startBtn[i][0].parentNode.parentNode.id]){
                // do nothing, if start button already on
            }
            else{
                await getStartTime(startBtn[i][0].parentNode.parentNode.id)
                timer[startBtn[i][0].parentNode.parentNode.id] = true; 
                newStopWatch()
            }
        }

        else{
            Object.keys(timer).forEach(key => {
                try{
                    timer[key] = false; 
                    const response = fetch('/post/updateTime',{
                        method: 'put',
                        headers: {'Content-type': 'application/json'},  
                        body:JSON.stringify({
                            timerId: key,
                            hourUpdate: hour_track[key],
                            minuteUpdate: minute_track[key],
                            secondUpdate: second_track[key],
                            countUpdate: count_track[key]
                        })
                    })
        
                }
                catch(err){
                    console.log(err)
                }}),
                await getStartTime(startBtn[i][0].parentNode.parentNode.id)
                timer[startBtn[i][0].parentNode.parentNode.id] = true
                newStopWatch()
              }
        }

    async function resetTime(event){
        event.preventDefault();
        // alert("This works")
        timer[ids[i]] = false; 
        hour_track[ids[i]] = "00"; 
        minute_track[ids[i]] = "00"; 
        second_track[ids[i]] = "00"; 
        count_track[ids[i]] = "00"; 
        
        hour[ids[i]][0].innerHTML = "00";
        minute[ids[i]][0].innerHTML = "00";
        second[ids[i]][0].innerHTML = "00";
        count[ids[i]][0].innerHTML = "00";
        
        const response = await fetch('/post/updateTime',{
            method: 'put',
            headers: {'Content-type': 'application/json'},  
            body:JSON.stringify({
                timerId: resetBtn[i][0].parentNode.parentNode.id,
                hourUpdate: hour_track[resetBtn[i][0].parentNode.parentNode.id],
                minuteUpdate: minute_track[resetBtn[i][0].parentNode.parentNode.id],
                secondUpdate: second_track[resetBtn[i][0].parentNode.parentNode.id],
                countUpdate: count_track[resetBtn[i][0].parentNode.parentNode.id]
            })
        })
    }

    async function updateTime(event){
        event.preventDefault();
        // alert("This works")
        try{
            timer[stopBtn[i][0].parentNode.parentNode.id] = false; 
            const response = await fetch('/post/updateTime',{
                method: 'put',
                headers: {'Content-type': 'application/json'},  
                body:JSON.stringify({
                    timerId: stopBtn[i][0].parentNode.parentNode.id,
                    hourUpdate: hour_track[stopBtn[i][0].parentNode.parentNode.id],
                    minuteUpdate: minute_track[stopBtn[i][0].parentNode.parentNode.id],
                    secondUpdate: second_track[stopBtn[i][0].parentNode.parentNode.id],
                    countUpdate: count_track[stopBtn[i][0].parentNode.parentNode.id]
                })
            })
        }
        catch(err){
            console.log(err)
        }
            
    }


    async function test(event){
        event.preventDefault();
        try{
        //    alert("This works")
            }
        
        catch(err){
            console.log(err)
        }
    }
}



submit.addEventListener("click", async function(){
    if (document.getElementById("title").value == ""){
        alert("Enter a valid task")
        window.location.reload()
    }
    for (let i = 0; i<ids.length; i++){
        try{
            timer[stopBtn[i][0].parentNode.parentNode.id] = false; 
            const response = await fetch('/post/updateTime',{
                method: 'put',
                headers: {'Content-type': 'application/json'},  
                body:JSON.stringify({
                    timerId: stopBtn[i][0].parentNode.parentNode.id,
                    hourUpdate: hour_track[stopBtn[i][0].parentNode.parentNode.id],
                    minuteUpdate: minute_track[stopBtn[i][0].parentNode.parentNode.id],
                    secondUpdate: second_track[stopBtn[i][0].parentNode.parentNode.id],
                    countUpdate: count_track[stopBtn[i][0].parentNode.parentNode.id]
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }
})


oneTimerOnElem.addEventListener("click", changeTimer)

async function changeTimer(){
        if (oneTimerOn == false){
            oneTimerOn = true;
            oneTimerOnElem.innerText = "One Timer Off";
            for (let i = 0; i<ids.length; i++){
                try{
                    timer[stopBtn[i][0].parentNode.parentNode.id] = false; 
                    const response = await fetch('/post/updateTime',{
                        method: 'put',
                        headers: {'Content-type': 'application/json'},  
                        body:JSON.stringify({
                            timerId: stopBtn[i][0].parentNode.parentNode.id,
                            hourUpdate: hour_track[stopBtn[i][0].parentNode.parentNode.id],
                            minuteUpdate: minute_track[stopBtn[i][0].parentNode.parentNode.id],
                            secondUpdate: second_track[stopBtn[i][0].parentNode.parentNode.id],
                            countUpdate: count_track[stopBtn[i][0].parentNode.parentNode.id]
                        })
                    })
                }
                catch(err){
                    console.log(err)
                }
            }

        }
        else{
            oneTimerOn = false;
            oneTimerOnElem.innerText = "One Timer On";
            for (let i = 0; i<ids.length; i++){
                try{
                    timer[stopBtn[i][0].parentNode.parentNode.id] = false; 
                    const response = await fetch('/post/updateTime',{
                        method: 'put',
                        headers: {'Content-type': 'application/json'},  
                        body:JSON.stringify({
                            timerId: stopBtn[i][0].parentNode.parentNode.id,
                            hourUpdate: hour_track[stopBtn[i][0].parentNode.parentNode.id],
                            minuteUpdate: minute_track[stopBtn[i][0].parentNode.parentNode.id],
                            secondUpdate: second_track[stopBtn[i][0].parentNode.parentNode.id],
                            countUpdate: count_track[stopBtn[i][0].parentNode.parentNode.id]
                        })
                    })
                }
                catch(err){
                    console.log(err)
                }
            }

        }
    
}




async function getStartTime(entry){
    await fetch(`/post/getStart/${entry}`)
    .then(response => {
    // Check if the response status is OK (200)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Assuming the response is JSON, use response.json()
    return response.json();
    })
    .then(data => {
    // Now you can work with the data
    start_time = data;
    })
    .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
    });
    
    Object.assign(time, {[entry] : start_time})
    var startingTimer = (new Date()).valueOf() -  time[entry].hour*1000*60*60 - time[entry].minute*1000*60 - time[entry].second*1000 - time[entry].count
    Object.assign(start, {[entry] : startingTimer})        


    const response = await fetch('/post/updateTime',{
        method: 'put',
        headers: {'Content-type': 'application/json'},  
        body:JSON.stringify({
            timerId: entry,
            hourUpdate: hour_track[entry],
            minuteUpdate: minute_track[entry],
            secondUpdate: second_track[entry],
            countUpdate: count_track[entry]
        })
    })
    return 
}


const myWorker = new Worker('worker.js')

function newStopWatch(){
    alert("We are here in stopwatch")
    var next = false;
    myWorker.postMessage({ids: ids, hour_track: hour_track, minute_track:minute_track, second_track: second_track, count_track: count_track, timer: timer, start: start})
    myWorker.onmessage = function(event){
        hour_track = event.data.hour_track
        minute_track = event.data.minute_track
        second_track = event.data.second_track
        count_track = event.data.count_track

    }
    updateUI()

    for (let i = 0; i<ids.length; i++){
        if (timer[ids[i]]){
            next = true
            break
        }
    }

    if (next){
        setTimeout(newStopWatch, 1);
    }    
}

function updateUI(){
    for (let i = 0; i<ids.length; i++){
        let hrString = hour_track[ids[i]]; 
        let minString = minute_track[ids[i]]; 
        let secString = second_track[ids[i]]; 
        let countString = count_track[ids[i]]; 
    
    if (hour_track[ids[i]] < 10 && String(hrString).length<2) { 
        hrString = "0" + hrString; 
    } 

    if (minute_track[ids[i]] < 10 && String(minString).length<2) { 
        minString = "0" + minString; 
    } 

    if (second_track[ids[i]] < 10 && String(secString).length<2) { 
        secString = "0" + secString; 
        
    } 

    if (count_track[ids[i]] < 10 && String(countString).length<2) { 
        countString = "0" + countString; 
    } 


    var check = (+hour[ids[i]][0].innerHTML)*1000*60*60 + (+minute[ids[i]][0].innerHTML)*1000*60 + (+second[ids[i]][0].innerHTML)*1000 + (+count[ids[i]][0].innerHTML)


    hour[ids[i]][0].innerHTML = hrString;
    minute[ids[i]][0].innerHTML = minString;
    second[ids[i]][0].innerHTML = secString;
    count[ids[i]][0].innerHTML = countString;

    
    }
}



