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
    
    document.getElementById("signup-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
    
        // Get form field values
        const name = document.querySelector('input[placeholder="Enter your name"]').value;
        const lastName = document.querySelector('input[placeholder="Enter your last name"]').value;
        const dob = document.getElementById("dob").value;
        const gender = document.querySelector('input[name="gender"]:checked')?.nextElementSibling.textContent || "Not specified";
        const email = document.querySelector('input[placeholder="Enter your email"]').value;
        const username = document.querySelector('input[placeholder="Enter your username"]').value;
        const password = document.querySelector('input[placeholder="Enter password"]').value;
        const confirmPassword = document.querySelector('input[placeholder="Confirm password"]').value;
    
        // Basic form validation
        if (!name || !lastName || !dob || !email || !username || !password || !confirmPassword) {
          alert("Please fill in all required fields.");
          return;
        }
    
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
    
        // Storing data (for now, using local storage)
        const userData = {
          name,
          lastName,
          dob,
          gender,
          email,
          username,
          password
        };
    
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("Registration successful!");
    
        // Redirect to login page after registration
        window.location.href = "login.html";
      });

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
});