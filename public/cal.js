const input = document.querySelector(".ip");
let string = "";
const buttons = document.querySelectorAll(".btn");
Array.from(buttons).forEach((button) => {
    button.addEventListener("click", (e) => {
        
        if (e.target.innerHTML == "=") {
            string = string + input.value;
            string = eval(string);
            input.value = string;

        }
        else if (e.target.innerHTML == "C") {
            string = "";
            input.value = string;
        }
        else{
            input.value += "" + e.target.innerHTML;
        }
    })
})
input.addEventListener("keypress",(e)=>{
    console.log(e.key)
    if (e.key == "Enter") {
        console.log("inside enter")
        string = string + input.value;
        console.log(string)
        string = eval(string);
        input.value = string;
        string="";

    }
   
    else{
        input.value += "" + e.target.innerHTML;
    }
})