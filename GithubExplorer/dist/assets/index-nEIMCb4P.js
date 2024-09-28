(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const c=document.querySelector(".repo"),p=document.querySelector(".repo-btn"),l=document.querySelector(".loader"),u=document.querySelector(".user-btn"),d=document.querySelector(".user"),i=document.querySelector(".error");p.addEventListener("click",()=>{m(c.value),c.value=""});u.addEventListener("click",()=>{f(d.value),d.value=""});async function m(n){l.style.display="block",i.style.display="none",document.querySelector(".details").innerHTML="";try{const s=await fetch(`https://api.github.com/search/repositories?q=${n}`);if(!s.ok)throw new Error("Failed to fetch repositories");const t=await s.json(),{items:o}=t;if(!o.length)throw new Error("No repositories found");o.forEach(e=>{document.querySelector(".details").innerHTML+=`
        <div class="data bg-[white] p-5 rounded-md">
          <div class="flex gap-3 items-center">
            <div class="rounded-full h-[60px]  overflow-hidden">
              <img class="w-full h-full" src=${e.owner.avatar_url} alt="">
            </div>
            <div class=" leading-1 overflow-hidden">
              <p class="owner text-sm">Owner: ${e.owner.login}</p>
              <div class="flex gap-3 items-center">
                <p class="repo-name text-[16px] font-semibold">${e.name}</p>
                <a class="w-4 transition-all" href=${e.html_url} target="_blank">
                  <img src="https://raw.githubusercontent.com/Angshu09/CodeClauseInternship/refs/heads/main/GithubExplorer/link.svg" alt="link">
                </a>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div><p class="description text-sm">
              ${e.description?e.description:"No Description"}</p></div>
            <div class="flex items-center flex-wrap gap-4 text-[10px] md:text-[12px] mt-2">
              <span>Forks: ${e.forks}</span>
              <span>Visibility: ${e.visibility}</span>
              <span>Watchers: ${e.watchers}</span>
              <span>Stars⭐: ${e.stargazers_count}</span>
              <span>Language : ${e.language?e.language:"Not Specified"}</span>  
            </div>
          </div>
        </div>
      `})}catch(s){console.error(s.message),i.style.display="block"}finally{l.style.display="none"}}async function f(n){l.style.display="block",i.style.display="none",document.querySelector(".details").innerHTML="";try{const s=await fetch(`https://api.github.com/users/${n}`);if(!s.ok)throw new Error("Failed to fetch user data");const t=await s.json();document.querySelector(".details").innerHTML=`
        <div class="data bg-white absolute left-1/2 -translate-x-1/2 p-4 sm:p-6 rounded-md w-[90%] sm:w-[600px] flex justify-center sm:justify-normal items-center sm:flex-row flex-col">
          <div class="w-[50%] sm:w-[30%] overflow-hidden rounded-full">
            <img class="h-full w-full" src=${t.avatar_url} alt="">
          </div>
          <div class="w-full sm:w-[70%] pt-7 sm:pt-0 sm:pl-7">
           <p><b>Name -</b> ${t.name}</p>
           <p><b>UserName -</b> ${t.login}</p>
           <p><b>Location -</b> ${t.location?t.location:"No Location"}</p>
           <p><b>Email -</b> ${t.email?t.email:"No Email"}</p>
           <p><b>Company -</b> ${t.company?t.company:"No Company"}</p>
           <p><b>Followers -</b> ${t.followers}</p>
           <p><b>Following -</b> ${t.following}</p>
           <p><b>Public Repos -</b> ${t.public_repos}</p>
          </div>
          <button class="absolute right-3 top-3">
            <a href=${t.html_url} target="_blank">
              <img src="https://raw.githubusercontent.com/Angshu09/CodeClauseInternship/refs/heads/main/GithubExplorer/link.svg" alt="search">
            </a>
          </button>
        </div>
    `}catch(s){console.error(s.message),i.style.display="block"}finally{l.style.display="none"}}
