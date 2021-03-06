//Based on http://www.html5rocks.com/en/tutorials/webdatabase/todo/

document.addEventListener("deviceready", init, false);
//Activate :active state on device
document.addEventListener("touchstart", function() {}, false);

var app = {};
app.db = null;
      
app.openDb = function() {
   var dbName = "Todo.sqlite";
   if (window.navigator.simulator === true) {
        // For debugin in simulator fallback to native SQL Lite
        console.log("Use built in SQL Lite");
        app.db = window.openDatabase(dbName, "1.0", "Cordova Demo", 200000);
    }
    else {
        app.db = window.sqlitePlugin.openDatabase(dbName);
    }
}
      
app.createTable = function() {
	var db = app.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS todo(ID INTEGER PRIMARY KEY ASC, todo TEXT, added_on DATETIME)", []);
	});
}
      
app.addTodo = function(todoText) {
	var db = app.db;
	db.transaction(function(tx) {
		var addedOn = new Date();
		tx.executeSql("INSERT INTO todo(todo, added_on) VALUES (?,?)",
					  [todoText, addedOn],
					  app.onSuccess,
					  app.onError);
	});
}
      
app.onError = function(tx, e) {
	console.log("Error: " + e.message);
    app.hideOverlay();
} 

app.onSuccess = function(tx, r) {
	app.refresh();
    app.hideOverlay();
}

app.hideOverlay = function() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";    
}

app.showOverlay = function(id) {
    var overlay = document.getElementById("overlay");
	
    overlay.innerHTML = "<div class='row -justify-content-bottom'><div class='col'><button class='button -negative' onclick='app.deleteTodo(" + id + ");'>Delete</button>" + 
        "<button class='button' onclick='app.hideOverlay();'>Cancel</button></div></div>";
    
    overlay.style.display = "block";
}

app.deleteTodo = function(id) {
	var db = app.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM todo WHERE ID=?", [id],
					  app.onSuccess,
					  app.onError);
	});
}

app.refresh = function() {
	var renderTodo = function (row) {
	    return "<li class='list__item'><i class='list__icon list__icon--check fa fa-check u-color-positive'></i><span class='list__text'>" + row.todo + "</span>" +
            "<a class='delete' href='javascript:void(0);' onclick='app.showOverlay(" + row.ID + ");'><i class='list__icon list__icon--delete fa fa-trash-o u-color-negative'></i></a></li>";
	}
    
	var render = function (tx, rs) {
		var rowOutput = "";
		var todoItems = document.getElementById("todoItems");
		for (var i = 0; i < rs.rows.length; i++) {
			rowOutput += renderTodo(rs.rows.item(i));
		}
      
		todoItems.innerHTML = rowOutput;
	}
    
	var db = app.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todo", [], 
					  render, 
					  app.onError);
	});
}
      
function init() {
    navigator.splashscreen.hide();
	app.openDb();
	app.createTable();
	app.refresh();
}
      
function addTodo() {
	var todo = document.getElementById("todo");
	app.addTodo(todo.value);
	todo.value = "";
}
var navonSuccess = function(position) {
    var lok=position.coords.latitude+"|"+
		position.coords.longitude+"|"+
        position.coords.altitude+"|"+
        position.coords.accuracy+"|"+
        position.coords.altitudeAccuracy+"|"+
        position.coords.heading+"|"+
        position.coords.speed+"|"+position.timestamp
		//alert(lok)
		//var encodedString = Base64.encode(lok);
		//alert(atob(lok))
        $('#locarea').text(lok)
		alert(lok)
		//console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
            var rnd=Math.random()
            //alert(kee)
            var d = new Date();
			var n = d.getTime();
			//$.getJSON( "http://s1.24-by-7.com/api/fake", { name: "Benoy",ran:rnd, time: "now2pm",key: lok} )
       /* .done(alert('ok'))
        .done(functioon(){alert('done')})
        .fail(function(){alert('fail')})*/
    };

    // onError Callback receives a PositionError object
    //
    function navonError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
	function nav(){
    navigator.geolocation.getCurrentPosition(navonSuccess, navonError);
}

aas= function() {
	var renderTodo = function (row) {
	    return "<li class='list__item'><i class='list__icon list__icon--check fa fa-check u-color-positive'></i><span class='list__text'>" + row.cnt + "</span>" +
            "<a class='delete' href='javascript:void(0);' onclick='app.showOverlay(" + row.cnt + ");'><i class='list__icon list__icon--delete fa fa-trash-o u-color-negative'></i></a></li>";
	}
    
	var render = function (tx, rs) {
		var rowOutput = "";
		var todoItems = document.getElementById("todoItems");
		for (var i = 0; i < rs.rows.length; i++) {
			rowOutput += renderTodo(rs.rows.item(i));
		}
      
		todoItems.innerHTML = rowOutput;
	}
    
	var db = app.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT count(*) as cnt FROM todo", [], 
					  render, 
					  app.onError);
	});
}

fetch=function(){
	//$("#rescon").empty()
	$.ajaxSetup({crossDomain:true});
	var kee=123;//$('#skey').val()
	var rnd=Math.random()
	//alert(kee)
	var d = new Date();
	var n = d.getTime();
       	$.getJSON( "http://s1.24-by-7.com/api/fake", { name: "GITJohn"+n,ran:rnd, time: n+"_2pm",key: kee} )
        .done(function( json ) {
			$.each(json.r, function(i,item)
				{
				//alert(item.ta)
					if(item.ta==111)
						{
						}
				else{
									var hha='<div>';
			var hhb='</div>';
			//$("#rescon").append(hha+item.tc+hhb) ;
			$('#todoItems').innerHTML=hha+item.tc+hhb
				}
				})
//console.log( "JSON Data: " + json.users[ 3 ].name );
			console.log( "JSON Data: " + json.r[ 3 ].ta );
        	
        })
	alert('fetch')
	//$("todoItems").text('cleared');
	/*
	var d=new Date();
	var n=d.getTime();
	var kee=123;
	var rnd=Math.random();*/
	//name:"John"+n,ran:rnd,time:n+"__p",key:kee
/*	$.ajaxSetup({crossDomain:true});
	$.getJSON("http://s1.24-by-7.com/api/fake",{asd:"123"})
	    .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            //console.log( "Request Failed: " + err );
                alert(err)
            });
	.done(function(json){
		$.each(json.r,function(i,item)
		{
			if(item.ta==111){
				alert ("ta=111");
				
			}else{
				var hha="<div>"	;
				var hhb="</div>";
				//$("#rescon").append(hha+item.tc.hhb)
				$('#todoItems').innerHTML=hha+item.tc+hhb
			}
		})
	})*/
	/**/
}
