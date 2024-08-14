document.addEventListener("DOMContentLoaded",function(){
    const loginForm=document.getElementById("login-form");
    const registerForm=getElementById("register-form");
    if(loginForm){
        loginForm.addEventListener("submit",function(event){
            event.preventDefault();
            alert("Login submitted");
        });
    }
    if(registerForm){
        loginForm.addEventListener("submit",function(event){
            event.preventDefault();
            alert("Registration submitted");
        });
    }

    const registerLink=document.querySelector(".register-link a");
    

    if(registerLink){
        registerLink.addEventListener("click",function(event){
            event.preventDefault();
            alert("register.html");
        });
    }
    

    function handleResize(){
        const windowDivs=document.querySelectorAll(".window");
        windowDivs.forEach(windowDivs =>{
            if(window.innerWidth<768){
                windowDivs.classList.add("responsive");
            }
            else{
                windowDivs.classList.remove("responsive");
            }
        });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on load
})