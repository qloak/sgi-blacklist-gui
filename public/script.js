document.addEventListener('DOMContentLoaded', () => {
    const groupId = 'YOUR_GROUP_ID_HERE';
    const container = document.getElementById('data-container');

    fetch(`https://YOUR-BACKEND-URL.onrender.com/api/group/${groupId}/ranks`)
        .then(res => res.json())
        .then(ranks => {
            ranks.forEach(rank => {
                const rankDiv = document.createElement('div');
                rankDiv.classList.add('rank');

                const title = document.createElement('h2');
                title.textContent = rank.name;
                rankDiv.appendChild(title);

                fetch(`https://YOUR-BACKEND-URL.onrender.com/api/group/${groupId}/users/${rank.id}`)
                    .then(res => res.json())
                    .then(users => {
                        users.forEach(user => {
                            const userDiv = document.createElement('div');
                            userDiv.innerHTML = `<a href="${user.profileLink}" target="_blank">${user.username}</a>`;
                            rankDiv.appendChild(userDiv);
                        });
                    });

                container.appendChild(rankDiv);
            });
        });
});
