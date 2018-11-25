module.exports = (con) => {
var sqlquery = "";
// INSERT NEWS----------------------------
exports.insertNews = function (request, responce) {
	if(!request.body.content) {
        return responce.status(400).send({
            message: "News content can not be empty"
        });
    };

    // Save News in the database
    sqlquery = "Insert into news(title, article) values ('" + request.body.title + "', '" + request.body.text + "');";
  	con.query(sqlquery, function(err, responce) {
  	if (err) throw err;
  	console.log("news inserted successfully! (status 200)");
  	});
};

// Retrieve and return all notes from the database.
exports.getAllNews = function (request, responce) {
	sqlquery = "Select * from news;";
	con.query(sqlquery, function(err, result, fields) {
  	if (err) throw err;
  	console.log("news get successfully! (status 200)");
  	console.log(result);
  	});
};

// Find a single note with a noteId
exports.getOneNews = function (request, responce) {
	sqlquery = "Select * from news where id=" + request.params.newsId + ");";
	con.query(sqlquery, function(err, result, fields) {
	if(!result) {
		console.log("news with id " + request.params.newsId + " not exists");
	}
  	else{
  		if (err) throw err;
  		console.log("news get successfully! (status 200)");
  		console.log(result);
  	}
  	});
};

// Update a note identified by the noteId in the request
exports.updateNews = function (request, responce) {
	if(!request.body.content) {
        return responce.status(400).send({
            message: "News content can not be empty"
        });
    }

    sqlquery = "Update news set `title` = '" + request.body.title + "', `article` = '" + request.body.text + "' where id = " + request.body.id + ");";
    con.query(sqlquery, function(err, responce) {
  	if (err) throw err;
  	console.log("news updated successfully! (status 200)");
  	});
};

// Delete a note with the specified noteId in the request
exports.deleteNews = function (request, responce) {
	sqlquery = "Delete from news where id=" + request.params.newsId + ");";
	con.query(sqlquery, function(err, responce) {
  	if (err) throw err;
  	console.log("news deleted successfully! (status 200)");
  	});
};

exports.insertAppeal = function (request, responce) {
	if(!request.body.content) {
        return responce.status(400).send({
            message: "News content can not be empty"
        });
    }

    // Save News in the database
    sqlquery = "Insert into fans(ap_date, appeal) values ('" + getDate() + "', '" + request.body.appeal + "');";
  	con.query(sqlquery, function(err, responce) {
  	if (err) throw err;
  	console.log("fans inserted successfully! (status 200)");
  	});
};

function getDate() {
	var dateTime = new Date();
    var aDate = dateTime.getDate() + '.'
      + (dateTime.getMonth()+1) + '.'
      + dateTime.getFullYear() + ', '
      + dateTime.getHours() + ':'
      + dateTime.getMinutes();
    return dateTime;
}

// Retrieve and return all notes from the database.
exports.getAllAppeals = function (request, responce) {
	sqlquery = "Select * from fans;";
	con.query(sqlquery, function(err, result, fields) {
  	if (err) throw err;
  	console.log("fans get successfully! (status 200)");
  	console.log(result);
  	});
};

// Find a single note with a noteId
exports.getOneAppeal = function (request, responce) {
	sqlquery = "Select * from fans where id=" + request.params.appealId + ");";
	con.query(sqlquery, function(err, result, fields) {
	if(!result) {
		console.log("appeal with id " + request.params.appealId + " not exists");
	}
  	else{
  		if (err) throw err;
  		console.log("fans get successfully! (status 200)");
  		console.log(result);
  	}
  	});
};

// Update a note identified by the noteId in the request
exports.updateAppeal = function (request, responce) {
	if(!request.body.content) {
        return responce.status(400).send({
            message: "Appeal content can not be empty"
        });
    }

    sqlquery = "Update fans set `appeal` = '" + request.body.appeal + "', `ap_date` = '" + getDate() + "' where id = " + request.body.id + ");";
    con.query(sqlquery, function(err, responce) {
  	if (err) throw err;
  	console.log("fans updated successfully! (status 200)");
  	});
};

// Delete a note with the specified noteId in the request
exports.deleteAppeal = function (request, responce) {
	sqlquery = "Delete from fans where id=" + request.params.appealId + ");";
	con.query(sqlquery, function(err, responce) {
  	if (err) throw err;
  	console.log("fans deleted successfully! (status 200)");
  	});
};
}

