const GIT_BASE_URL = "https://api.github.com/users/";
const profileImgEL = document.getElementById("profile");
const nameEl = document.getElementById("name");
const locationEL = document.getElementById("location");
const blogEL = document.getElementById("blog");
const companyEl = document.getElementById("company");
const bioEL = document.getElementById("bio");
const githubLinkEL = document.getElementById("github-link");
const joinedTimeEL = document.getElementById("joined-time");
const reposCountEl = document.getElementById("rep-count")
const followersCountEl = document.getElementById("follower-count")
const followingCountEl = document.getElementById("following-count");
const searchEl = document.getElementById("search");
const searchBtnEl = document.getElementById("search-btn");
const userInfoDiv = document.getElementById("user-info-div")
const errorDivEl = document.getElementById("error-div");


searchBtnEl.addEventListener("click",getUserNameFn)
searchEl.addEventListener("focus" , enterKeySearchFn)

function enterKeySearchFn() {
    document.body.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        getUserNameFn();
      }
    });
}

function getUserNameFn() {
    let usernameVal = searchEl.value.trim().toLowerCase();
    console.log(usernameVal);
    
    getGithubProfile(usernameVal);
}

async function getGithubProfile(userName) {
  try {
    const response = await fetch(`${GIT_BASE_URL}${userName}`);
    if (!response.ok) {
        // console.log(response);
        if (response.status === 404) {
            throw new Error("No user found");
            return;
        }  
      throw new Error("Invalid API");
    }
    const data = await response.json();
    console.log(data);
    
    userInfoShowFn(data);
  } catch (error) {
    console.error(error);
    errorDivEl.classList.remove("hidden");
    if(!userInfoDiv.classList.contains("hidden")) userInfoDiv.classList.add("hidden");
  }
}

function userInfoShowFn(userData) {

userInfoDiv.classList.remove("hidden");
if (!errorDivEl.classList.contains("hidden")) errorDivEl.classList.add("hidden");
//   console.dir(userData.created_at);
  profileImgEL.src = userData.avatar_url;
  nameEl.textContent = userData.name;
  if (userData.location == null || userData.location == "") {
    locationEL.parentElement.classList.add("hidden")
  }else{
    locationEL.parentElement.classList.remove("hidden");
    locationEL.textContent = userData.location;
  }
  if(userData.blog == null || userData.blog == ""){
    blogEL.parentElement.classList.add("hidden");
  }else{
    blogEL.parentElement.classList.remove("hidden")
    blogEL.textContent = userData.blog;
    blogEL.parentElement.href = userData.blog;
  }
//   add icon like above
  companyEl.textContent = userData.company;
  bioEL.textContent = userData.bio;
  githubLinkEL.href = userData.html_url;

  //  date
  const iso = userData.created_at;
  const date = new Date(iso);
  const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/ /g, "-").toLowerCase(); 
  joinedTimeEL.textContent = `joined on ${formattedDate}`

//   follow info
reposCountEl.textContent = userData.public_repos;
followersCountEl.textContent = userData.followers;
followingCountEl.textContent = userData.following;
}

// back navigation
window.addEventListener("keyup", (event) => {
  if (event.target.tagName !== "INPUT") {
    if (event.code === "Backspace") {
      window.location = "./index.html";
    }
  }
});