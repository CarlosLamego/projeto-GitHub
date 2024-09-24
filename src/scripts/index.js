document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName))
        return
    getUserProfile(userName)
})


document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key == 13

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
        getUser(userName)
    }
})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}


async function user(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json()
}

async function repos(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/repos`)
    return await response.json()
}

async function events(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events`)
    return await response.json()
}

function getUserProfile(userName) {

    user(userName).then(userData => {
        let userInfo = `<img src="${userData.avatar_url}" alt="Foto do perfil do usuário />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui nome cadastrado 😢'} <br>
                                                Número de seguidores: ${user.followers} <br>
                                                Seguindo: ${user.following}
                                            </p>
                                        </div>`
        document.querySelector('.profile-data').innerHTML = userInfo

        getUserRepositories(userName)
        getUserEvents(userName)

    })
}

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}<br>
                                        <div class="emotes">
                                            <p class="3o-pedido">🍴${repo.forks_count}</p> 
                                            <p class="3o-pedido">⭐${repo.stargazers_count}</p>
                                            <p class="3o-pedido">🦉${repo.watchers}</p>
                                            <p class="3o-pedido">🌅${repo.language}</p>
                                        </div>
                                        </a>
                                    </li>`

        })
        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
                                                                <h2>Repositórios</h2>
                                                                    <ul>${repositoriesItens}</ul>
                                                            </div>`
    })
}

/*
Você deve apresentar na tela uma lista com até 10
últimos eventos do usuário no GitHub. Os eventos que
serão apresentados são de dois tipos: CreateEvent e
PushEvent apenas.
Para buscar os eventos você pode usar esse endpoint
do GitHub: (https://api.github.com/users/<coloque-nome-do-usuario-aqui>/events, por exemplo
https://api.github.com/users/devemdobro/events):
Para cada atividade do tipo PushEvent você deve
mostrar o nome do repositório e a mensagem de
commit do Evento. Exemplo
Se for uma atividade do tipo CreateEvent você deve
mostrar apenas a mensagem “Sem mensagem de
commit”.


*/

function getUserEvents(userName) {
    events(userName).then(eventData => {
        let eventItens = ""
        let counter = 0
        eventData.forEach(evento => {
            if (evento.type === "PushEvent" && (counter < 10)) {
                eventItens += `<li class="lista-evento"><h4 class="evento">${evento.repo.name}</h4> - ${evento.payload.commits[0].message}</li>`
                counter = counter + 1
                if (counter >= 10) return
            } else if (evento.type === "CreateEvent" && (counter < 10)) {
                eventItens += `<li><h4 class="evento">${evento.repo.name}</h4> - Sem mensagem de commit</li>`
                counter = counter + 1

            }
        })
        document.querySelector('.profile-data').innerHTML +=
            `<div class="events section">
                <h2>Eventos</h2>  
                <ul>${eventItens}</ul>
            </div>`
    })
}


