const repoInput = document.querySelector(".repo");
const repoBtn = document.querySelector(".repo-btn");
const loader = document.querySelector(".loader");
const userBtn = document.querySelector(".user-btn");
const userInput = document.querySelector(".user");
const errorDiv = document.querySelector(".error");

repoBtn.addEventListener("click", () => {
  searchRepo(repoInput.value);
  repoInput.value = "";
});

userBtn.addEventListener("click", () => {
  searchUser(userInput.value);
  userInput.value = "";
});

async function searchRepo(query) {
  loader.style.display = "block";
  errorDiv.style.display = "none";
  document.querySelector(".details").innerHTML = "";

  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    if (!res.ok) throw new Error("Failed to fetch repositories");
    const data = await res.json();
    const { items } = data;

    if (!items.length) throw new Error("No repositories found");

    items.forEach((e) => {
      document.querySelector(".details").innerHTML += `
        <div class="data bg-[white] p-5 rounded-md">
          <div class="flex gap-3 items-center w-full">
            <div class="rounded-full w-[60px]  overflow-hidden">
              <img class="w-full h-full" src=${e.owner.avatar_url} alt="">
            </div>
            <div class=" leading-1 overflow-hidden">
              <p class="owner text-sm">Owner: ${e.owner.login}</p>
              <div class="flex gap-3 items-center">
                <p class="repo-name text-[16px] font-semibold">${e.name}</p>
                <a class="w-4 transition-all" href=${
                  e.html_url
                } target="_blank">
                  <img src="link.svg" alt="link">
                </a>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div><p class="description text-sm">
              ${e.description ? e.description : "No Description"}</p></div>
            <div class="flex items-center flex-wrap gap-4 text-[10px] md:text-[12px] mt-2">
              <span>Forks: ${e.forks}</span>
              <span>Visibility: ${e.visibility}</span>
              <span>Watchers: ${e.watchers}</span>
              <span>Stars⭐: ${e.stargazers_count}</span>
              <span>Language : ${
                e.language ? e.language : "Not Specified"
              }</span>  
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error(error.message);
    errorDiv.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
}

async function searchUser(query) {
  loader.style.display = "block";
  errorDiv.style.display = "none";
  document.querySelector(".details").innerHTML = "";

  try {
    const res = await fetch(`https://api.github.com/users/${query}`);
    if (!res.ok) throw new Error("Failed to fetch user data");
    const data = await res.json();

    document.querySelector(".details").innerHTML = `
        <div class="data bg-white absolute left-1/2 -translate-x-1/2 p-4 sm:p-6 rounded-md w-[90%] sm:w-[600px] flex justify-center sm:justify-normal items-center sm:flex-row flex-col">
          <div class="w-[50%] sm:w-[30%] overflow-hidden rounded-full">
            <img class="h-full w-full" src=${data.avatar_url} alt="">
          </div>
          <div class="w-full sm:w-[70%] pt-7 sm:pt-0 sm:pl-7">
           <p><b>Name -</b> ${data.name}</p>
           <p><b>UserName -</b> ${data.login}</p>
           <p><b>Location -</b> ${
             data.location ? data.location : "No Location"
           }</p>
           <p><b>Email -</b> ${data.email ? data.email : "No Email"}</p>
           <p><b>Company -</b> ${data.company ? data.company : "No Company"}</p>
           <p><b>Followers -</b> ${data.followers}</p>
           <p><b>Following -</b> ${data.following}</p>
           <p><b>Public Repos -</b> ${data.public_repos}</p>
          </div>
          <button class="absolute right-3 top-3">
            <a href=${data.html_url} target="_blank">
              <img src="link.svg" alt="search">
            </a>
          </button>
        </div>
    `;
  } catch (error) {
    console.error(error.message);
    errorDiv.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
}
