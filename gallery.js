const CONTENT=document.querySelector(".content");
const TABS=document.querySelectorAll(".tabs a");
const NEXTBUTTON=document.querySelector("#nextButton");
const PREVBUTTON=document.querySelector("#prevButton");

sessionStorage.imgDisplayCount=0;//used for loading more images when total images is not displayed on gallery page
//if make sure that the no. of photos display don't exceeds 12.
sessionStorage.peopleImgCount=0;//used for managing next and prev button
sessionStorage.placeImgCount=0;
sessionStorage.thingImgCount=0;

//get the no.s of images for database

var totalPeoples=8;//number of people images
var totalPlaces=4;//number of places images
var totalThings=4;//number of thigs images

var totalImg=totalPeoples+totalPlaces+totalThings;

function galleryPopulation(noPeople,noPlace,noThing){
	var pe=sessionStorage.peopleImgCount;//helps making the program dynamic for ascending order of image display
	var pl=sessionStorage.placeImgCount;
	var th=sessionStorage.thingImgCount;
	var highest=0;

	//calculating highest of all three
	if(noPlace>noPeople){
		if(noPlace>noThing){
			highest=noPlace;
		}else{
			highest=noThing;
		}
	}else{
		if(noPeople>noThing){
			highest=noPeople;
		}else{
			highest=noThing;
		}
	}
	//using 3 times of highest as a looper,
	//since loop need to be run that many times to display
	//all images of highest image containing category
	var looper=highest*3
	var i=sessionStorage.imgDisplayCount+1;
	sessionStorage.imgDisplayCount=0;
	for(;i<=looper;i++){
		//for diplaying images in alternate order
		if(i%3==1){
			//using images of people here
			if(pe<=noPeople){
				let j=++pe;//number of a images, provide acending order till that noPeople
				createImgElement("people",j);
				sessionStorage.imgDisplayCount++;
				sessionStorage.peopleImgCount++;
			}
		}else if(i%3==2){
			//using images of places here
			if(pl<=noPlace){
				let j=++pl;//number of a images
				createImgElement("place",j);
				sessionStorage.imgDisplayCount++;
				sessionStorage.placeImgCount++;
			}

		}else{
			//using images of things here
			if(th<=noThing){
				let j=++th;//number of a images
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

function createImgElement(path,j){

	//adding div tag
	var divSection=document.createElement("div");
	divSection.setAttribute("class","media all "+path);

	//adding a tag
	var innerSection=document.createElement("a");
	innerSection.setAttribute("href","images/fulls/"+path+"/0"+j+".jpg");

	//adding img tag
	var img=document.createElement("img");
	img.setAttribute("src","images/thumbs/"+path+"/0"+j+".jpg");

	img.setAttribute("alt","");
	img.setAttribute("title","This right here is a caption.");//get the titles from database

	innerSection.appendChild(img);
	divSection.appendChild(innerSection);
	//adding everything to CONTENT
	CONTENT.appendChild(divSection);
}

//runs whenever page loads
clearSessionVariable();
galleryPopulation(totalPeoples,totalPlaces,totalThings);


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
	//resetting session variable
	sessionStorage.imgDisplayCount=0;//used for loading more images when total images is not displayed on gallery page
	//if make sure that the no. of photos display don't exceeds 12.
	sessionStorage.peopleImgCount=0;//used for managing next and prev button
	sessionStorage.placeImgCount=0;
	sessionStorage.thingImgCount=0;
}
function tabImgSel(current,e){
	
	clearImages();
	//setting data to display when a tab is click using tab Attribute to identify the tab
	var locFolder=current.getAttribute("data-tag").trim();
	let peo=totalPeoples,
		pla=totalPlaces,
		thi=totalThings;
	if(locFolder=="all"){
		//getting data from
		
	}else if(locFolder=="people"){
		pla=0;
		thi=0;
	}else if(locFolder=="place"){
		peo=0;
		thi=0;
	}else if(locFolder=="thing"){
		peo=0;
		pla=0;
	}
	clearSessionVariable();
	galleryPopulation(peo,pla,thi);

	//Poptrox.. Setting image to popup
	var foo=$('.content');
	foo.poptrox({
		usePopupCaption: true
	});	

}

function manageNextPrev(current,e){

	e.preventDefault();
	if(current.innerHTML=="Next"){
		clearImages();
		galleryPopulation(totalPeoples,totalPlaces,totalThings);
	}else{

	}
	console.log(sessionStorage.clickcount);
}

TABS[0].addEventListener("click",function(e){tabImgSel(this,e);},false);
TABS[1].addEventListener("click",function(e){tabImgSel(this,e);},false);
TABS[2].addEventListener("click",function(e){tabImgSel(this,e);},false);
TABS[3].addEventListener("click",function(e){tabImgSel(this,e);},false);
NEXTBUTTON.addEventListener("click",function(e){manageNextPrev(this,e);},false);
PREVBUTTON.addEventListener("click",function(e){manageNextPrev(this,e);},false);





