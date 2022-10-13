const navmenu=document.querySelector(".navmenu");
    navmenu.addEventListener("click",()=>{
      const header=document.querySelector(".heading");
      header.classList.toggle("active");
    })