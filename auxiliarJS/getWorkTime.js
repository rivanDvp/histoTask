export default (start_dates, pause_dates) => {
    if (start_dates.length !== pause_dates.length) {
        return start_dates.map(()=>0)
    }else{
        let timesInMin=[];
        let nStartDates=start_dates.length;
        let deltaTime=0;
        for(let i=0;i<nStartDates;i++){
            deltaTime=(pause_dates[i]-start_dates[i]);
            timesInMin.push(deltaTime);
        }
        return timesInMin
    }
}