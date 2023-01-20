const mysql = require('mysql2');

// Verbindungsdaten für die Datenbank
const connection = mysql.createConnection({
          host: process.env.host, // eintragen in ".env" oder "process.env." entfernen und mit eigeneder eingabe ersetzen!
          user: process.env.username,
          password: process.env.password,
          database: process.env.database
        });

// Verbindung aufbauen
connection.connect();


// Verbindung schließen
connection.end();



$(".notification").hide();

let notify = (type, message) => {
    const notify_config = [
        {type: "error", title: "Fehler", color: "red", duration:3500},
        {type: "success", title: "Erfolgreich", color: "green", duration:3500},
        {type: "fatal_error", title: "Schwerwiegender Fehler", color: "darkred", duration:6000}
    ]
    for (var key in notify_config) {
        if (notify_config[key].type == type) {
            const content = $(
                `
            <div class="notification" style="border-bottom: 5px; border-bottom:` +
                notify_config[key].color +
                ` solid;"><div class="notification-title"><p id="notfication-title-content" style="color: ` + notify_config[key].color + `">
            ` + notify_config[key].title + `</p>
            </div>
            <div class="notification-message"><p id="notfication-message-content">
            ` + message +
                `</p></div></div>
            `
            )
            content.fadeIn(300);
            $(".notification").delay(notify_config[key].duration).fadeOut("slow");
            $("#notifications").prepend(content);
            console.log(notify_config[key].color, notify_config[key].title, message);
            setTimeout(() => {
                content.fadeOut("slow");
            }, notify_config[key].duration)
            $(".notification").delay(notify_config[key].duration).fadeOut("slow");
        }
    }
}

let login = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username != '' && password != '') {
        var found = false;
        connection.query('SELECT * FROM admins', function (err, results, fields) {
            console.log(results);
            for (var key in results) {
                if (results[key].username == username && results[key].password == passwort) {
                    found = true;
                    notify("success", "Du hast dich erfolgreich eingeloggt!")
                    break;
                } else {
                    found = false;
                }
            }
            if (found == false) {
                notify("error", "Der Benutzeraccount konnte nicht gefunden werden!")
            }
          });
    } else {
        notify("error", "Überprüfe deine eingaben!");
    }
}