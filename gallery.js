const CONTENT=document.querySelector(".content");
const TABS=document.querySelectorAll(".tabs a");
const NEXTBUTTON=document.querySelector("#nextButton");
const PREVBUTTON=document.querySelector("#prevButton");

//get the no. of images for database

var totalPeoples=8;//number of people images
var totalPlaces=4;//number of places images
var totalThings=4;//number of thigs images

var totalImg=totalPeoples+totalPlaces+totalThings;

function galleryPopulation(noPeople,noPlace,noThing){
	var pe=noPeople+1;
	var pl=noPlace+1;
	var th=noThing+1;
	var totalImg=noPeople+noPlace+noThing;
	for(var i=1;i<=totalImg;i++){
		
		//helps making the program dynamic for ascending order of image display
		

		var locFolder;//folder which contain images of spacific category
		var j;//number of a images
		if(noPeople!=0){
			j=pe-(noPeople--);//to give a ascending order increment
			locFolder= "people";

		}else if(noPlace!=0){
			j=pl-(noPlace--);
			locFolder="place";

		}else if(noThing!=0){
			j=th-(noThing--);
			locFolder="thing";

		}
		var divSection=document.createElement("div");
		divSection.setAttribute("class","media all "+locFolder);

		var innerSection=document.createElement("a");
		innerSection.setAttribute("href","images/fulls/"+locFolder+"/0"+j+".jpg");

		var img=document.createElement("img");
		img.setAttribute("src","images/thumbs/"+locFolder+"/0"+j+".jpg");

		img.setAttribute("alt","");
		img.setAttribute("title","This right here is a caption.");//get the titles from database

		innerSection.appendChild(img);
		divSection.appendChild(innerSection);
		CONTENT.appendChild(divSection);
	}
}

galleryPopulation(totalPeoples,totalPlaces,totalThings);

function tabImgSel(current,e){
	var i=true;
	while(i){
		i=false;
		if(CONTENT.hasChildNodes()){
			i=true;
			CONTENT.removeChild(CONTENT.childNodes[0]);
		}
	}

	var locFolder=current.getAttribute("data-tag").trim();
	let peo=totalPeoples,pla=totalPlaces,thi=totalThings;
	if(locFolder=="all"){
		peo=totalPeoples;
		pla=totalPlaces;
		thi=totalThings;
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
	galleryPopulation(peo,pla,thi);
	

}

function clickCounter(){



}

function manageNextPrev(current,e){

	e.preventDefault();
	if(typeof(Storage)!=="undefined"){
		if(sessionStorage.clickcount){
			if(current.innerHTML=="Prev"){
				if(sessionStorage.clickcount!=0){
					sessionStorage.clickcount=Number(sessionStorage.clickcount)-12;
				}
			}
			else{
				if((sessionStorage.clickcount+12)<totalImg){
					sessionStorage.clickcount=Number(sessionStorage.clickcount)+12;
				}
			}
		}
	}
	console.log(sessionStorage.clickcount);

}

TABS[0].addEventListener("click",function(e){tabImgSel(this,e);},false);
TABS[1].addEventListener("click",function(e){tabImgSel(this,e);},false);
TABS[2].addEventListener("click",function(e){tabImgSel(this,e);},false);
TABS[3].addEventListener("click",function(e){tabImgSel(this,e);},false);
NEXTBUTTON.addEventListener("click",function(e){manageNextPrev(this,e);},false);
PREVBUTTON.addEventListener("click",function(e){manageNextPrev(this,e);},false);


