const path = require('path');
const express = require('express');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// express.static middleware untuk serve file statis
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'asd' && password === 'asd') {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/dashboard');
    } else {
        res.send('Login failed. Please try again.');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        res.render('dashboard', { username: req.session.username });
    } else {
        res.redirect('/');
    }
});

// Tambahkan route untuk data mahasiswa
app.get('/mahasiswa', (req, res) => {
    if (req.session.loggedin) {
        res.render('mahasiswa', { username: req.session.username });
    } else {
        res.redirect('/');
    }
});

app.get('/mahasiswa/tambah-mahasiswa', (req, res) => {
    if (req.session.loggedin) {
        res.render('mahasiswa/tambah-mahasiswa', { username: req.session.username });
    } else {
        res.redirect('/');
    }
});

app.get('/dosen', (req, res) => {
    if (req.session.loggedin) {
        res.render('dosen', { username: req.session.username });
    } else {
        res.redirect('/');
    }
});

app.get('/dosen/tambah-dosen', (req, res) => {
    if (req.session.loggedin) {
        res.render('dosen/tambah-dosen', { username: req.session.username });
    } else {
        res.redirect('/');
    }
});


// Tambahkan route untuk logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.redirect('/');
    });
});

// Server
app.listen(3000, () => {
    console.log("Running")
})

