const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

const loadarticles =()=>{
    const parent= document.getElementById("articleContainer");
    fetch('https://astro-nexus-api.onrender.com/Articles/')
    .then(res=>res.json())
    .then(data=> {
        data.forEach((info)=>{
    var div= document.createElement("div");
    div.classList.add('p-4','items-center');
    var user_param= localStorage.getItem("user_id");
    if (user_param=== null){
        div.innerHTML=`
        <div class="m-auto max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 items-center">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ${info.title}
          </h5>
        </a>
        <p class="line-clamp-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
         ${info.body}
        </p>
        <a 
          href="#" 
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg 
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 14 10"
          >
            <path 
              stroke="currentColor" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
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