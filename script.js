let secondsNumber = document.querySelector('.secondsNumber');
let tensNumber = document.querySelector('.tensNumber');

let startBtn = document.querySelector('.startOrPauseTimer');
let stopBtn = document.querySelector('.stopTimer');
let resetBtn = document.querySelector('.reset');
let finalTime = document.querySelector('.stoppedTime');

startBtn.addEventListener('click', startOrPauseTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', reset);

let seconds = 0, tens = 0;
let secondsInterval, tensInterval;

let started = false;


function clearAllIntervals() {
    clearInterval(secondsInterval);
    clearInterval(tensInterval);
}


function updateSecondsVal() {
    if(seconds <= 9){
        secondsNumber.innerHTML = '0' + seconds;
    }
    else{
        secondsNumber.innerHTML = seconds; 
    }
}


function startOrPauseTimer() {
    stopBtn.classList.remove('hidden');

    if(started){ // If timer started, this time pause func is called
        clearAllIntervals();
        started = false;
        return;
    }

    started = true;
    secondsInterval = setInterval(()=>{
        // seconds++;
        updateSecondsVal();
    }, 1000);


    tensInterval = setInterval(()=>{
        tens++; 
        if(tens >= 99){
            seconds++;
            tens = 0;
            updateSecondsVal();
        }

        if(tens <= 9){
            tensNumber.innerHTML = '0' + tens;
        }
        else{
            tensNumber.innerHTML = tens; 
        }
    }, 10);

}


function reset() {
    clearAllIntervals();
    started = false;

    seconds = 0, tens = 0;
    secondsNumber.innerHTML = '00'; 
    tensNumber.innerHTML = '00'; 

    startBtn.classList.remove('hidden');
    finalTime.innerHTML = '';
    finalTime.classList.add('hidden');
    stopBtn.classList.add('hidden');
}


function stopTimer() {
    clearAllIntervals();

    startBtn.classList.add('hidden');
    finalTime.classList.remove('hidden');
    finalTime.innerHTML = 'The final elapsed time is ' + seconds + ':' + tens;
}