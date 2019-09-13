// Vars
const listaTweets = document.getElementById('lista-tweets');

// Events
enventListeners(); // Ejecutar función

function enventListeners() {
  // Creando evento
  document.querySelector('#formulario').addEventListener('submit',
  agregarTweet);

  listaTweets.addEventListener('click', borrarTweet); // Borrar tweets
  
  document.addEventListener('DOMContentLoaded', localStorageListo); // contenido cargado
}
 
// functions
function agregarTweet(e) {
  e.preventDefault();  // Desactivar recarga

  const tweet = document.getElementById('tweet').value;  // Obtener valor ingresado en input
  const botonBorrar = document.createElement('a');  // Crear boton de eliminar
  botonBorrar.classList = 'borrar-tweet';
  botonBorrar.innerText = 'X';  // Inyectar el valor

  const li = document.createElement('li'); // Crear li donde sera inyectado el valor
  li.innerText = tweet; // Inyectar el valor
  
  li.appendChild(botonBorrar); // lugar en el cual el boton sera colocado
  listaTweets.appendChild(li); // lugar en el cual la información sera colocada
 
  agregarTweetLocalStorage(tweet); // Añadir a localStorage
}

function borrarTweet(e) { // Eliminar el tweet del DOM
  e.preventDefault();

  if (e.target.className === 'borrar-tweet') {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

function localStorageListo() { // Mostrar datos de localStorage en la lista
  let tweets;

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(tweet => {
    const botonBorrar = document.createElement('a'); // Crea elemento
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    const li = document.createElement('li'); // Crea elemento
    li.innerText = tweet;
    li.appendChild(botonBorrar); // Añade el botón de borrar al tweet
    listaTweets.appendChild(li); // Añade el tweet a la lista
  })
}

function agregarTweetLocalStorage(tweet) { // Agregar tweet en localStorage
  let tweets;
  tweets = obtenerTweetsLocalStorage();

  tweets.push(tweet); // Añadir el nuevo tweet
  localStorage.setItem('tweets', JSON.stringify(tweets)); // Convertir de String a Array para localStorage
}

function obtenerTweetsLocalStorage() {
  let tweets;
  if (localStorage.getItem('tweets') === null) { // Revisar valores de localStorage
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  } 
  return tweets;
}

function borrarTweetLocalStorage(tweet) { // Eliminar tweet de localStorage
  let tweets, tweetBorrar;
  tweetBorrar = tweet.substring(0, tweet.length - 1); // Eliminar la X del tweet

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach((tweet, index) => {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  })
  localStorage.setItem('tweets', JSON.stringify(tweets));
  console.log(tweets);
} 