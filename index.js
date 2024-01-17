const express = require('express');
const qedmail = require('qed-mail');
const app = express();
const port = 3000;

app.use(express.json());
app.post('/check-email', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    qedmail.checkEmail(email)
        .then(isValid => {
            res.json({ email, isValid });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
