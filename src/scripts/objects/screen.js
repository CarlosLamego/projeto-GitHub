const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui nome cadastrado 😢'} <br>
                                                Número de seguidores: ${user.followers ?? 'Não possui nome cadastrado 😢'} <br>
                                                Seguindo: ${user.following}
                                            </p>
                                        </div>
                                    </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}<br>
                                     <div class="emotes">
                                            <p class="3o-pedido">🍴${repo.forks_count}</p> 
                                            <p class="3o-pedido">⭐${repo.stargazers_count}</p>
                                            <p class="3o-pedido">🦉${repo.watchers}</p>
                                            <p class="3o-pedido">🌅${repo.language}</p>
                                        </div>
                                        </a>
                                        </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section"> 
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
        let eventItens = ""
        let counter = 0
        user.events.forEach(evento => {
            if (evento.type === "PushEvent" && (counter < 10)) {
                eventItens += `<li class="lista-evento"><h4 class="evento">${evento.repo.name}</h4> - ${evento.payload.commits[0].message}</li>`
                counter = counter + 1
                if (counter >= 10) return
            } else if (evento.type === "CreateEvent" && (counter < 10)) {
                eventItens += `<li><h4 class="evento">${evento.repo.name}</h4> - Sem mensagem de commit</li>`
                counter = counter + 1
            }
        })
        this.userProfile.innerHTML +=
            `<div class="events section">
                <h2>Eventos</h2>  
                <ul>${eventItens}</ul>
            </div>`
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado!</h3>"
    }
}

export { screen }