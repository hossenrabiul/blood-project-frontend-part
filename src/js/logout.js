 
const handlelogOut = () => {  
    const token = localStorage.getItem("token"); 

    console.log("logout working")
    fetch("https://blood-project.onrender.com/accounts/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => { 
        localStorage.removeItem("token");
        localStorage.removeItem("user_id"); 
        window.location.href = 'index.html'
      });
  };
  