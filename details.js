const getAuthorName=(id)=>{
    fetch(`https://astro-nexus-api.onrender.com/All_Users/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        return data.first_name+' '+ data.last_name;
    })
};

const loadDetails=()=>{
    var param = new URLSearchParams(window.location.search).get("id");
    
    var parent= document.getElementById("detail-container");
    fetch(`https://astro-nexus-api.onrender.com/Articles/${param}`)
    .then(res=>res.json())
    .then((data)=>{
        print(data.author)
        string= getAuthorName(data.author)
            var div = document.createElement("div");
            div.classList.add("p-10");
            div.innerHTML=`
            <img class="w-full  rounded-lg" src="${data.image}" alt="">
                    <h1 class="text-3xl text-white my-3 font-semibold" >${data.title}</h1>
                    <h1 class="text-sm text-white my-3" >Posted by ${string} </h1>
                    <p class="text-xl text-white my-3" >${data.body}</p>
    
            `
            parent.appendChild(div);
            
            likeParent= document.getElementById("likes");
            likeParent.innerHTML=`
             <button onclick=postlike(${data.id}, event) class="btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Like
              </button><br>
              <small class="text-white m-2">${data.no_of_likes} Likes</small>
            `

        })
 
};

loadDetails();
const postlike=(id,event)=>{
    event.preventDefault();
    var user_param= localStorage.getItem("user_id");
    info={
        id,
        user_param,
    }
    console.log(info);
    if(user_param===null){
        window.location.href= "signupForm.html";
    }
    else{
        fetch(`https://astro-nexus-api.onrender.com/Likes/`, {
            method: "POST",
            headers: { "content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                 "article": id,
                 "user": user_param,
    
            }),
          })
          .then((res)=>res.json())
          .then((data)=>{
            console.log(data);
          })
    }

}