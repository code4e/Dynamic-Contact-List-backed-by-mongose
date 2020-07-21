const port = 8000;
const path = require('path');
const express = require('express');
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', (req, res) => {

    Contact.find({}, (err, contacts) => {
        if (err) {
            console.log('Error in fetching from database');
            return;
        }
        return res.render('home', {
            title: "My Contact List",
            contact_list: contacts
        });
    });
});
app.get('/practice', (req, res) => {
    return res.render('practice', {
        title: "Practice",
        h1: "Playground!!"
    });
});
app.get('/delete-contact', (req, res) => {

    Contact.findByIdAndDelete(req.query.id, function (err) {
        if (err) {
            console.log('Error deleting contact from database');
            return;
        }
        // console.log(req.query);
        return res.redirect('back');
    });

    // let phone = req.query.phone;
    // for (let [i, v] of contactList.entries()) {
    //     if (v.phone == phone) {
    //         contactList.splice(i, 1);
    //     }
    // }
    // return res.redirect('back');
});
app.post('/create-contact', (req, res) => {
    // console.log(req.body);
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log('Error putting the contact into database');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });
});
app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Server is up and running at port: ', port);
    }
});