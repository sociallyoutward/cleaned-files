//File Author: Karsten Rabe

//Use JS browser storage objects to save interest data
//If browser doesn't support it, fall back to ajax requests
//Maybe use additional fallback before ajax requests? cookies, or javascript object variables

//Check if item is in local storage. id is name of name / value pair to be checked.
function checkIfCached(id) {
	if (localStorage.getItem(id) == null){
		return false;
	}
	else {
		return true;
	};
};
//Clear storage
function clearStorage() {
	localStorage.clear();
};

//Returns interest name by interest id
function getNameById(id) {
	var result = localStorage.getItem(id);
	return result;
};
//Returns interest names by parent id
function getNamesByParent(parent) {
	parent = parent + 'p';
	var result = localStorage.getItem(parent);
	result = JSON.stringify(result);
	return result;
};
//Returns interest id by interest name
function getIdByName(name) {
	var result = localStorage.getItem(name);
	return result;
};

//Splice array back together from storage string
function reformDataArray(string, parent){
	var s = string;
	var par = parent;
	par = par.toString();                //typecast int to string
	s = s.substring(1, s.length-2);      //trim brackets
	var obj = [];                        //var holding reconstructed array
	var w,                               //word variable
	    len;                             //length of word
	var str = s.split('/');              //array with all interest names in array (words)
	var numWords = str.length;           //number of words
	var ID;                              //interest ID variable
	var interest = [];                   //obj's top level index placeholder variable
	
	wipeCurrIds();    
	for (var i=0; i<numWords; i++) {
		w = s.split('/', 1);                     //trim slash                   
		w = w.toString();                        //typecast
		len = w.length;                          //Get length
		s = s.substring(len + 1, s.length);      //Trim whole string
		ID = getIdByName(w);                     //get interest's ID
		currentIntIds[i] = ID;                   //This is used to contain all interest ids of interests currently showing. Used to determine if they have children and bring up plus popup
		if (w == 'Central') {                    //modify "Central's" parent ID
			par = '-1';               
			interest = [ID, w, par];             //construct object of strings
			par = parent;
		}
		else {
			interest = [ID, w, par];            //same as above
		};                            
		
		obj[i] = interest;                       //Construct object with inner string objects (id, name, parent groupings)

	};
	//console.log('Fetched from cache: ' + JSON.stringify(obj));
	return obj;
};

//Store id / name pair
function storeIdName(id, name) {
	localStorage.setItem(id, name);
};
//Store parent / name pair
function storeParentNames(parent, names) {
	localStorage.setItem(parent, names);
};
//Store interest name by id
function storeNameId(name, id){
	localStorage.setItem(name, id);
};

//Parse data from chooseInterests page and store in local storage
function parseData(data) {
    var d = data;           //Data object of the form d[interest][id, name, parent] 
    var a = new Array,
        aIndex = 0,
        bIndex = 0,
        names = new String;

	for (var i = 0; i<d.length * 3; i++) {    //Put items in d[][] into array a of the form a[]
        a[i] = d[aIndex][bIndex];
        if (bIndex == 2){
        	bIndex = (-1);
        	aIndex ++;
        };
        bIndex ++;
	};
	wipeCurrIds();
	for (var i = 0; i<a.length; i++) {
		currentIntIds[i] = a[i];
		storeIdName(a[i], a[i+1]);
		storeNameId(a[i+1], a[i]);
		i++;
		names = names + a[i] + '/';
        if (i == a.length -2){
        	var parentId = a[0] + 'p';
        	storeParentNames(parentId, names);
        };
		i++;
	};
};

function wipeCurrIds() {
	for (var i=0; i<currentIntIds.length; i++) {
		currentIntIds[i] = "";
	};
};


