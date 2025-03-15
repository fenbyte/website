"use strict"
//time
const mytime = document.getElementById("mytime")
function updateTime(){
    mytime.innerText = new Date().toLocaleTimeString("en-GB", { timeZone: 'Europe/London' })
}
updateTime()
setInterval(updateTime,1000)

//lastfm
const apikey = "236fdaddc451194b5fa20e7df18ea950"
const username = "s16le"
const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apikey}&format=json&nowplaying=true&limit=1`
const lastfmLink = document.getElementById("lastfmlink")
const songTitle = document.getElementById("songtitle")
const songAlbum = document.getElementById("songalbum")
const songArtist = document.getElementById("songartist")
const coverArt = document.getElementById("coverart")

async function getCurrentTrack(){
    const request = await fetch(url)
    const json = await request.json()
    const currentTrack = json.recenttracks.track.find(song => song["@attr"]?.nowplaying === "true")
    if(currentTrack === undefined) return

    lastfmLink.href = currentTrack.url
    songTitle.innerText = currentTrack.name
    songAlbum.innerText = currentTrack.album["#text"]
    songArtist.innerText = currentTrack.artist["#text"]

    const size = (window.devicePixelRatio > 1) ? "large" : "medium"
    const image = currentTrack.image.find(img => img.size === size)
    coverArt.src = image["#text"]
}
getCurrentTrack()
