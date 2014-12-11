var myList;
var checklist;
var table;
  var tr;
  var td;



document.addEventListener("DOMContentLoaded", initFunc);
function initFunc(){
	    myList = [];
        checklist = [];




       

		 if (localStorage.getItem("grocery-fan00036") && localStorage.getItem("grocerychecklist-fan00036")) {
			myList = JSON.parse(localStorage.getItem("grocery-fan00036"));
			checklist = JSON.parse(localStorage.getItem("grocerychecklist-fan00036"));
			//convert from String to Array
			addTable();

		 } else {



		 }
	document.querySelector("#btnAdd").addEventListener("click", addbtnClick)
}
function addbtnClick(ev){
		ev.preventDefault();
		var newItem = document.querySelector("#item");
	
		myList.push( newItem.value);
		checklist.push("false");

		
		localStorage.setItem("grocery-fan00036", JSON.stringify(myList) );
		localStorage.setItem("grocerychecklist-fan00036", JSON.stringify(checklist) );
		//convert from Array to String.
	  addTable();
		newItem.value="";
	
	
	
}



function addTable(){
	//var table = document.createElement("table");
	if($(".tableList")){
		$(".tableList").remove();
	}
    var table='<table class="tableList">';
	for(var i=0; i<myList.length;i++){
	    table+='<tr>';
		table+='<td class="td1">';
		if(checklist[i]=="false"){
		table+='<input type="checkbox"/>';
		}else{
			table+='<input type="checkbox" checked/>';
			
		}
		table+='</td>';
		table+='<td class="td2">'+myList[i]+'</td>';
	    table+='<td class="td3"><img src="img/no.svg"></td>';
	    table+='</tr>';
	}
	    table+='</table>';
	$('.output').append(table);
	$('input').bind('change',checkboxchange);
	$('img').bind('click', removeItem);
}

function checkboxchange(ev)
{
	console.log('checkboxchange');
    var checkbox=$(this)[0];
    
    if(checkbox.checked)
    {
        var i=$(this).parent().parent()[0].sectionRowIndex;
        
        checklist[i]="true";
        localStorage.setItem("grocerychecklist-fan00036", JSON.stringify(checklist) );
    }else{
		 var i=$(this).parent().parent()[0].sectionRowIndex;
        
        checklist[i]="false";
        localStorage.setItem("grocerychecklist-fan00036", JSON.stringify(checklist) );
	}

};



function removeItem(ev){

	var p = $(this).parent().prev();
    var index=$(this).parent().parent()[0].sectionRowIndex;
  
    
  for(var i=0;i<myList.length;i++){
  	if(myList[i] == p.text()){
      //found the match
      myList.splice(i, 1);
	 checklist.splice(i,1);
    }
  }
  localStorage.setItem("grocery-fan00036", JSON.stringify(myList) );
  localStorage.setItem("grocerychecklist-fan00036", JSON.stringify(checklist) );
  //removeRow(index);
	addTable();
};

