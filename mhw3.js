const numResults=5;
let token_string;

function onJson(json){
console.log(json);
const section=document.querySelector('#results');
section.innerHTML='';
for(let i=0;i<numResults;i++) {
    console.log(json[i].title);
    const image=json[i].thumbnail;
    const descr=json[i].short_description;
    const elem=document.createElement('div');
    elem.classList.add('result_item');
    const img=document.createElement('img');
    const text=document.createElement('h3');
    img.src=image;
    text.textContent=descr;
    elem.appendChild(img);
    elem.appendChild(text); 
    section.appendChild(elem);
}

/*if(results.length == 0)
{
const err=document.createElement('h1');
const mess=document.createTextNode('Nessun elemento trovato');
err.appendChild(mess);
}*/
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    console.log(response);
    return response.json();
  }


function search(event){
    event.preventDefault();
    const element=document.querySelector('#genere').value;
    
      
        console.log('Eseguo ricerca su '+element);
        gen_request=api_endpoint + '?category=' + element + '&per_page' + numResults;
        console.log(gen_request);
        fetch(gen_request,{
             method: 'GET',
             headers: {

            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': '29102f0c69mshbd240a76318185ap1b5d79jsn4a301c052816',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
            
    },).then(onResponse).then(onJson);
        
    
}


const api_endpoint='https://free-to-play-games-database.p.rapidapi.com/api/games';

const form=document.querySelector('#free_game');
form.addEventListener('submit',search);


//Spotify API

const Spotify_URl="https://accounts.spotify.com/api/token";
const option = {
    method: 'POST',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
     },
     body:"grant_type=client_credentials&client_id=a38da46f5b5141f4ae4feffd21bd210e&client_secret=4312c3e73ee141c9bd55f39f61457372",
} 

function onResponseToken(response){
    console.log("Token ricevuto");
    console.log(response);
    if(!response){
        console.log("Errore,dati non ricevuti");
    }
    return response.json();
}


const boxes=document.querySelectorAll('.box');

function OnJsonSpotify(json){
    return json.tracks.items[0].external_urls.spotify;
}

async function OnJsonToken(json){
token_string=json.access_token;
for(box of boxes){
    const title=box.querySelector('strong').innerHTML;
    const searchURL='https://api.spotify.com/v1/search?q=' +title +'&type=track&market=it&limit=1&offset=1';
    const option={
        method:'GET',
        headers : {
            'Authorization': 'Bearer '+token_string,
        }
    }

    const elem=document.createElement('a');
    elem.href= await fetch(searchURL,option).then(onResponse).then(OnJsonSpotify);
    elem.innerHTML='Clicca per ascoltare la soundtrack di '+ title;
    box.appendChild(elem);
}
}

fetch(Spotify_URl,option).then(onResponseToken).then(OnJsonToken);






