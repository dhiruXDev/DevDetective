const wrapperContainer = document.querySelector(".wrraper");
const navBar = document.querySelector(".nav");
const navHeading = document.querySelector(".heading");
const bgModeText = document.querySelector("[bg_mode_text]");
const bgModeIcon = document.querySelector("[bg_mode_icon]");
const bgchangeBtn = document.querySelector(".bg_change");
const error_image = document.querySelector(".Error_img")

const searchForm = document.querySelector(".search-form");
const searchContainer = document.querySelector(".searchbar_container");
const searchInputBar = document.querySelector("[search_input_bar]");
const searchBtn = document.querySelector("[search_btn]");
const errorText = document.querySelector("[error-text]");
const profileInfoContainer = document.querySelector("[profile-container]");
const profileHeading = document.querySelector("[profile-heading]");
const userImg = document.querySelector("[profile-img]");
const userName = document.querySelector("[profile-name]");
const joiningDate = document.querySelector("[joining-date]");
const githubUserId = document.querySelector("[github-profile-id]");
const biodata = document.querySelector("[biodata]");
const profileStatsWraper = document.querySelector("[profile-stats-wrapper]");
const  StatsTittle = document.querySelector(".stats-tittle");
const statsValue = document.querySelector(".stats-value");
const contactInfoICON = document.querySelector(".color1");

const reposVlaue = document.querySelector("[Repos]");
const follower = document.querySelector("[Followers]");
const following = document.querySelector("[Following]");

const userContactInfoContainer = document.querySelector("[user-contact-info-container]");
const locationInfo = document.querySelector("[location]");
const Page = document.querySelector("[user-info-page]");
const twitter = document.querySelector("[twitter-page]");
const company = document.querySelector("[company]");
const usermediaLink = document.querySelector(".user-link");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const url = "https://api.github.com/users/";
let darkMode = true;
let lighMode = false;
const currentUser = 'dhiruXDev';
errorText.style.display = "none"
cuurentTabInfo();
function cuurentTabInfo() {
    // By default user shoould be  "thepranaygupta"
    getSessionstorage();
    ToggleBgMode();
    fetchdetails(currentUser);

}
function getSessionstorage() {
    let UIDisplay = sessionStorage.getItem("UI-mode"); // here reteriving the data from sessionstorage as string , by default it give string
    if (UIDisplay === "true") {
        lighMode = true;
        darkMode = false;
    }
    else {
        darkMode = true;
        lighMode = false;
    }
}
bgchangeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (darkMode) {
        darkMode = false;
        lighMode = true;
        sessionStorage.setItem("UI-mode", "true"); console.log("ui 1 ");  // store as string
        ToggleBgMode();

    }
    else {
        darkMode = true;
        lighMode = false;
        sessionStorage.setItem("UI-mode", "false"); console.log("ui 2 ");  // store as string
        ToggleBgMode();
    }
});

function ToggleBgMode() {
    if (darkMode) {   // Active the darkmode 
        console.log("dark");
        bgModeText.textContent = 'LIGHT';
        bgModeIcon.src = "./assests/sun-icon.svg";
        wrapperContainer.classList.remove("lightmode");
        navBar.classList.remove("lightmode");
        // navHeading.classList.add("lightmode");
        searchForm.classList.remove("lightmode");
        searchContainer.classList.remove("lightmode");
        searchInputBar.classList.remove("lightmode");
        profileInfoContainer.classList.remove("lightmode");
        userName.classList.remove("lightmode");
        joiningDate.classList.remove("lightmode");
        biodata.classList.remove("lightmode");
        profileStatsWraper.classList.remove("lightmode"); 
        StatsTittle.classList.remove("lightmode"); 
        statsValue.classList.remove("lightmode"); 
        userContactInfoContainer.classList.remove("lightmode"); 
        usermediaLink.classList.remove("lightmode"); 
        twitter.classList.remove("lightmode"); 
        contactInfoICON.classList.remove("lightmode");

        wrapperContainer.classList.add("darkmode");
        navBar.classList.add("darkmode");
        // navHeading.classList.add("darkmode");
        searchForm.classList.add("darkmode");
        searchContainer.classList.add("darkmode");
        searchInputBar.classList.add("darkmode");
        profileInfoContainer.classList.add("darkmode");
        biodata.classList.add("darkmode");
        userName.classList.add("darkmode");
        joiningDate.classList.add("darkmode");
        profileStatsWraper.classList.add("darkmode"); 
        StatsTittle.classList.add("darkmode"); 
        statsValue.classList.add("darkmode"); 
        userContactInfoContainer.classList.add("darkmode"); 
        usermediaLink.classList.add("darkmode");
        twitter.classList.add("darkmode");
        contactInfoICON.classList.add("darkmode");



    }
    else {     // active the Lighmode
        console.log("light")
        bgModeText.textContent = 'DARK';
        bgModeIcon.src = "./assests/moon-icon.svg";

        wrapperContainer.classList.remove("darkmode");
        navBar.classList.remove("darkmode");
        // navHeading.classList.add("darkmode");
        searchForm.classList.remove("darkmode");
        searchContainer.classList.remove("darkmode");
        searchInputBar.classList.remove("darkmode");
        profileInfoContainer.classList.remove("darkmode");
        userName.classList.remove("darkmode");
        joiningDate.classList.remove("darkmode");
        biodata.classList.remove("darkmode");
        profileStatsWraper.classList.remove("darkmode");    
        StatsTittle.classList.remove("darkmode"); 
        statsValue.classList.remove("darkmode"); 
        userContactInfoContainer.classList.remove("darkmode"); 
        usermediaLink.classList.remove("darkmode"); 
        twitter.classList.remove("darkmode"); 
        contactInfoICON.classList.remove("darkmode");

        wrapperContainer.classList.add("lightmode");
        navBar.classList.add("lightmode");
        // navHeading.classList.add("lightmode");
        searchForm.classList.add("lightmode");
        searchContainer.classList.add("lightmode");
        searchInputBar.classList.add("lightmode");
        profileInfoContainer.classList.add("lightmode");
        // biodata.classList.add("lightmode");
        userName.classList.add("lightmode");
        joiningDate.classList.add("lightmode");
        biodata.classList.add("lightmode");
        profileStatsWraper.classList.add("lightmode");
        StatsTittle.classList.add("lightmode");
        statsValue.classList.add("lightmode");
        userContactInfoContainer.classList.add("lightmode");
        usermediaLink.classList.add("lightmode");
        twitter.classList.add("lightmode");
        contactInfoICON.classList.add("lightmode");
    }
}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorText.style.display = "none";   
    const searchedUser = searchInputBar.value;
     
    if (searchedUser === "") {
        return;
    }
    else {

        fetchdetails(searchedUser);
    }
});

async function fetchdetails(searchedUser) {
    try {
        const response = await fetch(`${url}${searchedUser}`);
        const data = await response.json();
        rederUserDetails(data);
    }
    catch (err) {

         errorText.style.display = "flex";       
         document.querySelector("[profile-container]").style.display = "none"; // Hide profile container
         document.querySelector(".Error_img").style.display = "block"; // Show error image
    }
}
function rederUserDetails(loginId) {
    userImg.src = `${loginId.avatar_url}`;
    userName.textContent = loginId?.name ? loginId?.name : "Not Available";

    const dateSegment = loginId.created_at.split("T").shift().split("-");
    joiningDate.textContent = `Joined ${dateSegment[2]} ${months[dateSegment[1] - 1]} ${dateSegment[0]}`;

    githubUserId.textContent = `@${loginId?.login}`;
    githubUserId.href = `${loginId?.html_url}`     /// connecting with link
    biodata.textContent =  ( loginId?.bio ) ? loginId?.bio : "This profile has no bio";
    reposVlaue.textContent = loginId?.public_repos;
    follower.textContent = loginId?.followers;
    following.textContent = loginId?.following;
    locationInfo.textContent = (loginId?.location) ?  loginId?.location  : "Not Available" ;
    Page.textContent = (loginId?.blog) ? (loginId?.blog) :  "Not Available" ;  
    twitter.textContent = (loginId?.twitter_username) ? (loginId?.twitter_username) :  "Not Available"; 

    console.log("loginId:", loginId);
    console.log("twitter:", twitter);
    console.log("loginId.twitter_username:", loginId.twitter_username);
    if (loginId && loginId.twitter_username) { twitter.href = `https://twitter.com/${loginId.twitter_username}`; }
    else { twitter.href = "#"; }
    company.textContent = (loginId?.company) ? loginId?.company :  "Not Available";
}


















