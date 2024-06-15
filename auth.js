const getValue=(id)=>{
    value= document.getElementById(id).value;
    return value;
}

const handleRegister=(event)=>{
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const bio = getValue("bio");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
        first_name,
        last_name,
        username,
        email,
        bio,
        password,
        confirm_password,
      };
      console.log(info);
    
        fetch("https://astro-nexus-api.onrender.com/users/register/",{
            method :"POST",
            headers : {"content-type": "application/json"},
            body: JSON.stringify(info),
        })
        .then((res)=>res.json())
        .then((data) => {
            console.log(data);
            if(data==="Please Check Your Email"){

                document.getElementById("submitError").innerHTML=``;
                document.getElementById("submitError").innerText=data;
            }
            else{

                document.getElementById("submitError").innerText=data["email"];
            }
        })
    };


const handleLogin = (event) =>{
        event.preventDefault();
        const email= getValue('loginEmail')
        const password= getValue('loginPassword')
        const LoginInfo={
            email,
            password,
        }
        fetch("https://astro-nexus-api.onrender.com/users/login/",{
            method :"POST",
            headers : {"content-type": "application/json"},
            body: JSON.stringify(LoginInfo),
        })
        .then((res)=>res.json())
        .then((data)=> {
            console.log("hello");
            console.log(data.token);
            if (data.token && data.user_id){
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                window.location.href = "dashboard.html" ;
                
            }
            else if(data.token===undefined){
                document.getElementById("error").innerText= data
            }
            else{
                document.getElementById("error").innerText= data
            }
        });
    
        
    };
    
const handlelogout=()=>{
        fetch(`https://astro-nexus-api.onrender.com/users/logout`)
        // .then((res)=>res.json())
        .then(()=>localStorage.clear())
        .then(()=>window.location.href= "index.html");
        
    }

