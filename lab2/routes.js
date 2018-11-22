module.exports = (app, con) => {
    const data = require('./controllers.js');

    // Create a new News
    app.post('/news', function (request, responce) {
        if(!request.body) {
            return responce.status(400).send({
                message: "News content can not be empty"
            });
        };
        // Save News in the database
        sqlquery = "insert into news (title, article) values ('" + request.body.title + "', '" + request.body.article + "');";
        con.query(sqlquery, function(err, resp) {
            if (err) throw err;
            console.log("news inserted successfully! (status 200)");
            return responce.status(200).send({
                message: "News added successfully"
            });
        });
    });


    // Retrieve all News
    app.get('/news', function (request, responce) {
        sqlquery = "Select * from news;";
        con.query(sqlquery, function(err, result, fields) {
            if (err) throw err;
            console.log("news get successfully! (status 200)");
            console.log(result);
            return responce.status(200).send({
                result
            });
        });
    });

    // Retrieve a single News with newsId
    app.get('/news/:newsId', function (request, responce) {
        sqlquery = "Select * from news where id=" + request.params.newsId + ";";
        con.query(sqlquery, function(err, result, fields) {
            if(!result) {
                console.log("news with id " + request.params.newsId + " not exists");
                return responce.status(404).send({
                    message: "News not exists"
                });
            }
            else{
                if (err) throw err;
                console.log("news get successfully! (status 200)");
                console.log(result);
                return responce.status(200).send({
                    result
                });
            }
        });
    });

    // Update a News with newsId
    app.put('/news/:newsId', function (request, responce) {
        if(!request.body) {
            return responce.status(400).send({
                message: "News content can not be empty"
            });
        }

        sqlquery = "Update news set `title` = '" + request.body.title + "', `article` = '" + request.body.article + "' where id = " + request.body.id + ";";
        con.query(sqlquery, function(err, resp) {
            if (err) throw err;
            console.log("news updated successfully! (status 200)");
            return responce.status(200).send({
                message: "News updated successfully"
            });
        });
    });

    // Delete a News with newsId
    app.delete('/news/:newsId', function (request, responce) {
        sqlquery = "Delete from news where id=" + request.params.newsId + ";";
        con.query(sqlquery, function(err, resp) {
            if (err) throw err;
            console.log("news deleted successfully! (status 200)");
            return responce.status(200).send({
                message: "News deleted successfully"
            });
        });
    });

    // Create a new Appeal
    app.post('/fans', function (request, responce) {
        if(!request.body) {
            return responce.status(400).send({
                message: "News content can not be empty"
            });
        }

        // Save News in the database
        sqlquery = "Insert into fans(ap_date, appeal) values ('" + getDate() + "', '" + request.body.appeal + "');";
        con.query(sqlquery, function(err, resp) {
            if (err) throw err;
            console.log("fans inserted successfully! (status 200)");
            return responce.status(200).send({
                message: "Appeal added successfully"
            });
        });
    });

    function getDate() {
        var dateTime = new Date();
        var aDate = dateTime.getDate() + '.'
        + (dateTime.getMonth()+1) + '.'
        + dateTime.getFullYear() + ', '
        + dateTime.getHours() + ':'
        + dateTime.getMinutes();
        return dateTime;
    }

    // Retrieve all apeeals
    app.get('/fans', function (request, responce) {
        sqlquery = "Select * from fans;";
        con.query(sqlquery, function(err, result, fields) {
            if (err) throw err;
            console.log("fans get successfully! (status 200)");
            console.log(result);
            return responce.status(200).send({
                result
            });
        });
    });

    // Retrieve a single Appeals with appealId
    app.get('/fans/:appealId', function (request, responce) {
        sqlquery = "Select * from fans where id=" + request.params.appealId + ";";
        con.query(sqlquery, function(err, result, fields) {
            if(!result) {
                console.log("appeal with id " + request.params.appealId + " not exists");
                return responce.status(404).send({
                    message: "Appeal not exists"
                });
            }
            else{
                if (err) throw err;
                console.log("fans get successfully! (status 200)");
                console.log(result);
                return responce.status(200).send({
                    result
                });
            }
        });
    });

    // Update a Appeal with appealId
    app.put('/fans/:appealId', function (request, responce) {
        if(!request.body) {
            return responce.status(400).send({
                message: "Appeal content can not be empty"
            });
        }

        sqlquery = "Update fans set `appeal` = '" + request.body.appeal + "', `ap_date` = '" + getDate() + "' where id = " + request.body.id + ");";
        con.query(sqlquery, function(err, resp) {
            if (err) throw err;
            console.log("fans updated successfully! (status 200)");
            return responce.status(200).send({
                message: "Appeal updated successfully"
            });
        });
    });

    // Delete a Appeal with appealId
    app.delete('/fans/:appealId', function (request, responce) {
        sqlquery = "Delete from fans where id=" + request.params.appealId + ");";
        con.query(sqlquery, function(err, resp) {
            if (err) throw err;
            console.log("fans deleted successfully! (status 200)");
            return responce.status(200).send({
                message: "Appeal deleted successfully"
            });
        });
    });

    //------------------------------------------------------------------------------------------------------------------------------------------

    app.post('/admin.html', function (req, res) {
        if(!req.body) return res.sendStatus(400);
        console.log(req.body);
        sqlquery = "Insert into news(title, article) values ('" + req.body.title + "', '" + req.body.text + "');";
        con.query(sqlquery, function(err, res) {
            if (err) throw err;
            console.log("news inserted successfully! (status 200)");
        });
    });

    app.post('/fans.html', function (req, res) {
        if(!req.body) return res.sendStatus(400);
        console.log(req.body);
        console.log(getDate());
        var sqlquery = "Insert into fans(ap_date, appeal) values ('" + getDate() + "', '" + req.body.appeal + "');";
        con.query(sqlquery, function(err, res) {
            if (err) throw err;
            console.log("fans inserted successfully! (status 200)");
        });
    });

    app.get('/news.html', function (req, res) {
        sqlquery = "Select * from news;";
        con.query(sqlquery, rows, function(err, res) {
            if (err) throw err;
            for (line in rows) {
                console.log(line);
                //addNewsFromServer(line.title, line.article);
            }
            console.log("news get successfully! (status 200)");
        });
    });

};