const user_param=localStorage.getItem("user_id");

const loadProfile=()=>{
    fetch(`https://astro-nexus-api.onrender.com/All_Users/${user_param}`)
    .then((res)=>res.json())
    .then((data)=>{

        document.getElementById("profileName").innerText=data.first_name+ " " + data.last_name;
        document.getElementById("username").innerText="@"+ data.username;
        document.getElementById("bio").innerText= data.bio ;
        


    })
}
loadProfile();

const loadMyPost=(event)=>{
    parent= document.getElementById("profileCards");
    parent.innerHTML=``;
    fetch(`https://astro-nexus-api.onrender.com/Articles/?author_id=${user_param}`)
    .then(res=>res.json())
    .then(data=> {
        
       if(data.length===0){
        var div= document.createElement("div");
        div.classList.add('p-4','items-center');
        div.innerHTML=`
        <h1 class="text-center text-white text-2xl my-3" >🚫You haven't published any articles yet</h1>
        `
        parent.appendChild(div);
       }
       else{
        data.forEach((info)=>{
            var div= document.createElement("div");
            div.classList.add('p-4','items-center');
            div.innerHTML=`
                 <div class="card lg:card-side shadow-xl w-9/12 lg:w-3/4 m-3">
    <figure class="w-full h-64 lg:h-auto">
        <img src="${info.image}" class="object-cover w-full h-full m-auto" alt="Album">
    </figure>
    <div class="card-body">
        <h2 class="card-title text-2xl text-white hover:text-cyan-400"><a href="authenticatedDetails.html?id=${info.id}">${info.title}</a></h2>
        <h2 class="text-sm text-white"> Posted by ${info.author}</h2>
        <p class="text-white text-sm">${info.body}</p>
        <button class="bg-slate-800 text-white p-2 rounded-lg"  >Edit Article</button>
    </div>
</div>
        
            `
            parent.appendChild(div);
                });
       }
    })

}

const likedPosts=()=>{
    parent= document.getElementById("profileCards");
    parent.innerHTML=``;
    fetch(`https://astro-nexus-api.onrender.com/Likes/?user_id=${user_param}`)
    .then(res=>res.json())
    .then(data=> {
        console.log(data);
        console.log(user_param);
      if(data.length===0){
        var div= document.createElement("div");
        div.classList.add('p-4','items-center');
        div.innerHTML=`
        <h1 class="text-center text-white text-2xl my-3" >🚫You haven't liked any articles yet</h1>
        `
        parent.appendChild(div);

      }
      else{
        if(data.length===0){
            var div= document.createElement("div");
            div.classList.add('p-4','items-center');
            div.innerHTML=`
            <h1 class="text-center text-white text-2xl my-3" >🚫You haven't published any articles yet</h1>
            `
            parent.appendChild(div);
           }
           else{
            data.forEach((info)=>{
                var div= document.createElement("div");
                div.classList.add('p-4','items-center');
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
                parent.appendChild(div);
                    });
           }
      }
    })
}

const Post=(event)=>{
    event.preventDefault();
    title= document.getElementById("title").value;
    image= document.getElementById("image").value;
    body= document.getElementById("body").value;
    // const info={
    //     title,
    //     body,
    //     image,
    //     user_param,
    // }
    // console.log(info);
    fetch("https://astro-nexus-api.onrender.com/Articles/",{
        method :"POST",
        headers : {"content-type": "application/json"},
        body: JSON.stringify({"title":title, "image": image, "body": body, "author":user_param}),
    })
    .then(res=>res.json())
    .then(data=>{
        console.log("Posted");
        console.log(data);
    })
    
}

const updateProfile=()=>{
    // event.preventDefault();
    const parent = document.getElementById("form");

    fetch(`https://astro-nexus-api.onrender.com/All_Users/${user_param}`)
    .then(res=>res.json())
    .then(data=>{
        const div= document.createElement("div");
        div.innerHTML=
        `
         <form action="" class="my-4 mx-10"  onsubmit="updateProfile(event)"  >
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
              
              <button class="w-full bg-cyan-400 rounded-lg font-bold text-white p-2 my-3" onclick="modal.showModal()" type="submit" >Sign in</button>
       
        </form>
        `
        parent.appendChild(div);
    })

    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const bio = getValue("bio");

    fetch(`https://astro-nexus-api.onrender.com/All_Users/${user_param}`,{
        method :"PUT",
        headers : {"content-type": "application/json"},
        body: JSON.stringify(info),
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
}
