self.onmessage = function(event) {
    var ids = event.data.ids
    var hour_track = event.data.hour_track
    var minute_track = event.data.minute_track
    var second_track = event.data.second_track
    var count_track = event.data.count_track
    var timer = event.data.timer
    var start = event.data.start
    stopWatch(ids, hour_track, minute_track, second_track, count_track, timer, start)
};


function stopWatch(ids, hour_track, minute_track, second_track, count_track, timer, start){
        for (let i = 0; i<ids.length; i++){
            if (timer[ids[i]]) { 
                var current_time = (new Date()).valueOf();
                var diff = current_time - start[ids[i]]
                var hours = Math.floor(diff/1000/60/60)
                var minutes = Math.floor(diff/1000/60)-hours*60;
                var seconds = Math.floor(diff/1000)-hours*3600-minutes*60;
                var counts = Math.floor(diff)-seconds*1000 - minutes*1000*60 - hours*1000*60*60
                hour_track[ids[i]] = hours;
                minute_track[ids[i]] = minutes;
                second_track[ids[i]] = seconds;
                count_track[ids[i]] = counts;
        }        
    }
    postMessage({hour_track: hour_track, minute_track:minute_track, second_track: second_track, count_track: count_track})
}

