const loader = document.querySelector('.center'); // center the parent name as you see it in the tuto
// window.addEventListener('load', () =>{    // add the load event
function timeout(){    // add the load event
loader.classList.add('end-loader'); // create a class loader with css and add it
location.replace("index.html");
}

setTimeout(function () {
    timeout();
  }, 2000);

//  Exemple : 
