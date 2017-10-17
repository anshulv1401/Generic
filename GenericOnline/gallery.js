const CONTENT=document.querySelector(".content");
const TABS=document.querySelectorAll(".tabs a");
const NEXTBUTTON=document.querySelector("#nextButton");
const PREVBUTTON=document.querySelector("#prevButton");
NEXTBUTTON.classList.add("hide");
PREVBUTTON.classList.add("hide");

sessionStorage.imgDisplayCount=0;//used for loading more images when total images is not displayed on gallery page
//if make sure that the no. of photos display don't exceeds 12.
sessionStorage.peopleImgCount=0;//used for managing next and prev button
sessionStorage.placeImgCount=0;
sessionStorage.thingImgCount=0;
sessionStorage.nextclickcount=0;//number of clicks on next buttons to manage prev and next button
sessionStorage.peopleCountstack=[];
sessionStorage.placeCountstack=[];
sessionStorage.thingCountstack=[];
//get the no.s of images for database

const totalPeoples=4;//number of people images
const totalPlaces=4;//number of places images
const totalThings=4;//number of things images

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
		if(sessionStorage.peopleImgCount>=totalPeoples && sessionStorage.placeImgCount>=totalPlaces && sessionStorage.thingImgCount>=totalThings){
			NEXTBUTTON.classList.add("hide");
		}
		sessionStorage.peopleCountstack.push(sessionStorage.peopleImgCount);
		sessionStorage.placeCountstack.push(sessionStorage.placeImgCount);
		sessionStorage.thingCountstack.push(sessionStorage.thingImgCount);
		sessionStorage.nextclickcount++;
		PREVBUTTON.classList.remove("hide");
	}else{
		PREVBUTTON.nextclickcount--;
		clearImages();
		sessionStorage.peopleImgCount=sessionStorage.peopleCountstack;
		sessionStorage.placeImgCount=sessionStorage.placeCountstack;
		sessionStorage.thingImgCount=sessionStorage.thingCountstack;
		galleryPopulation(totalPeoples,totalPlaces,totalThings);
		if(sessionStorage.nextclickcount<=0){
			PREVBUTTON.classList.add("hide");
		}
	}
	console.log(sessionStorage.clickcount);
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





