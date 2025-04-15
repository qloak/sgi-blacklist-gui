const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/group/:groupId/ranks', async (req, res) => {
    const { groupId } = req.params;
    try {
        const rankRes = await axios.get(`https://groups.roblox.com/v1/groups/${groupId}/roles`);
        res.json(rankRes.data.roles);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching ranks.' });
    }
});

app.get('/api/group/:groupId/users/:roleId', async (req, res) => {
    const { groupId, roleId } = req.params;
    let users = [];
    let cursor = '';
    try {
        do {
            const response = await axios.get(`https://groups.roblox.com/v1/groups/${groupId}/roles/${roleId}/users?limit=100&cursor=${cursor}`);
            users.push(...response.data.data);
            cursor = response.data.nextPageCursor;
        } while (cursor);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users in rank.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
