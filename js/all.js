$(document).ready(function () {
    $(".heart").click(function(){
        event.stopPropagation();
        $(this).find("i").toggleClass("fas");
    })
})

var allsongs = [
    {
        name: 'Intro',
        src: 'music/Intro.mp3',
        singer:'Ariana Grande'
    },
    {
        name: 'Problem',
        src: 'music/Problem.mp3',
        singer: 'Ariana Grande (Ft. Iggy Azalea)'
    },
    {
        name: 'One Last Time',
        src: 'music/OneLastTime.mp3',
        singer: 'Ariana Grande'
    },
    {
        name: 'Why Try',
        src: 'music/WhyTry.mp3',
        singer: 'Ariana Grande'
    },
    {
        name: 'Break Free',
        src: 'music/BreakFree.mp3',
        singer: 'Ariana Grande (Ft. Zedd)'
    },
    {
        name: 'Best Mistake',
        src: 'music/BestMistake.mp3',
        singer: 'Ariana Grande (featuring Big Sean)'
    },
    {
        name: 'Be My Baby',
        src: 'music/BeMyBaby.mp3',
        singer: 'Ariana Grande (featuring Cashmere Cat)'
    },
    {
        name: 'Break Your Heart Right Back',
        src: 'music/BreakYourHeartRightBack.mp3',
        singer: 'Ariana Grande (featuring Childish Gambino)'
    },
    {
        name: 'Love Me Harder',
        src: 'music/LoveMeHarder.mp3',
        singer: 'Ariana Grande (with The Weeknd)'
    },
    {
        name: 'Just a Little Bit of Your Heart',
        src: 'music/JustaLittleBitofYourHeart.mp3',
        singer: 'Ariana Grande'
    },
    {
        name: 'Hands On Me',
        src: 'music/HandsOnMe.mp3',
        singer: 'Ariana Grande'
    }, 
    {
        name: 'My Everything',
        src: 'music/MyEverything.mp3',
        singer: 'Ariana Grande'
    }
];
var audio = new Audio();
var index = 0;

setAudio(index);
$('.song-title').click(function(e){
  
    $(this).parent().addClass('table-active').siblings().removeClass('table-active');
    index = $("table tbody > tr").index($(this).parent());
    setAudio(index);
    audio.play();
})

function setAudio (index){
    audio.dataset.songName = allsongs[index].name;
    audio.dataset.singer = allsongs[index].singer;
    audio.src = allsongs[index].src;
}

let progress = document.querySelector('.progress');
let playButton = document.querySelector('.playSong');
let playButtonIcon = playButton.querySelector('i');
let mobPlayButton = document.querySelector('.mobPlaySong');
let mobPlayButtonIcon = mobPlayButton.querySelector('i');
let progressBar = progress.querySelector('.progress-bar');
let mouseDown = false;
let shuffle = false;
$(".play").click(function(){
    index =0;
    setAudio(index);
    $("table tbody > tr").eq(index).addClass('table-active').siblings().removeClass('table-active');
    audio.play();
});
$('.repeat').click(function(){
    if(shuffle)return;
    if (audio.loop == false) { audio.loop = true }
    else { audio.loop = false };
    console.log("loop:"+audio.loop)
    $(this).toggleClass('clickActive');
});
$('.shuffle').click(function(){
    if (audio.loop == true )return;
    if (shuffle == false) { shuffle = true }
    else { shuffle = false };
    console.log("S:"+shuffle)
    $(this).toggleClass('clickActive');
})
$('.preSong').click(function (){
    if(index == 0)return;
    index --;
    setAudio(index);
    audio.play();
    $("table tbody > tr").eq(index).addClass('table-active').siblings().removeClass('table-active');
});
$('.nextSong').click(function () { 
    if (index == 11) return;
    index++
    setAudio(index);
    audio.play();
    $("table tbody > tr").eq(index).addClass('table-active').siblings().removeClass('table-active');
});
playButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});
mobPlayButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

audio.addEventListener('play', function (e) {
    playButtonIcon.className = 'fas fa-pause';
    mobPlayButtonIcon.className = 'fas fa-pause';
    $('.song-name').text(e.target.dataset.songName);
    $('.singer').text(e.target.dataset.singer);
    
});

audio.addEventListener('pause', function () {
    playButtonIcon.className = 'fas fa-play';
    mobPlayButtonIcon.className = 'fas fa-play';
});

audio.addEventListener('timeupdate', function () {
    if (mouseDown) return;

    let p = audio.currentTime / audio.duration;
    // $('.startTime').text(Math.floor(audio.currentTime));
    progressBar.style.width = p * 100 + '%';
    var cutTime = audio.duration - audio.currentTime;
    var cutMin = Math.floor(cutTime/ 60) % 60;
    var cutSec = Math.floor(cutTime % 60);
    var cutSecStr = cutSec.toString().length === 1 ? '0' + cutSec : cutSec;
    var min = Math.floor(audio.currentTime / 60) % 60;
    var sec = Math.floor(audio.currentTime % 60);
    var secStr = sec.toString().length === 1 ? '0' + sec : sec;
    $('.startTime').html(min + ":" + secStr);
    $('.restTime').html("-" + cutMin + ":" + cutSecStr);

});
audio.addEventListener('ended', playEndedHandler, false); 
// audio.loop = false;//禁止循環，否則無法觸發ended事件 

function playEndedHandler() {
    if (shuffle) {
        index = Math.floor((Math.random() * allsongs.length));
        setAudio(index);
        $("table tbody > tr").eq(index).addClass('table-active').siblings().removeClass('table-active');
        audio.play();
        return;
    }
    index++;
    if(index == allsongs.length){
        index = 0;
        setAudio(index);
        $('.song-name').text(allsongs[index].name)
        $('.singer').text(allsongs[index].singer)
        $("table tbody > tr").eq(index).addClass('table-active').siblings().removeClass('table-active');
        return;
    }
    
    setAudio(index);
    audio.play();
    $("table tbody > tr").eq(index).addClass('table-active').siblings().removeClass('table-active');
    
    
} 

//滑動 progress
function clamp(min, val, max) {
    return Math.min(Math.max(min, val), max);
}

function getP(e) {
    let p = (e.clientX - progress.offsetLeft) / progress.clientWidth;
    p = clamp(0, p, 1);

    return p;
}

progress.addEventListener('mousedown', function (e) {
    mouseDown = true;

    let p = getP(e);

    progressBar.style.width = p * 100 + '%';
});

window.addEventListener('mousemove', function (e) {
    if (!mouseDown) return;

    let p = getP(e);

    progressBar.style.width = p * 100 + '%';
});

window.addEventListener('mouseup', function (e) {
    if (!mouseDown) return;

    mouseDown = false;

    let p = getP(e);

    progressBar.style.width = p * 100 + '%';

    audio.currentTime = p * audio.duration;
});


//VOLUME BAR
//volume bar event
$('.volume i').click(function () {
    audio.muted = !audio.muted;
    if (audio.muted){updateVolume(0)}
    else { updateVolume(100,1)}
    return false;
});

var volumeDrag = false;
$('.volumeBar').on('mousedown', function (e) {
    volumeDrag = true;
    audio.muted = false;
    $('.volume i').removeClass('muted');
    updateVolume(e.pageX);
});
$(document).on('mouseup', function (e) {
    if (volumeDrag) {
        volumeDrag = false;
        updateVolume(e.pageX);
    }
});
$(document).on('mousemove', function (e) {
    if (volumeDrag) {
        updateVolume(e.pageX);
    }
});
var updateVolume = function (x, vol) {
    var volume = $('.volumeBar');
    var percentage;
    //if only volume have specificed
    //then direct update volume
    if (vol) {
        percentage = vol * 100;
    } else {
        var position = x - volume.offset().left;
        percentage = 100 * position / volume.width();
    }

    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }

    //update volume bar and video volume
    $('.volumeBar-active').css('width', percentage + '%');
    audio.volume = percentage / 100;

    //change sound icon based on volume
    if (audio.volume == 0) {
        $('.volume i').removeClass('fa-volume-up').addClass('fa-volume-mute');
    } else {
        $('.volume i').removeClass('fa-volume-mute').addClass('fa-volume-up');
    }
    // if (audio.volume == 0) {
    //     $('.sound').removeClass('sound2').addClass('muted');
    // } else if (audio.volume > 0.5) {
    //     $('.sound').removeClass('muted').addClass('sound2');
    // } else {
    //     $('.sound').removeClass('muted').removeClass('sound2');
    // }
};

updateVolume(100, 1);