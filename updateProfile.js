const user_param=localStorage.getItem("user_id");

const updateProfile=()=>{
    // event.preventDefault();
    const parent = document.getElementById("form");
    console.log("hello");
    fetch(`https://astro-nexus-api.onrender.com/All_Users/${user_param}`)
    .then(res=>res.json())
    .then(data=>{
        const div= document.createElement("div");
        div.innerHTML=
        `
         <form action="" class="my-4 mx-10"  onsubmit="update(event)"  >
            <label class="input input-bordered flex items-center gap-2 my-3">
                 Username
                <input type="text" id="username" value="${data.username}"  class="grow" placeholder="" required />
              </label>
            <label class="input input-bordered flex items-center gap-2 my-3">
                 First Name
                <input type="text" id="first_name" value="${data.first_name}" class="grow" placeholder="" />
              </label>
            <label class="input input-bordered flex items-center gap-2 my-3">
                Last Name
                <input type="text" id="last_name" value="${data.last_name}" class="grow" placeholder="" />
              </label>
              <label class="input input-bordered flex items-center gap-2 my-3">
                Email
                <input type="email" id="email" value="${data.email}" class="grow" placeholder="" />
              </label>

              <label class="input input-bordered flex items-center gap-2 my-3">
                Bio
                <input type="text" id="bio" value="${data.bio}" class="grow" placeholder="" />
              </label>
              
              <button class="w-full bg-cyan-700 rounded-lg font-bold text-white p-2 my-3" type="submit" >Submit</button>
       
        </form>
        `
        parent.appendChild(div);
    })

    
}

const update=(event)=>{
    event.preventDefault();
    const username = document.getElementById("username").value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    const info = {
        first_name,
        last_name,
        username,
        email,
        bio,
      };
      console.log(info);

    fetch(`https://astro-nexus-api.onrender.com/All_Users/${user_param}`,{
        // mode: 'no-cors',
        method :"PUT",
        headers : {"content-type": "application/json"},
        body: JSON.stringify(info),
    })
    .then(res=>res.json())
    .then(data=>window.location.reload())
}

updateProfile();