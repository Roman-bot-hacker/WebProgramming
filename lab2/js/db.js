var useLocalStorage = false;

//localStorage-------------------------------------------------------------------------------------------
function addItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getAllItems(callback) {
	var arr = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var item = JSON.parse(localStorage[key]);
        arr.push(item);
    }
    callback(arr);
}

function deleteItem(key) {
	localStorage.removeItem(key);
}
//----------------------------------------------------------------------------------------------------------------


//IndexedDB----------------------------------------------------------------------------------------------------------------------------
var db = null
var productsStore = null;
var requestDB = self.indexedDB.open('LAB_DB', 4);

useIndexedDB(requestDB);

function useIndexedDB(requestDB){

    requestDB.onsuccess = function (event) {
        // get database from event
        while(db == null) {
        	db = event.target.result;
        }
    };

    requestDB.onerror = function (event) {
        console.log('[onerror]', requestDB.error);
    };

    requestDB.onupgradeneeded = function (event) {
        var db = event.target.result;
        
        db.createObjectStore('news', { keyPath: 'id'});
        db.createObjectStore('fans', { keyPath: 'id'});
        //{ keyPath: 'id', autoIncrement: true }
    };

}

function addNewsData(data) {
    let transaction = null;
    try {
        transaction = db.transaction('news', 'readwrite');
    } catch (e) {
        productsStore = db.createObjectStore('news', { keyPath: 'id', autoIncrement: true });
        transaction = db.transaction('news', 'readwrite');
    }

    transaction.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');
    };

    
    productsStore = transaction.objectStore('news');

    //var productStoreRequest = productsStore.add(data);

    productsStore.add(data).onsuccess = function (event) {
        console.log("ADDED");
    }
}

function getNewsData(callback) {

    let transaction = db.transaction('news', 'readwrite');
    let data = [];

    transaction.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');
    };

    productsStore = transaction.objectStore('news');

    productsStore.getAll().onsuccess = function (event) {
        data = event.target.result;
        callback(data);
    };
    

}

function addAppealData(data) {
    let transaction = db.transaction('fans', 'readwrite');

    transaction.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');

        productsStore = transaction.objectStore('fans');

    	//var productStoreRequest = productsStore.add(data);

    	productsStore.add(data).onsuccess = function (event) {
        	console.log("ADDED"); // true
    	}
    };
}

function getAppealData(callback) {

    let transaction = db.transaction('fans', 'readwrite');
    let data = [];

    transaction.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');
    };

    productsStore = transaction.objectStore('fans');


    productsStore.getAll().onsuccess = function (event) {
        data = event.target.result;
        callback(data);
    };
    

}


// -----------------------------------------------------
