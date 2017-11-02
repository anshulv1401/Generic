const CONTENT=document.querySelector(".content");
const TABS=document.querySelectorAll(".tabs a");
const NEXTBUTTON=document.querySelector("#nextButton");
const PREVBUTTON=document.querySelector("#prevButton");


sessionStorage.imgDisplayCount=0;//used for loading more images when total images is not displayed on gallery page
//if make sure that the no. of photos display don't exceeds 12.
sessionStorage.peopleImgCount=0;//used for managing next and prev button
sessionStorage.placeImgCount=0;
sessionStorage.thingImgCount=0;
sessionStorage.nextclickcount=0;//number of clicks on next buttons to manage prev and next button

var startingNumpeo=0;//stores the starting number of the image displaying on the current page
var startingNumpla=0;
var startingNumthi=0;

//get the no.s of images for database

const totalPeoples=10;//number of people images
const totalPlaces=5;//number of places images
const totalThings=5;//number of things images

var totalImg=totalPeoples+totalPlaces+totalThings;

function galleryPopulation(noPeople,noPlace,noThing){

	var pe=parseInt(sessionStorage.peopleImgCount)+1;//helps making the program dynamic for ascending order of image display
	var pl=parseInt(sessionStorage.placeImgCount)+1;
	var th=parseInt(sessionStorage.thingImgCount)+1;
	var highest=0;

	//calculating highest of all three
	var peo=noPeople-sessionStorage.peopleImgCount;//used to calculate the maximum no. of iteration required to display all the images
	var pla=noPlace-sessionStorage.placeImgCount;//i.e. highest
	var thi=noThing-sessionStorage.thingImgCount;
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
	var i=1;
	sessionStorage.imgDisplayCount=0;//breaks the loop when imgDisplayCount reaches 12.
	for(;i<=looper;i++){
		//for diplaying images in alternate order
		if(i%3==1){
			//using images of people here
			if(pe<=noPeople){
				let j=pe++;//number of a images, provide acending order till that noPeople
				createImgElement("people",j);
				sessionStorage.imgDisplayCount++;
				sessionStorage.peopleImgCount++;
			}
		}else if(i%3==2){
			//using images of places here
			if(pl<=noPlace){
				let j=pl++;//number of a images
				createImgElement("place",j);
				sessionStorage.imgDisplayCount++;
				sessionStorage.placeImgCount++;
			}

		}else{
			//using images of things here
			if(th<=noThing){
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
	img.setAttribute("title","This right here is a "+path+".");//get the titles from database

	innerSection.appendChild(img);
	divSection.appendChild(innerSection);
	//adding everything to CONTENT
	CONTENT.appendChild(divSection);
}

//runs whenever page loads
clearImages();
clearSessionVariable();
galleryPopulation(totalPeoples,totalPlaces,totalThings);
PREVBUTTON.classList.add("hide");
if(sessionStorage.peopleImgCount>=totalPeoples && sessionStorage.placeImgCount>=totalPlaces && sessionStorage.thingImgCount>=totalThings){
	NEXTBUTTON.classList.add("hide");
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
	//resetting session variable
	sessionStorage.imgDisplayCount=0;//used for loading more images when total images is not displayed on gallery page
	//if make sure that the no. of photos display don't exceeds 12.
	sessionStorage.peopleImgCount=0;//used for managing next and prev button
	sessionStorage.placeImgCount=0;
	sessionStorage.thingImgCount=0;
	sessionStorage.nextclickcount=0;
}
function tabImgSel(current,e){
	

	clearImages();
	NEXTBUTTON.classList.remove("hide");
	PREVBUTTON.classList.add("hide");
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

function calPrevState(){

	
	sessionStorage.peopleImgCount=sessionStorage.peopleImgCount-startingNumpeo;
	//reduction of the images that are displayed currently
	sessionStorage.placeImgCount=sessionStorage.placeImgCount-startingNumpla;
	sessionStorage.thingImgCount=sessionStorage.thingImgCount-startingNumthi;

	if(sessionStorage.peopleImgCount>=totalPeoples && sessionStorage.placeImgCount>=totalPlaces && sessionStorage.thingImgCount>=totalThings){
			NEXTBUTTON.classList.add("hide");
	}
	if(sessionStorage.nextclickcount<=0){
			PREVBUTTON.classList.add("hide");
	}
	id()
	var num=0;
	var highest=0;
	//calculation highest no. of images
	if(sessionStorage.peopleImgCount>sessionStorage.placeImgCount){
		if(sessionStorage.peopleImgCount>sessionStorage.thingImgCount){
			highest=sessionStorage.peopleImgCount;
		}else{
			highest=sessionStorage.thingImgCount;
		}
	}else{
		if(sessionStorage.placeImgCount>sessionStorage.thingImgCount){
			highest=sessionStorage.placeImgCount;
		}else{
			highest=sessionStorage.thingImgCount;
		}
	}

	//reducing imgCount such that highest will reduce first until it reaches the other imgCount
	//with that only 12 reduction are allowed
	while(num<12){
		if(sessionStorage.peopleImgCount==highest){
			sessionStorage.peopleImgCount--;
			console.log(sessionStorage.peopleImgCount);
			num++;
			if(num==12){
				break;
			}
		}
		if(sessionStorage.placeImgCount==highest){
			sessionStorage.placeImgCount--;
			console.log(sessionStorage.placeImgCount);
			num++;
			if(num==12){
				break;
			}
		}
		if(sessionStorage.thingImgCount==highest){
			sessionStorage.thingImgCount--;
			console.log(sessionStorage.thingImgCount);
			num++;
			if(num==12){
				break;
			}
		}
		highest--;

	}


}

function manageNextPrev(current,e){

	e.preventDefault();

	if(current.innerHTML=="Next"){
		clearImages();
		startingNumpeo=sessionStorage.peopleImgCount;//storing displaying image
		startingNumpla=sessionStorage.placeImgCount;
		startingNumthi=sessionStorage.thingImgCount;

		galleryPopulation(totalPeoples,totalPlaces,totalThings);

		startingNumpeo=sessionStorage.peopleImgCount-startingNumpeo;//storing total increment in the images
		startingNumpla=sessionStorage.placeImgCount-startingNumpla;
		startingNumthi=sessionStorage.thingImgCount-startingNumthi;

		if(sessionStorage.peopleImgCount>=totalPeoples && sessionStorage.placeImgCount>=totalPlaces && sessionStorage.thingImgCount>=totalThings){
			NEXTBUTTON.classList.add("hide");
		}
		sessionStorage.nextclickcount++;
		PREVBUTTON.classList.remove("hide");
	}else{
		sessionStorage.nextclickcount--;
		clearImages();

		calPrevState();

		startingNumpeo=sessionStorage.peopleImgCount;//storing displaying image
		startingNumpla=sessionStorage.placeImgCount;
		startingNumthi=sessionStorage.thingImgCount;
		
		galleryPopulation(totalPeoples,totalPlaces,totalThings);

		startingNumpeo=sessionStorage.peopleImgCount-startingNumpeo;//storing total increment in the images
		startingNumpla=sessionStorage.placeImgCount-startingNumpla;
		startingNumthi=sessionStorage.thingImgCount-startingNumthi;

		if(sessionStorage.nextclickcount<=0){
			PREVBUTTON.classList.add("hide");
		}
		if(sessionStorage.peopleImgCount>=totalPeoples && sessionStorage.placeImgCount>=totalPlaces && sessionStorage.thingImgCount>=totalThings){
			
		}else{
			NEXTBUTTON.classList.remove("hide");
		}
	}

	//Poptrox.. Setting image to popup
	var foo=$('.content');
	foo.poptrox({
		usePopupCaption: true
	});
}

TABS[0].addEventListener("click",function(e){tabImgSel(this,e);},false);
TABS[1].addEventListener("click",function(e){tabImgSel(this,e);},false);
TABS[2].addEventListener("click",function(e){tabImgSel(this,e);},false);
TABS[3].addEventListener("click",function(e){tabImgSel(this,e);},false);
NEXTBUTTON.addEventListener("click",function(e){manageNextPrev(this,e);},false);
PREVBUTTON.addEventListener("click",function(e){manageNextPrev(this,e);},false);





