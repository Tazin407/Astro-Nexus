const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });



const loadPlanets = () => {
    //the loading spinner
    var spinner = document.getElementById("spinner");
    spinner.innerHTML = `
        <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>`;

    const parent = document.getElementById("Planets");

    fetch('https://astro-nexus-api.onrender.com/planets/')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            parent.innerHTML = '';
            for(let i=0; i<data.length; i++){
                let info= data[i];
                const div = document.createElement("div");
                div.classList.add('max-w-sm', 'm-auto','lg:w-1/3','w-full',  'border', 'border-gray-200', 'rounded-lg', 'shadow', 'bg-gray-800', 'dark:border-gray-700');
                div.innerHTML = `
                    <a href="">
                        <img class="rounded-t-lg w-full h-48 object-cover" src="${info.Image}" alt="Planet Image" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">${info.Name || 'Planet Name'}</h5>
                        </a>
                        <p class="mb-3 line-clamp-3 font-normal text-white">
                            ${info.Description || 'Description not available.'}
                        </p>
                        <a href="${info.FullViewLink || '#'}" target="_blank" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>`;
                parent.appendChild(div);
            };
        })
        .catch(err => {
            console.error('Error fetching planets:', err);
            parent.innerHTML = `<p class="text-red-500">Failed to load planets. Please try again later.</p>`;
        })
        .finally(() => {
            spinner.innerHTML = '';
        });
};

const loadMissions=()=>{
    var Mspinner = document.getElementById("spinner");
    Mspinner.innerHTML = `
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>`;
    const parent = document.getElementById("MissionContainer");
    fetch('https://astro-nexus-api.onrender.com/mission/')
    .then(res=>res.json())
    .then(data=>{
        parent.innerHTML='';
        data.forEach(info => {
            const div= document.createElement("div");
            div.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'lg:w-3/4', 'm-3','flex', 'justify-center');
            div.innerHTML=`<div class="flex flex-col lg:flex-row border border-gray-200 rounded-lg shadow bg-gray-800 dark:border-gray-700">
    <figure class="lg:w-1/2 p-2">
        <img
            src="${info.Image}"
            alt="Mission Image"
            class="object-cover h-full sm:w-full rounded-l-lg"
        />
    </figure>
    <div class="flex flex-col justify-between p-5 lg:w-1/2">
        <a href="#">
            <h5 class="mb-2 text-2xl text-center font-bold tracking-tight text-white">${info.Title || 'Mission Name'}</h5>
        </a>
        <p class="mb-3 line-clamp-6 font-normal text-white">
            ${info.Description || 'Description not available.'}
        </p>
        <a
            href="${info.FullViewLink || '#'}" target="_blank"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <h1 class="text-center w-full" >Read More</h1>
        </a>
    </div>
</div>

      `
            parent.appendChild(div);
        });

    })
}

loadPlanets();
loadMissions();
// loadarticles();
