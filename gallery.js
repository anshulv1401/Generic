const CONTENT=document.querySelector(".content");
const TABS=document.querySelectorAll(".tabs a");
const NEXTBUTTON=document.querySelector("#nextButton");
const PREVBUTTON=document.querySelector("#prevButton");


const totalPeoples=13;//number of people images
const totalPlaces=13;//number of places images
const totalThings=13;//number of things images

sessionStorage.peopleImgCount=0;//used for managing next and prev button
sessionStorage.placeImgCount=0;
sessionStorage.thingImgCount=0;

//will be used to storge prev states of ImgCount
sessionStorage.setItem('peopleStack',0);
sessionStorage.setItem('placeStack',0);
sessionStorage.setItem('thingStack',0);

//since, im this alogritum the stack array stores one ahead of the required info, so to manage that we are using 
// storage key to set stack one step back.
sessionStorage.sKeyPeo=0;
sessionStorage.sKeyPla=0;
sessionStorage.sKeyThi=0;

var totalImg=totalPeoples+totalPlaces+totalThings;

function galleryAllPopulation(){

	var pe=parseInt(sessionStorage.peopleImgCount)+1;//helps making the program dynamic for ascending order of image display
	var pl=parseInt(sessionStorage.placeImgCount)+1;
	var th=parseInt(sessionStorage.thingImgCount)+1;
	var highest=0;

	//calculating highest of all three
	var peo=totalPeoples-sessionStorage.peopleImgCount;//used to calculate the maximum no. of iteration required to display all the images
	var pla=totalPlaces-sessionStorage.placeImgCount;//i.e. highest
	var thi=totalThings-sessionStorage.thingImgCount;
	if(pla>peo){
		if(pla>thi){
			highest=pla;
		}else{
			highest=thi;
		}
	}else{
		if(peo>thi){
			highest=peo;
		}else{
			highest=thi;
		}
	}
	//using 3 times of highest as a looper,
	//since loop need to be run that many times to display
	//all images of highest image containing category
	var looper=highest*3
	sessionStorage.imgDisplayCount=0;//breaks the loop when imgDisplayCount reaches 12.
	for(var i=1;i<=looper;i++){
		//for diplaying images in alternate order
		if(i%3==1){
			//using images of people here
			if(pe<=totalPeoples){
				let j=pe++;//number of a images, provide acending order till that noPeople
				createImgElement("people",j);
				sessionStorage.imgDisplayCount++;
				sessionStorage.peopleImgCount++;
			}
		}else if(i%3==2){
			//using images of places here
			if(pl<=totalPlaces){
				let j=pl++;//number of a images
				createImgElement("place",j);
				sessionStorage.imgDisplayCount++;
				sessionStorage.placeImgCount++;
			}

		}else{
			//using images of things here
			if(th<=totalThings){
				let j=th++;//number of a images
				createImgElement("thing",j);
				sessionStorage.imgDisplayCount++;
				sessionStorage.thingImgCount++;
			}
		}
		if(sessionStorage.imgDisplayCount>=12){
			break;
		}
	}
}

function galleryOtherPopulation(category){
	
	var count = 0;
	var max=0;
	if(category=="people"){
		max=totalPeoples;
		count = parseInt(sessionStorage.peopleImgCount)+1;
	}else if(category=="place"){
		max=totalPlaces;
		count = parseInt(sessionStorage.placeImgCount)+1;
	}else{
		max=totalThings;
		count = parseInt(sessionStorage.thingImgCount)+1;
	}

	sessionStorage.imgDisplayCount=0;
	for(var i=1;i<=max;i++){
		let j=count++;
		createImgElement(category,j);
		sessionStorage.imgDisplayCount++;
		if(sessionStorage.imgDisplayCount==12 || (count-1)>=max){
			break;
		}
	}


	if(category=="people"){
		sessionStorage.peopleImgCount=count-1;
	}else if(category=="place"){
		sessionStorage.placeImgCount=count-1;
	}else{
		sessionStorage.thingImgCount=count-1;
	}


}


function createImgElement(path,j){

	//adding div tag
	var divSection=document.createElement("div");
	divSection.setAttribute("class","media all "+path);

	//adding a tag
	var innerSection=document.createElement("a");
	innerSection.setAttribute("href","images/gallery_img/"+path+"/0"+j+".jpg");

	//adding img tag
	var img=document.createElement("img");
	img.setAttribute("src","images/gallery_img/"+path+"/thumb/0"+j+".jpg");

	img.setAttribute("alt","");
	img.setAttribute("title","This right here is a "+path+".");//get the titles from database

	innerSection.appendChild(img);
	divSection.appendChild(innerSection);
	//adding everything to CONTENT
	CONTENT.appendChild(divSection);
}

function clearImages(){
	var i=true;
	//removing all the tags in CONTECT element before adding
	while(i){
		i=false;
		if(CONTENT.hasChildNodes()){
			i=true;
			CONTENT.removeChild(CONTENT.childNodes[0]);
		}
	}
}
function clearSessionVariable(){
	
	//used for managing next and prev button
	sessionStorage.peopleImgCount=0;
	sessionStorage.placeImgCount=0;
	sessionStorage.thingImgCount=0;
	//inserting an array with 0 in sessionStorage with json parsing
	sessionStorage.setItem('peopleStack',0);
	sessionStorage.setItem('placeStack',0);
	sessionStorage.setItem('thingStack',0);
	
	sessionStorage.sKeyPeo=0;
	sessionStorage.sKeyPla=0;
	sessionStorage.sKeyThi=0;

}

function tabImgSel(current,e){
	
	e.preventDefault();
	clearImages();
	clearSessionVariable();
	
	
	PREVBUTTON.classList.add("hide");
	//setting data to display when a tab is click using tab Attribute to identify the tab
	var locFolder=current.getAttribute("data-tag").trim();
	if(locFolder=="all"){
		if(totalImg == sessionStorage.peopleImgCount+sessionStorage.placeImgCount+sessionStorage.thingImgCount){
			NEXTBUTTON.classList.add("hide");
		}else{
			NEXTBUTTON.classList.remove("hide");	
		}
		galleryAllPopulation();
	}else{
		galleryOtherPopulation(locFolder);

		if(locFolder=="people"){
			if(sessionStorage.peopleImgCount>=totalPeoples){
				NEXTBUTTON.classList.add("hide");
			}else{
				NEXTBUTTON.classList.remove("hide");	
			}
		}else if(locFolder=="place"){
			if(sessionStorage.placeImgCount>=totalPlaces){
				NEXTBUTTON.classList.add("hide");
			}else{
				NEXTBUTTON.classList.remove("hide");	
			}
		}else{
			if(sessionStorage.thingImgCount>=totalThings){
				NEXTBUTTON.classList.add("hide");
			}else{
				NEXTBUTTON.classList.remove("hide");	
			}
		}
	}
	

	//Poptrox.. Setting image to popup
	var foo=$('.content');
	foo.poptrox({
		usePopupCaption: true
	});	

}

function pushToStack(data,name){
	//retriving from the 'name' from sessionStorage and parsing
	var current=sessionStorage.getItem(name);

	if(current==0){// check if an item is already registered
		current=[];// if not, we initiate an empty array
	}else{
		current=JSON.parse(current);//else parse whatever is in
	}
	//pushing data to 'name'
	current.push(data);
	//setting back that 'name' to sessionStorage after stringifying
	sessionStorage.setItem(name,JSON.stringify(current));

}

function popFromStack(name){

	//retriving from the 'name' from sessionStorage and parsing
	var current=sessionStorage.getItem(name);
	if(current==0){// check if an item is already registered
		current=[];// if not, we initiate an empty array
	}else{
		current=JSON.parse(current);//else parse whatever is in
	}

	//poping data to 'name'
	var data=current.pop();
	//setting back that 'name' to sessionStorage after stringifying
	sessionStorage.setItem(name,JSON.stringify(current));
	//returing that poped item
	return data;
}

function nextPrevManager(button,e) {
	e.preventDefault();
	clearImages();
	//getting value of current tab to manage images
	var currentTabValue=document.querySelector(".tabs a.active").getAttribute("data-tag").trim();
	if(button.id=="nextButton"){

		if(currentTabValue=="all"){
			//pushing current state of sessionStorage imgCount on to stacks
			
			pushToStack(sessionStorage.sKeyPeo,'peopleStack');
			pushToStack(sessionStorage.sKeyPla,'placeStack');
			pushToStack(sessionStorage.sKeyThi,'thingStack');

			sessionStorage.sKeyPeo=sessionStorage.peopleImgCount;
			sessionStorage.sKeyPla=sessionStorage.placeImgCount;
			sessionStorage.sKeyThi=sessionStorage.thingImgCount;

			galleryAllPopulation();

			// console.log(sessionStorage.sKeyPeo);
			// console.log(sessionStorage.sKeyPla);
			// console.log(sessionStorage.sKeyThi);

			// console.log(sessionStorage.peopleImgCount);
			// console.log(sessionStorage.placeImgCount);
			// console.log(sessionStorage.thingImgCount);

			// console.log(sessionStorage.peopleStack);
			// console.log(sessionStorage.placeStack);
			// console.log(sessionStorage.thingStack);
			//if tatalImg is equal to sum of all 3 category imgCount then hide NEXT button
			if(totalImg <= parseInt(sessionStorage.peopleImgCount)+parseInt(sessionStorage.placeImgCount)
				+parseInt(sessionStorage.thingImgCount)){
				NEXTBUTTON.classList.add("hide");
			}
			//if sum of all 3 category imgCount is equal to or less then 12, i.e. it is the first  then show PREV button
			if(parseInt(sessionStorage.peopleImgCount)+parseInt(sessionStorage.placeImgCount)
				+parseInt(sessionStorage.thingImgCount)>12){
				PREVBUTTON.classList.remove("hide");
			}
		}else{
			galleryOtherPopulation(currentTabValue);
			if(currentTabValue=="people"){
				pushToStack(sessionStorage.sKeyPeo,'peopleStack');
				sessionStorage.sKeyPeo=sessionStorage.peopleImgCount;
				if(sessionStorage.peopleImgCount>=totalPeoples){
					NEXTBUTTON.classList.add("hide");
				}
				if(sessionStorage.peopleImgCount>12){
					PREVBUTTON.classList.remove("hide");
				}
			}else if(currentTabValue=="place"){
				pushToStack(sessionStorage.sKeyPla,'placeStack');
				sessionStorage.sKeyPla=sessionStorage.placeImgCount;
				if(sessionStorage.placeImgCount>=totalPlaces){
					NEXTBUTTON.classList.add("hide");
				}
				if(sessionStorage.placeImgCount>12){
					PREVBUTTON.classList.remove("hide");
				}
			}else{
				pushToStack(sessionStorage.sKeyThi,'thingStack');
				sessionStorage.sKeyThi=sessionStorage.thingImgCount;
				if(sessionStorage.thingImgCount>=totalThings){
					NEXTBUTTON.classList.add("hide");
				}
				if(sessionStorage.thingImgCount>12){
					PREVBUTTON.classList.remove("hide");
				}
			}
		}

	}else{//prev button
		
		clearImages();
		if(currentTabValue=="all"){

			sessionStorage.sKeyPeo=popFromStack('peopleStack');
			sessionStorage.sKeyPla=popFromStack('placeStack');
			sessionStorage.sKeyThi=popFromStack('thingStack');

			sessionStorage.peopleImgCount=sessionStorage.sKeyPeo;
			sessionStorage.placeImgCount=sessionStorage.sKeyPla;
			sessionStorage.thingImgCount=sessionStorage.sKeyThi;

			galleryAllPopulation();

			if(totalImg > parseInt(sessionStorage.peopleImgCount)+parseInt(sessionStorage.placeImgCount)
				+parseInt(sessionStorage.thingImgCount)){
				NEXTBUTTON.classList.remove("hide");
			}
			//if sum of all 3 category imgCount is equal to or less then 12, i.e. it is the first  then show PREV button
			if(parseInt(sessionStorage.peopleImgCount)+parseInt(sessionStorage.placeImgCount)
				+parseInt(sessionStorage.thingImgCount)<=12){
				PREVBUTTON.classList.add("hide");
			}

		}else{
				
			if(currentTabValue=='people'){
				sessionStorage.sKeyPeo=popFromStack('peopleStack');
				sessionStorage.peopleImgCount=sessionStorage.sKeyPeo;
				galleryOtherPopulation(currentTabValue);
				if(totalPeoples>sessionStorage.peopleImgCount){
					NEXTBUTTON.classList.remove("hide");
				}
				if(sessionStorage.peopleImgCount<=12){
					PREVBUTTON.classList.add("hide");
				}
			}else if(currentTabValue=='place'){
				sessionStorage.sKeyPla=popFromStack('placeStack');
				sessionStorage.placeImgCount=sessionStorage.sKeyPla;
				galleryOtherPopulation(currentTabValue);
				if(totalPlaces>sessionStorage.placeImgCount){
					NEXTBUTTON.classList.remove("hide");
				}
				if(sessionStorage.placeImgCount<=12){
					PREVBUTTON.classList.add("hide");
				}
			}else{
				sessionStorage.sKeyThi=popFromStack('thingStack');
				sessionStorage.thingImgCount=sessionStorage.sKeyThi;
				galleryOtherPopulation(currentTabValue);
				if(totalThings>sessionStorage.thingImgCount){
					NEXTBUTTON.classList.remove("hide");
				}
				if(sessionStorage.thingImgCount<=12){
					PREVBUTTON.classList.add("hide");
				}
			}
		}
	}

	//Poptrox.. Setting image to popup
	var foo=$('.content');
	foo.poptrox({
		usePopupCaption: true
	});


}
clearImages();
clearSessionVariable();
if(totalImg == sessionStorage.peopleImgCount+sessionStorage.placeImgCount+sessionStorage.thingImgCount){
	NEXTBUTTON.classList.add("hide");
}
PREVBUTTON.classList.add("hide");
galleryAllPopulation()//display in alternate fashion;

var i=0;
while(TABS[i]){
	TABS[i].addEventListener("click",function(e){tabImgSel(this,e);},false);
	i++;
}
NEXTBUTTON.addEventListener("click",function(e){nextPrevManager(this,e);},false);
PREVBUTTON.addEventListener("click",function(e){nextPrevManager(this,e);},false);

