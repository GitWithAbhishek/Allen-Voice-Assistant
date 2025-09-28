const contacts = {
    "papa": "917355495778",
};

let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}
// window.addEventListener('load',()=>{
//     wishMe()
// })
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})
function takeCommand(message){
   voice.style.display="none"
    btn.style.display="flex"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir,what can i help you?")
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant ,created by Abhishek Sir")
    }
    else if (message.includes("play")) {
    let song = message.replace("play", "").trim();
    if (song.length === 0) {
        speak("Please tell me the name of the song you want to play.");
    } else {
        speak(`Searching for ${song} on YouTube...`);
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(song)}&type=video&maxResults=1&key=AIzaSyBsHCLvEh5qLCJo9nUfeGL332HAZv2Nic8`)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                let videoId = data.items[0].id.videoId;
                let videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                speak(`Playing ${song}`);
                window.open(videoUrl, "_blank");
            } else {
                speak("Sorry, I couldn't find that song.");
            }
        })
        .catch(error => {
            console.error("YouTube API Error:", error);
            speak("There was an error connecting to YouTube.");
        });
    }
}
else if (message.includes("open camera")) {
    speak("Opening your camera");
    window.open("camera://", "_blank"); // On mobile, browser security may restrict this
}

    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator..")
        window.open("calculator://")
    }



    else if(message.includes("time")){
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
      }
      
    else if (message.includes("thank you") || message.includes("thanks")) {
    speak("You're welcome, Sir. Always here to help.");
}
else if (message.includes("weather")) {
    speak("Opening your weather dashboard");
    window.open("Weather/index.html", "_blank");
}


    else{
        let finalText="this is what i found on internet regarding" + message.replace("shipra","") || message.replace("shifra","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("shipra","")}`,"_blank")
    }

}