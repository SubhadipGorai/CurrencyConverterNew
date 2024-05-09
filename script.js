const baseUrl="https://2024-03-06.currency-api.pages.dev/v1/currencies/";

const from=document.querySelectorAll("select");
const btn=document.querySelector("#convert");
const input=document.querySelector("input");
const fromCurr=document.querySelector("#fromCurr");
const line1=document.querySelector("#line1");
const line2=document.querySelector("#line2");
const line3=document.querySelector("#line3");
const line4=document.querySelector("#line4");
const output=document.querySelector(".output");
const arrow=document.querySelector("#arr");

for(let select of from){
    let codes;
    for(codes in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=codes;
        newOption.value=codes;
        if(codes==="USD" && select.name==="fromCurr"){
            newOption.selected="selected";
        }
        else if(select.name==="toCurr" && codes==="INR"){
            newOption.selected="selected";  
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        newSrc=`https://flagsapi.com/${countryList[evt.target.value]}/shiny/64.png`;
        let flag=select.parentElement.querySelector("img");
        flag.src=newSrc;
        btn.classList.remove("hide");
        output.classList.add("hide");
    })
}

input.addEventListener("click", ()=>{
    btn.classList.remove("hide");
    output.classList.add("hide");
})

arrow.addEventListener("click",(evt)=>{
    let temp=fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=temp;
    let fromFlag=document.querySelector(".fromCurr img");
    fromFlag.src=`https://flagsapi.com/${countryList[fromCurr.value]}/shiny/64.png`;
    let toFlag=document.querySelector(".toCurr img");
    toFlag.src=`https://flagsapi.com/${countryList[toCurr.value]}/shiny/64.png`;
    btn.classList.remove("hide");
    output.classList.add("hide");
})

const updateExchangeVal=async (amt,from,to)=>{
    let URL=`${baseUrl}${from}.json`;
    let data=await fetch(URL);
    let response=await data.json();
    let rate=response[from];
    let final=amt*rate[to];
    line1.innerText=`${amt} ${from.toUpperCase()} =`;
    line2.innerText=`${final} ${to.toUpperCase()}`;
    line3.innerText=`1 ${from.toUpperCase()} = ${rate[to]} ${to.toUpperCase()}`;
    let URL2=`${baseUrl}${to}.json`;
    let data2=await fetch(URL2);
    let response2=await data2.json();
    let rate2=response2[to];
    line4.innerText=`1 ${to.toUpperCase()} = ${rate2[from]} ${from.toUpperCase()}`;
}

btn.addEventListener("click", ()=>{
    let a=(fromCurr.value).toLowerCase();
    let b=(toCurr.value).toLowerCase();
    let finalAmount=updateExchangeVal(input.value,a,b);
    output.classList.remove("hide");
    btn.classList.add("hide");
})