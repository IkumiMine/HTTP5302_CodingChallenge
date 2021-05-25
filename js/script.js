window.onload = function (){
		displayResult();
		addColorToRole();
}

//Function to display result from API
function displayResult(){
		var url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";

		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);
		xhttp.onreadystatechange = function (){
				if(xhttp.readyState == 4 && xhttp.status == 200){
						var employees = JSON.parse(xhttp.responseText);

						for (var i = 1; i <= Object.keys(employees).length; i++){
								
							//console.log(document.getElementsByClassName("employee-output"));
							var id = employees[i].employeeid;
							var name = employees[i].employeefname + " " + employees[i].employeelname; 
							var bio = employees[i].employeebio;
							var result = "";

							//console.log(employees[i].employeeisfeatured);

							//Put result in the HTML elements
							result += '<div class="container">';

							//If the employee is featured, add a crown image
							if(employees[i].employeeisfeatured == 1){
								result += '<div class="featured"><img src="images/crown.png" class="crown-img"></div>';
							}

							result += '<div class="img-container"><img src="';
							result += 'http://sandbox.bittsdevelopment.com/code1/employeepics/' + id + '.jpg "' + 'alt="a picture of ' + name + '" class="img">' + '</div>';
							result += '<div class="bio-container"><h2 class="name">' + name + '</h2>';
							result += '<p class="bio">' + bio + '</p></div><div class="role-container">';

							//If role is more than 1, display all of them otherwise display 1 role
							if(employees[i].roles.length == 1){				
								var roleId = employees[i].roles[0].roleid;
								result += '<span class="role" id="' + roleId + '">' + employees[i].roles[0].rolename + '</span>';
							} else {
								for (var j = 0; j < employees[i].roles.length; j++){
									var roleId = employees[i].roles[j].roleid;
									result += '<span class="role" id="'+ roleId + '">' + employees[i].roles[j].rolename + '</span>';
								}
							}

							result += '</div></div>';

							//Display all result in HTML
							document.getElementById("flex").innerHTML += result;
				
						}
				}
		}
		xhttp.send();
}

//Function to add color to the role element depends on each role
function addColorToRole(){
		var url = "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";

		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);
		xhttp.onreadystatechange = function (){
				if(xhttp.readyState == 4 && xhttp.status == 200){
						var rolesApi = JSON.parse(xhttp.responseText);
						//console.log(document.getElementsByClassName("role").length);
						//console.log(document.getElementsByClassName("role-container")[0].childNodes[0].id);

						for(var i = 0; i < rolesApi.length; i++){
								//console.log(roles[i].roleid);
								var roleApiId = rolesApi[i].roleid;
								var role = document.getElementsByClassName("role");
								for(var j = 0; j < role.length; j++){
										//console.log(role[j].id);
										var roleId = role[j].id;

										//If role ID from API and role ID in HTML are same, change the backgraound color according to the data from API
										if(roleApiId == roleId){
												//If rolecolor is #FDFFF7, set font color to black
												//If not, set font color to #FDFFF7
											 	if(rolesApi[i].rolecolor == "#FDFFF7"){
													  role[j].style.color = "black";
											  } else {
													role[j].style.color = "#FDFFF7";
												}
												role[j].style.background = rolesApi[i].rolecolor;
										}
								}
						}
				}
		}
		xhttp.send();
}