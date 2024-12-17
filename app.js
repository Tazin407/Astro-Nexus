const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

const loadarticles =()=>{
    document.getElementById("spinner").innerHTML=`<span class="loading loading-infinity text-info"></span>`
    const parent= document.getElementById("articleContainer");
    fetch('https://astro-nexus-api.onrender.com/Articles/')
    .then(res => res.json())
    .then(data => {
        var lim = 0; // Start with 0
        
        for (let i = 0; i < data.length; i++) {
            const info = data[i];
            var div = document.createElement("div");
            div.classList.add('p-4', 'items-center');
            var user_param = localStorage.getItem("user_id");
            if (user_param){
                 div.innerHTML = `
                    <div class="w-full overflow-hidden items-center border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 bg-gray-800 object-cover">
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight dark:text-white text-white hover:text-sky-450 ">${info.title}</h5>
                            <p class="mb-3 line-clamp-2 font-normal text-gray-400">${info.body}</p>
                            <a href="details.html?id=${info.id}" class="text-cyan-400 dark:text-cyan-400"><button>Read more</button></a>
                        </div>
                    </div>
                `;
            }
            else{
                div.innerHTML = `
                     <div class="w-full overflow-hidden items-center border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 bg-gray-800 object-cover">
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight dark:text-white text-white hover:text-sky-450 ">${info.title}</h5>
                            <p class="mb-3 line-clamp-2 font-normal text-gray-400">${info.body}</p>
                            <a href="" class="text-cyan-400 dark:text-cyan-400"><button disabled>Sign in to read the full article</button></a>
                        </div>
                    </div>
                `;
            }
            parent.appendChild(div);
            lim++; 
            
            if (lim === 3 && window.location.href.includes("index.html")) {
                break; 
            }
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
    document.getElementById("spinner").innerHTML=``;


}
loadarticles();
