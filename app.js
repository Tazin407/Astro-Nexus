const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

const loadarticles =()=>{
    const parent= document.getElementById("articleContainer");
    console.log("hello");
    fetch('https://astro-nexus-api.onrender.com/Articles/')
    .then(res=>res.json())
    .then(data=> {
        data.forEach((info)=>{
            console.log(info);
    var div= document.createElement("div");
    div.classList.add('p-4','items-center');
    var user_param= localStorage.getItem("user_id");
    if (user_param=== null){
        console.log("hello");
        div.innerHTML=`
        <div class="card lg:card-side shadow-xl w-9/12 lg:w-3/4 m-3">
    <figure class="w-full h-64 lg:h-auto">
        <img src="${info.image}" class="object-cover w-full h-full m-auto" alt="Album">
    </figure>
    <div class="card-body">
        <h2 class="card-title text-2xl text-white hover:text-cyan-400"><a href="details.html?id=${info.id}">${info.title}</a></h2>
        <h2 class="text-sm text-white"> Posted by ${info.author}</h2>
        <p class="text-white text-sm">${info.body}</p>
    </div>
</div>

    `
    }
    else{

        div.innerHTML=`
        <div class="card lg:card-side shadow-xl w-9/12 lg:w-3/4 m-3">
    <figure class="w-full h-64 lg:h-auto">
        <img src="${info.image}" class="object-cover w-full h-full m-auto" alt="Album">
    </figure>
    <div class="card-body">
        <h2 class="card-title text-2xl text-white hover:text-cyan-400"><a href="authenticatedDetails.html?id=${info.id}">${info.title}</a></h2>
        <h2 class="text-sm text-white"> Posted by ${info.author}</h2>
        <p class="text-white text-sm">${info.body}</p>
    </div>
</div>

    `
    }
   
    parent.appendChild(div);
        });
    })

    

}
loadarticles();