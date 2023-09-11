// intialing variables
let songIndex = 0;
let audioElement = new Audio("files/songs/1.mp3"); //created a audio element to control audio
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const gif = document.getElementById('gif');
const progressBar = document.getElementById('progress-bar');
const songs = Array.from(document.getElementsByClassName('songs'));
const playSongButton = Array.from(document.getElementsByClassName('play-song-button'));
const pauseSongButton = Array.from(document.getElementsByClassName('pause-song-button'));
const songNameShow = document.getElementById('song-name-show');
const forwardButton = document.getElementById('forward-button');
const backwardButton = document.getElementById('backward-button');

const songList = [
    { name: "Heroes Tonight", filePath: "files/songs/1.mp3", coverPath: "files/cover/1.jpg", duration: "3:50" },
    { name: "Where we started", filePath: "files/songs/2.mp3", coverPath: "files/cover/2.jpg", duration: "2:33" },
    { name: "Why We Lose", filePath: "files/songs/3.mp3", coverPath: "files/cover/3.jpg", duration: "4:33" },
    { name: "Mortals", filePath: "files/songs/4.mp3", coverPath: "files/cover/4.jpg", duration: "4:27" },
    { name: "Blank", filePath: "files/songs/5.mp3", coverPath: "files/cover/5.jpg", duration: "3:28" },
    { name: "Matafaka", filePath: "files/songs/6.mp3", coverPath: "files/cover/6.jpg", duration: "3:28" },
    { name: "Sky High (Sped Up)", filePath: "files/songs/7.mp3", coverPath: "files/cover/7.jpg", duration: "4:33" },
    { name: "Hope", filePath: "files/songs/8.mp3", coverPath: "files/cover/8.jpg", duration: "3:50" },
    { name: "Force", filePath: "files/songs/9.mp3", coverPath: "files/cover/9.jpg", duration: "3:28" },
]

// updating files cover and names 
songList.forEach(function (obj, i) {
    document.getElementsByClassName('album-cover')[i].src = obj.coverPath;
    document.querySelectorAll(".songs > span")[i].innerHTML = obj.name;
    document.querySelectorAll(".songs > span")[i].nextElementSibling.firstElementChild.innerHTML = obj.duration;
    // document.querySelectorAll('.play-song-button')[i].previousElementSibling.innerHTML = audioElement.duration;

})

//Event listeners

// handle play pause button 
playButton.addEventListener('click', function () {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();

        gif.style.opacity = 1;
        playButton.classList.add('remove-it');
        pauseButton.classList.remove('remove-it');
        playSongButton[songIndex].parentElement.parentElement.classList.add('bold-it')

        document.getElementById(`${songIndex}`).classList.add('remove-it');
        document.getElementById(`${songIndex}`).nextElementSibling.classList.remove('remove-it');

    }
})
pauseButton.addEventListener('click', function () {
    if (audioElement.played || audioElement.currentTime >= 0) {
        audioElement.pause();
        gif.style.opacity = 0;
        pauseButton.classList.add('remove-it');
        playButton.classList.remove('remove-it');
        // playSongButton[songIndex].parentElement.parentElement.classList.remove('bold-it');
        
        document.getElementById(`${songIndex}`).classList.remove('remove-it');
        document.getElementById(`${songIndex}`).nextElementSibling.classList.add('remove-it');
    }
})

// handle progressbar
audioElement.addEventListener('timeupdate', function (element) {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})
progressBar.addEventListener('change', function () {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
})
// handle play song individual buttons
const makeAllPlay = () => {
    playSongButton.forEach(function (element) {
        element.classList.remove('remove-it');
        element.nextElementSibling.classList.add('remove-it');
        element.parentElement.parentElement.classList.remove('bold-it');
    })
}
playSongButton.forEach(function (element, i) {
    element.addEventListener('click', function (e) {
        makeAllPlay();

        songIndex = parseInt(e.target.id); // giving songs index 
        audioElement.src = `files/songs/${songIndex + 1}.mp3`;

        // audio.type = "audio/mp3";
        // audioElement.type = "audio/mp3";
        // audioElement.currentTime = 0;
        progressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);

        gif.style.opacity = 1;
        playButton.classList.add('remove-it');
        pauseButton.classList.remove('remove-it');
        audioElement.play();

        //song name update on player
        // songs.forEach(function(element) { // here songs is the songs class in index
        //     songNameShow.innerHTML = element.children[1].innerHTML
        // });
        songNameShow.innerHTML = e.target.parentNode.previousElementSibling.innerHTML;

        e.target.classList.add('remove-it');
        e.target.nextElementSibling.classList.remove('remove-it');

        e.target.parentElement.parentElement.classList.add('bold-it')

    })
})
// handle pause button individuals 
pauseSongButton.forEach((element) => {
    element.addEventListener('click', function (e) {
        gif.style.opacity = 0;
        playButton.classList.remove('remove-it');
        pauseButton.classList.add('remove-it');
        audioElement.pause();
        progressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);

        e.target.classList.add('remove-it');
        e.target.previousElementSibling.classList.remove('remove-it');

        // e.target.parentElement.parentElement.classList.add('bold-it')
    })
})

// handle forward button
forwardButton.addEventListener('click', function (element) {
    if (songIndex == 8) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `files/songs/${songIndex + 1}.mp3`;
    audioElement.play();
    playButton.classList.add('remove-it');
    pauseButton.classList.remove('remove-it');
    gif.style.opacity = 1;
    for (let i = 0; i < 9; i++) {
        // console.log(songList[i].filePath)
        if (songList[i].filePath == `files/songs/${songIndex + 1}.mp3`) {
            songNameShow.innerHTML = songList[i].name;
        }

    }
    makeAllPlay();
    playSongButton.forEach((element, i) => {
        document.getElementById(`${songIndex}`).classList.add('remove-it');
        document.getElementById(`${songIndex}`).nextElementSibling.classList.remove('remove-it');
        document.getElementById(`${songIndex}`).parentElement.parentElement.classList.add('bold-it')
    })

})
// Handle backward button
backwardButton.addEventListener('click', function () {
    if (songIndex == 0) {
        songIndex = 8;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `files/songs/${songIndex + 1}.mp3`;
    audioElement.play();
    playButton.classList.add('remove-it');
    pauseButton.classList.remove('remove-it');
    gif.style.opacity = 1;
    for (let i = 0; i < 9; i++) {
        // console.log(songList[i].filePath)
        if (songList[i].filePath == `files/songs/${songIndex + 1}.mp3`) {
            songNameShow.innerHTML = songList[i].name;
        }
    }
    makeAllPlay();
    playSongButton.forEach((element, i) => {
        document.getElementById(`${songIndex}`).classList.add('remove-it');
        document.getElementById(`${songIndex}`).nextElementSibling.classList.remove('remove-it');
        document.getElementById(`${songIndex}`).parentElement.parentElement.classList.add('bold-it');
    })
})