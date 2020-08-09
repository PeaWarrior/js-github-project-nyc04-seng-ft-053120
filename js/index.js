const userList = document.querySelector('ul#user-list');
const reposList = document.querySelector('ul#repos-list');
const githubForm = document.querySelector('form#github-form');

githubForm.addEventListener('submit', e => {
    e.preventDefault()

    let searchTerm = e.target.search.value
    searchUsers(searchTerm)
});

function searchUsers(searchTerm) {
    fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(userData => {
        displayUser(userData.items["0"])
    })
};

function displayUser(userObj) {
    let userLoginName = document.createElement('h2')
        userLoginName.innerText = userObj.login

    let userAvatar = document.createElement('img')
        userAvatar.src = userObj.avatar_url
        userAvatar.width = '50'
        userAvatar.height = '50'

    let userPage = document.createElement('a')
        userPage.href = userObj.html_url
        userPage.innerText = "GitHub"

    userList.append(userLoginName, userAvatar, userPage)

    userLoginName.addEventListener('click', e => {
        getRepos(userObj)
    })
};

function getRepos(userObj) {
    fetch(`https://api.github.com/users/${userObj.login}/repos`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(reposData => {
        reposData.forEach(repo => {
            displayRepo(repo)
        });
    })
};

function displayRepo(repoObj) {
    let repoLi = document.createElement('li')
    
    let repoName = document.createElement('a')
        repoName.href = repoObj.html_url
        repoName.innerText = repoObj.name

    repoLi.append(repoName)
    reposList.append(repoLi)
}