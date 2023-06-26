// popup.js

// Get the button element
// const button = document.getElementById('open-website');

// // Add a click event listener
// button.addEventListener('click', () => {
//   // Open the website in a new tab
//   chrome.tabs.create({ url: 'https://ourworldindata.org/air-pollution' });
// });

function handleClick(){
    fetch("https://type.fit/api/quotes")
        .then(response=>response.json())
        .then(data=>{
        let data_len=data.length;
    
        let req = Math.floor(Math.random()*data_len)
        let quote = data[req]
        document.getElementById("container1").innerHTML = `${quote.text} <br> -by ${quote.author}`;
        })
        .catch(error => {
        document.getElementById("container1").innerHTML = "Error retrieving the data"
        console.log(error)
        console.error("Error retrieving quotes data:", error);
        });
}
const element = document.getElementById('container1')
element.onclick=handleClick
