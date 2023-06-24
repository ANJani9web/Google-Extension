fetch('https://icanhazdadjoke.com/slack')
.then(data=> data.json())
.then(jokeData=>{
    const jokeTxt = jokeData.attachments[0].text;
    console.log(`Joke: ${jokeTxt}`);
    const jokeElement = document.getElementById('jokeId');
    jokeElement.innerText=jokeTxt;
})