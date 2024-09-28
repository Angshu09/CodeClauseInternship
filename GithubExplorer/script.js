const repoInput = document.querySelector(".repo");
const repoBtn = document.querySelector(".repo-btn");

repoBtn.addEventListener("click", () => {
  console.log(repoInput.value);
  searchRepo(repoInput.value);
  repoInput.value = ""
});

async function searchRepo(query) {
  document.querySelector(".details").innerHTML = "";
  const res = await fetch(
    `https://api.github.com/search/repositories?q=react`
  );
  const data = await res.json();
  const { items } = data;
  items.forEach((e) => {
    document.querySelector(".details").innerHTML =
      document.querySelector(".details").innerHTML +
      `
        <div class="data bg-[white] p-5 rounded-md mt-5">
          <div class="flex gap-3 items-center w-full">
            <div class="rounded-full w-[60px]  overflow-hidden"><img class="w-full h-full" src=${
              e.owner.avatar_url
            } alt=""></div>
            <div class=" leading-2 overflow-hidden">
              <p class="owner text-sm">Owner: ${e.owner.login}</p>
              <div class="flex gap-3">
                <p class="repo-name text-[16px] font-semibold">${e.name}</p>
                <a class="text-blue-500 transition-all" href=${e.html_url} target="_blank"><img src="link.svg" alt="link"></a>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div><p class="description text-sm">${
              e.description ? e.description : "No Description"
            }</p></div>
            <div class="flex items-center gap-4 text-sm mt-2">
              <span>Forks: ${e.forks}</span>
              <span>Visibility: ${e.visibility}</span>
              <span>Watchers: ${e.watchers}</span>
              <span>Stars⭐: ${e.stargazers_count}</span>
              <span>Language : ${e.language ? e.language : "Not Specified"}</span>  
            </div>
          </div>
            
        </div>
        `;
  });
  console.log(data);
}
