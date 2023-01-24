 var ChartZ1=null;
 var ChartZ2=null;
 var ChartZ3=null;
 var ChartZ12=null;
 var ChartZ13=null;
 var ChartZ23=null;
 var color1="rgba(27,167,179,0.5)";
 var color2="rgba(243,144,26,0.5)";
 var color3="rgba(146,39,146,0.5)";
 var color12="rgba(153,204,255,0.5)";
 var color13="rgba(204,255,153,0.5)";
 var color23="rgba(255,153,204,0.5)";
 
 var TEDScore={
  nbZ1:0,
  Z1Score:0.0,
  Z1Bins:[0,0,0,0,0,0,0,0,0,0,0],
  nbZ2:0,
  Z2Score:0.0,
  Z2Bins:[0,0,0,0,0,0,0,0,0,0,0],
  nbZ3:0,
  Z3Score:0.0,
  Z3Bins:[0,0,0,0,0,0,0,0,0,0,0],
  nbZ12:0,
  Z12Score:0.0,
  Z12Bins:[0,0,0,0,0,0,0,0,0,0,0],
  nbZ13:0,
  Z13Score:0.0,
  Z13Bins:[0,0,0,0,0,0,0,0,0,0,0],
  nbZ23:0,
  Z23Score:0.0,
  Z23Bins:[0,0,0,0,0,0,0,0,0,0,0],
  depress:0,
  anxiety:0,
  stress:0,
  emq:0,
  ASRS:0,
 }

 var GeneralInfo={
  date:null,
  interviewdate:null,
  ClientType:null,
  Gender:null,
  FirstName:null,
  LastName:null,
  Birthdate:null,
  Email:null,
  Address:null,
  City:null,
  State:null,
  ZIP:null,
  Country:null,
  HomePhone:null,
  CellPhone:null,
  WorkPhone:null,
  PersonalStatus:null,
  WorkStatus:null,
  ChildLiving:null,
 };

 var Issues={
  globalmot:null,
  finemot:null,
  visiospatial:null,
  coordination:null,
  reception:null,
  comprehension:null,
  anxiety:null,
  stress:null,
  depression:null,
  attention:null,
  memory:null,
  executive:null,
  reasonning:null,
  pbsolving:null,
  neurodev:null,
  neurolevel:null,
 };

var ENT={
  earinfection:null,
  hearloss:null,
  tinnitus:null,
  dizziness:null,
  auditorySensi:null,
  lastTest:null,
  epilepsy:null,
  healthprob:null,
  goals:null,
  goalexample:null,
};

var TEDlen=0;
var TEDquestionnary=new Array;
var TEDresults=new Array;
var TEDsequence=new Array;
var nbquestion=0;
var TEDisrunning=false;

function getRandomIntexclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is inclusive and the minimum is exclusive
}


function openResTab(evt, ResName) {
  var i, ResContent, ResLinks;
  ResContent = document.getElementsByClassName("ResContent");
  for (i = 0; i < ResContent.length; i++) {
    ResContent[i].style.display = "none";
  }
  ResLinks = document.getElementsByClassName("ResLinks");
  for (i = 0; i < ResLinks.length; i++) {
    ResLinks[i].className = ResLinks[i].className.replace(" active", "");
  }
  document.getElementById(ResName).style.display = "block";
  evt.currentTarget.className += " active";
}


function openAssTab(evt, AssName) {
  var i, AssContent, AssLinks;
  AssContent = document.getElementsByClassName("AssContent");
  for (i = 0; i < AssContent.length; i++) {
    AssContent[i].style.display = "none";
  }
  AssLinks = document.getElementsByClassName("AssLinks");
  for (i = 0; i < AssLinks.length; i++) {
    AssLinks[i].className = AssLinks[i].className.replace(" active", "");
  }
  document.getElementById(AssName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openTab(evt, TabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(TabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function init_graph(chartID,coloring){
  let nbbins=11;
  bins=[0,1,2,3,4,5,6,7,8,9,10];
  binscount=[0,0,0,0,0,60,0,0,0,20,100]
  const ctx = document.getElementById(chartID);
  myChart=new Chart(ctx, {
    type: "bar",
    data: {
    labels:bins,
    datasets: [{
    label:"",
    data:binscount,
    backgroundColor: coloring,
    borderColor: coloring,
    borderWidth: 1,
    },],
      },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
      });
    ///////////////////
  return myChart
}

function update_chart(myChart,binData){//put histo in %
  let sum = 0;
  for (let i = 0; i < binData.length; i++) {
    sum += binData[i];
  }
  for (let i = 0; i < binData.length; i++) {
    binData[i]=100*(binData[i]/=sum);
  }
  myChart.data.datasets[0].data=binData;
  myChart.update();
}

function saveGeneralInfo(){
  GeneralInfo.date= document.getElementById("Date").value;
  GeneralInfo.interviewdate= document.getElementById("InterviewDate").value;
  GeneralInfo.ClientType= document.getElementById("ClientType").value;
  GeneralInfo.Gender= document.getElementById("Gender").value;
  GeneralInfo.FirstName= document.getElementById("FirstName").value;
  GeneralInfo.LastName= document.getElementById("LastName").value;
  GeneralInfo.Birthdate= document.getElementById("Birthdate").value;
  GeneralInfo.Email= document.getElementById("Email").value;
  GeneralInfo.Address= document.getElementById("Adress").value;
  GeneralInfo.City= document.getElementById("City").value;
  GeneralInfo.State= document.getElementById("State").value;
  GeneralInfo.ZIP= document.getElementById("ZIP").value;
  GeneralInfo.Country= document.getElementById("Country").value;
  GeneralInfo.HomePhone= document.getElementById("homephone").value;
  GeneralInfo.CellPhone= document.getElementById("cellphone").value;
  GeneralInfo.WorkPhone= document.getElementById("workphone").value;
  GeneralInfo.PersonalStatus= document.getElementById("persoStatus").value;
  GeneralInfo.WorkStatus= document.getElementById("workStatus").value;
  GeneralInfo.ChildLiving= document.getElementById("chidlLive").value;
  document.getElementById("ISSUEbttn").disabled = false;
  ////////////print info to result page /////////////////////////////////////
  document.getElementById("ResDate").innerHTML=GeneralInfo.date;
  document.getElementById("ResInterviewDate").innerHTML=GeneralInfo.interviewdate;
  document.getElementById("ResClientType").innerHTML=GeneralInfo.ClientType;
  document.getElementById("ResGender").innerHTML=GeneralInfo.Gender;;
  document.getElementById("ResFirstName").innerHTML=GeneralInfo.FirstName;
  document.getElementById("ResLastName").innerHTML=GeneralInfo.LastName;
  document.getElementById("ResBirthdate").innerHTML=GeneralInfo.Birthdate;
  document.getElementById("ResEmail").innerHTML=GeneralInfo.Email;
  document.getElementById("ResAdress").innerHTML=GeneralInfo.Address;
  document.getElementById("ResCity").innerHTML=GeneralInfo.City;
  document.getElementById("ResState").innerHTML=GeneralInfo.State;
  document.getElementById("ResZIP").innerHTML= GeneralInfo.ZIP;
  document.getElementById("ResCountry").innerHTML=GeneralInfo.Country;
  document.getElementById("Reshomephone").innerHTML=GeneralInfo.HomePhone;
  document.getElementById("Rescellphone").innerHTML=GeneralInfo.CellPhone;
  document.getElementById("Resworkphone").innerHTML=GeneralInfo.WorkPhone;
  document.getElementById("RespersoStatus").innerHTML=GeneralInfo.PersonalStatus;
  document.getElementById("ResworkStatus").innerHTML=GeneralInfo.WorkStatus;
  document.getElementById("ReschidlLive").innerHTML=GeneralInfo.ChildLiving;
}

function saveIssues(){
  Issues.globalmot= document.getElementById("globalmot").value;
  Issues.finemot= document.getElementById("finemot").value;
  Issues.visiospatial= document.getElementById("visiospatial").value;
  Issues.coordination= document.getElementById("coordination").value;
  Issues.reception= document.getElementById("reception").value;
  Issues.comprehension= document.getElementById("comprehension").value;
  Issues.anxiety= document.getElementById("anxiety").value;
  Issues.stress= document.getElementById("stress").value;
  Issues.depression= document.getElementById("depression").value;
  Issues.attention= document.getElementById("attention").value;
  Issues.memory= document.getElementById("memory").value;
  Issues.executive= document.getElementById("executive").value;
  Issues.reasonning= document.getElementById("reasonning").value;
  Issues.pbsolving= document.getElementById("pbsolving").value;
  Issues.neurodev= document.getElementById("neurodev").value;
  Issues.neurolevel= document.getElementById("neurolevel").value;
  document.getElementById("ENTbttn").disabled = false;
  ///////// print issues in result ////////
  document.getElementById("Resglobalmot").innerHTML=Issues.globalmot;
  document.getElementById("Resfinemot").innerHTML=Issues.finemot;
  document.getElementById("Resvisiospatial").innerHTML=Issues.visiospatial;
  document.getElementById("Rescoordination").innerHTML=Issues.coordination;
  document.getElementById("Resreception").innerHTML=Issues.reception;
  document.getElementById("Rescomprehension").innerHTML=Issues.comprehension;
  document.getElementById("Resanxiety").innerHTML=Issues.anxiety;
  document.getElementById("Resstress").innerHTML=Issues.stress;
  document.getElementById("Resdepression").innerHTML=Issues.depression;
  document.getElementById("Resattention").innerHTML=Issues.attention;
  document.getElementById("Resmemory").innerHTML=Issues.memory;
  document.getElementById("Resexecutive").innerHTML=Issues.executive;
  document.getElementById("Resreasonning").innerHTML=Issues.reasonning;
  document.getElementById("Respbsolving").innerHTML=Issues.pbsolving;
  document.getElementById("Resneurodev").innerHTML=Issues.neurodev;
  document.getElementById("Resneurolevel").innerHTML=Issues.neurolevel;
}

function saveENT(){
  ENT.earinfection= document.getElementById("earinfection").value;
  ENT.hearloss= document.getElementById("hearloss").value;
  ENT.tinnitus= document.getElementById("tinnitus").value;
  ENT.dizziness= document.getElementById("dizziness").value;
  ENT.auditorySensi= document.getElementById("auditorySensi").value;
  ENT.lastTest= document.getElementById("lastTest").value;
  ENT.epilepsy= document.getElementById("epilepsy").value;
  ENT.healthprob= document.getElementById("healthprob").value;
  ENT.goals= document.getElementById("goals").value;
  ENT.goalexample= document.getElementById("goalexample").value;
  ////// print ENT in result //////////////////////
  document.getElementById("Researinfection").innerHTML=ENT.earinfection;
  document.getElementById("Reshearloss").innerHTML=ENT.hearloss;
  document.getElementById("Restinnitus").innerHTML=ENT.tinnitus;
  document.getElementById("Resdizziness").innerHTML=ENT.dizziness;
  document.getElementById("ResauditorySensi").innerHTML=ENT.auditorySensi;
  document.getElementById("ReslastTest").innerHTML=ENT.lastTest;
  document.getElementById("Resepilepsy").innerHTML=ENT.epilepsy;
  document.getElementById("Reshealthprob").innerHTML=ENT.healthprob;
  document.getElementById("Resgoals").innerHTML=ENT.goals;
  document.getElementById("Resgoalexample").innerHTML=ENT.goalexample;

}
function updateSlider(){//update label of slider
  let slideVal=document.getElementById("slideResponse").value;
  document.getElementById("slidevalue").innerHTML=slideVal.toString();
}

function resetSlider(){//update label of slider
  let slide=document.getElementById("slideResponse");
  const tempo=0;//getRandomIntexclusive(0, 10);
  slide.value=tempo;//tempo;//0 for an ok reset --> automatic response
  document.getElementById("slidevalue").innerHTML=tempo.toString();
}


function resetProgBar(){//update label of slider
  let prog=document.getElementById("progressbar");
  prog.value=0;
  document.getElementById("progress").innerHTML="0"+"/"+TEDlen.toString();
}

function updateProgBar(){//update label of slider
  let prog=document.getElementById("progressbar");
  prog.value=100*((nbquestion+1)/TEDlen);
  document.getElementById("progress").innerHTML=(nbquestion+1).toString()+"/"+TEDlen.toString();
}


function getResponse(){
  var answer={
    num_questions:null,
    question:null,
    zone1:false,
    zone2:false,
    zone3:false,
    zone12:false,
    zone13:false,
    zone23:false,
    Score1:0,
    Score2:0,
    Score3:0,
    Score12:0,
    Score13:0,
    Score23:0,
    depress:0,
    anxiety:0,
    stress:0,
    emq:0,
    ASRS:0,};
  answer.num_questions=TEDquestionnary[TEDsequence[nbquestion]].num_questions;
  answer.question=TEDquestionnary[TEDsequence[nbquestion]].question;
  var Valslide=parseInt(document.getElementById("slideResponse").value);
  if(TEDquestionnary[TEDsequence[nbquestion]].zone1==1){
    answer.zone1=true;
    answer.Score1=Valslide;
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].zone2==1){
    answer.zone2=true;
    answer.Score2=Valslide;
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].zone3==1){
    answer.zone3=true;
    answer.Score3=Valslide;
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].zone1==1 && TEDquestionnary[TEDsequence[nbquestion]].zone2==1){
    answer.zone12=true;
    answer.Score12=Valslide;
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].zone1==1 && TEDquestionnary[TEDsequence[nbquestion]].zone3==1 ){
    answer.zone13=true;
    answer.Score13=Valslide;
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].zone2==1 && TEDquestionnary[TEDsequence[nbquestion]].zone3==1){
    answer.zone23=true;
    answer.Score23=Valslide;
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].depress==1){
    answer.depress=Math.ceil(Valslide/2.5);
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].anxiety==1){
    answer.anxiety=Math.ceil(Valslide/2.5);
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].stress==1){
    answer.stress=Math.ceil(Valslide/2.5);
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].emq==1){
    answer.emq=Math.ceil(Valslide/2);
  }
  if(TEDquestionnary[TEDsequence[nbquestion]].ASRS==1){
    answer.ASRS=Math.ceil(Valslide/2);
  }
  //////////////////////
  TEDresults.push(answer);
  console.log(TEDresults)
}

function Nextquestion(){
  if(TEDisrunning==false){//if first questions, make questions answer
    var initSequence=new Array
    var randIndice=0;
    for (i = 0; i < TEDlen; i++) {
      initSequence.push(i);
    }
    while (initSequence.length>0) {
      randIndice=getRandomIntexclusive(0,initSequence.length);
      TEDsequence.push(initSequence[randIndice]);
      initSequence.splice(randIndice, 1);
    }
    TEDisrunning=true;
    resetSlider();
    document.getElementById("Question").innerHTML=TEDquestionnary[TEDsequence[0]].question;//print the question
    updateProgBar();
  }
  else if (TEDisrunning==true){
    if(nbquestion<TEDlen){
      console.log(nbquestion)
      getResponse();
      nbquestion+=1;
      if(nbquestion<TEDlen){
        resetSlider();
        document.getElementById("Question").innerHTML=TEDquestionnary[TEDsequence[nbquestion]].question;//print the question
        updateProgBar();
      }
    }
    if(nbquestion==TEDlen){//End of TED
      resetSlider();
      document.getElementById("Question").innerHTML="TED is completed";//print the question
      TEDisrunning=false;
      document.getElementById("PreviousButton").disabled = true;
      document.getElementById("NextButton").disabled = true;
      document.getElementById("RESbttn").disabled = false;
      }
    }
}

function Previousquestion(){
  if(TEDisrunning==true){
    nbquestion=Math.max(0,nbquestion-1)
    console.log(nbquestion)
    document.getElementById("Question").innerHTML=TEDquestionnary[TEDsequence[nbquestion]].question;//print the question 
    TEDresults.splice(nbquestion, 1)
    console.log(TEDresults)
    updateProgBar();
    resetSlider();
    }
}

function calculate_score(){
  TEDScore.nbZ1=0;
  TEDScore.Z1Score=0.0;
  TEDScore.Z1Bins=[0,0,0,0,0,0,0,0,0,0,0];
  TEDScore.nbZ2=0;
  TEDScore.Z2Score=0.0;
  TEDScore.Z2Bins=[0,0,0,0,0,0,0,0,0,0,0];
  TEDScore.nbZ3=0;
  TEDScore.Z3Score=0.0;
  TEDScore.Z3Bins=[0,0,0,0,0,0,0,0,0,0,0];
  TEDScore.nbZ12=0;
  TEDScore.Z12Score=0.0;
  TEDScore.Z12Bins=[0,0,0,0,0,0,0,0,0,0,0];
  TEDScore.nbZ13=0;
  TEDScore.Z13Score=0.0;
  TEDScore.Z13Bins=[0,0,0,0,0,0,0,0,0,0,0];
  TEDScore.nbZ23=0;
  TEDScore.Z23Score=0.0;
  TEDScore.Z23Bins=[0,0,0,0,0,0,0,0,0,0,0];
  TEDScore.depress=0;
  TEDScore.anxiety=0;
  TEDScore.stress=0;
  TEDScore.emq=0;
  TEDScore.ASRS=0;
  for (i = 0; i < TEDlen; i++) {
    if(TEDresults[i].zone1==true){
      TEDScore.nbZ1+=1;
      TEDScore.Z1Score+=TEDresults[i].Score1;
      TEDScore.Z1Bins[TEDresults[i].Score1]+=1;
    }
    if(TEDresults[i].zone2==true){
      TEDScore.nbZ2+=1;
      TEDScore.Z2Score+=TEDresults[i].Score2;
      TEDScore.Z2Bins[TEDresults[i].Score2]+=1;
    }
    if(TEDresults[i].zone3==true){
      TEDScore.nbZ3+=1;
      TEDScore.Z3Score+=TEDresults[i].Score3;
      TEDScore.Z3Bins[TEDresults[i].Score3]+=1;
    }
    if(TEDresults[i].zone12==true){
      TEDScore.nbZ12+=1;
      TEDScore.Z12Score+=TEDresults[i].Score12;
      TEDScore.Z12Bins[TEDresults[i].Score12]+=1;
    }
    if(TEDresults[i].zone13==true){
      TEDScore.nbZ13+=1;
      TEDScore.Z13Score+=TEDresults[i].Score13;
      TEDScore.Z13Bins[TEDresults[i].Score13]+=1;
    }
    if(TEDresults[i].zone23==true){
      TEDScore.nbZ23+=1;
      TEDScore.Z23Score+=TEDresults[i].Score23;
      TEDScore.Z23Bins[TEDresults[i].Score23]+=1;
    }
    TEDScore.depress+=TEDresults[i].depress;
    TEDScore.stress+=TEDresults[i].stress;
    TEDScore.anxiety+=TEDresults[i].anxiety;
    TEDScore.emq+=TEDresults[i].emq;
    TEDScore.ASRS+=TEDresults[i].ASRS;
  }
}

function ExportCSV(){
  csvRows = [];
  var headers = "numQ;Question;ScoreZ1;ScoreZ2;ScoreZ3;ScoreZ12;ScoreZ13;ScoreZ23;Depress;Anxiety;Stress;EMQ;ASRS;"
  headers+="\n";
  csvRows.push(headers);
  for (i = 0; i < TEDlen; i++) {
    var data=[];
    data+=(TEDresults[i].num_questions).toString()
    data+=";";
    data+=TEDresults[i].question;
    data+=';';
    data+=TEDresults[i].Score1.toString();
    data+=';';
    data+=TEDresults[i].Score2.toString();
    data+=';';
    data+=TEDresults[i].Score3.toString();
    data+=';';
    data+=TEDresults[i].Score12.toString();
    data+=';';
    data+=TEDresults[i].Score13.toString();
    data+=';';
    data+=TEDresults[i].Score23.toString();
    data+=';';
    data+=TEDresults[i].depress.toString();
    data+=';';
    data+=TEDresults[i].anxiety.toString();
    data+=';';
    data+=TEDresults[i].stress.toString();
    data+=';';
    data+=TEDresults[i].emq.toString();
    data+=';';
    data+=TEDresults[i].ASRS.toString();
    data+='\n';
    csvRows.push(data)
  }
  console.log(csvRows)
  ////////////////////////////
   // Creating a Blob for having a csv file format
  // and passing the data with type
  const blob = new Blob([csvRows], { type: 'text/csv' });
  // Creating an object for downloading url
  const url = window.URL.createObjectURL(blob)
  // Creating an anchor(a) tag of HTML
  const a = document.createElement('a')
  // Passing the blob downloading url
  a.setAttribute('href', url)
  // Setting the anchor tag attribute for downloading
  // and passing the download file name
  a.setAttribute('download', 'TEDresult.csv');
  // Performing a download with click
  a.click()
}

function Generate_ASSPDF() {
 // Choose the element that your content will be rendered to.
//var element= document.createElement("div");
var el1 = document.getElementById("EXPORT_ASSPDF");
var offsetWidthel1 = document.getElementById("EXPORT_ASSPDF").offsetWidth;
//element.appendChild(el1.cloneNode(true));
//element.appendChild(el2.cloneNode(true));
  var opt = {
    margin:      1,
    filename:     'ASSESSEMENT.pdf',
    image:        { type: 'pdf', quality: 0.98 },
    html2canvas:  { width: offsetWidthel1,scale: 4},
    jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };
html2pdf().set(opt).from(el1).save(); 
}

function Generate_TEDPDF() {
  // Choose the element that your content will be rendered to.
 //var element= document.createElement("div");
 var el1 = document.getElementById("EXPORT_TEDPDF");
 var offsetWidthel1 = document.getElementById("EXPORT_TEDPDF").offsetWidth;
 var offsetHeightel1 = document.getElementById("EXPORT_TEDPDF").offsetHeight;
 //element.appendChild(el1.cloneNode(true));
 //element.appendChild(el2.cloneNode(true));
   var opt = {
     margin:      1,
     filename:     'TED.pdf',
     image:        { type: 'pdf', quality: 0.98 },
     html2canvas:  { width: offsetWidthel1,height: offsetHeightel1,scale: 4},
     jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
   };
 html2pdf().set(opt).from(el1).save(); 
 }



document.getElementById("PreviousButton").disabled = true;
document.getElementById("NextButton").disabled = true;
document.getElementById("ASSbttn").click();
document.getElementById("INFObttn").click();
document.getElementById("ASSRESbttn").click();
document.getElementById("ISSUEbttn").disabled = true;
document.getElementById("ENTbttn").disabled = true;
/////////////// init result graph
ChartZ1=init_graph("ChartZ1",color1);
ChartZ2=init_graph("ChartZ2",color2);
ChartZ3=init_graph("ChartZ3",color3);
ChartZ12=init_graph("ChartZ12",color12);
ChartZ13=init_graph("ChartZ13",color13);
ChartZ23=init_graph("ChartZ23",color23);

document.getElementById("inputFileToRead")
  .addEventListener("change", function () {
    var fr = new FileReader();
    fr.readAsText(this.files[0]);
    fr.onload = function () {
        TEDquestionnary=[];
        TEDresults=[];
        TEDsequence=[];
        var tedread=fr.result.split("\n")
            TEDlen=tedread.length-2;
            for (let i = 0; i < TEDlen; i++) {
              var toto= tedread[i+1].split(";");
              const tempQ={
                num_questions:toto[0],
                question:toto[1],
                zone1:toto[2],
                zone2:toto[3],
                zone3:toto[4],
                depress:toto[5],
                anxiety:toto[6],
                stress:toto[7],
                emq:toto[8],
                ASRS:toto[9],
              };
              TEDquestionnary.push(tempQ);
              }
            document.getElementById("PreviousButton").disabled = false;
            document.getElementById("NextButton").disabled = false;
            resetSlider();
            resetProgBar();
            nbquestion=0;
            document.getElementById("Question").innerHTML="Click on Next to Start";//print the question
          }
  });

  document.getElementById("RESbttn")
  .addEventListener("click", function () {
    //try{
    calculate_score();
    update_chart(ChartZ1,TEDScore.Z1Bins);
    update_chart(ChartZ2,TEDScore.Z2Bins);
    update_chart(ChartZ3,TEDScore.Z3Bins);
    update_chart(ChartZ12,TEDScore.Z12Bins);
    update_chart(ChartZ13,TEDScore.Z13Bins);
    update_chart(ChartZ23,TEDScore.Z23Bins);
    let progZ1=document.getElementById("Z1progress");
    let progZ2=document.getElementById("Z2progress");
    let progZ3=document.getElementById("Z3progress");
    let progZ12=document.getElementById("Z12progress");
    let progZ13=document.getElementById("Z13progress");
    let progZ23=document.getElementById("Z23progress");
    var resVal=0.0;
    if(TEDScore.nbZ1>0){
      resVal=parseInt(100*(TEDScore.Z1Score/(10*TEDScore.nbZ1)));
      progZ1.value=resVal;
      document.getElementById("Z1Score").innerHTML=(resVal).toString()+"%";
    }
    else{
      progZ1.value=0;
      document.getElementById("Z1Score").innerHTML="0%";
    }
    if(TEDScore.nbZ2>0){
      resVal=parseInt(100*(TEDScore.Z2Score/(10*TEDScore.nbZ2)));
      progZ2.value=resVal;
      document.getElementById("Z2Score").innerHTML=(resVal).toString()+"%";
    }
    else{
      progZ2.value=0;
      document.getElementById("Z2Score").innerHTML="0%";
    }
    if(TEDScore.nbZ3>0){
      resVal=parseInt(100*(TEDScore.Z3Score/(10*TEDScore.nbZ3)));
      progZ3.value=resVal;
      document.getElementById("Z3Score").innerHTML=(resVal).toString()+"%";
    }
    else{
      progZ3.value=0;
      document.getElementById("Z3Score").innerHTML="0%";
    }
    /////////////////////////////////////
    if(TEDScore.nbZ12>0){
      resVal=parseInt(100*(TEDScore.Z12Score/(10*TEDScore.nbZ12)));
      progZ12.value=resVal;
      document.getElementById("Z12Score").innerHTML=(resVal).toString()+"%";
    }
    else{
      progZ12.value=0;
      document.getElementById("Z12Score").innerHTML="0%";
    }
    if(TEDScore.nbZ13>0){
      resVal=parseInt(100*(TEDScore.Z13Score/(10*TEDScore.nbZ13)));
      progZ13.value=resVal;
      document.getElementById("Z13Score").innerHTML=(resVal).toString()+"%";
    }
    else{
      progZ13.value=0;
      document.getElementById("Z13Score").innerHTML="0%";
    }
    if(TEDScore.nbZ23>0){
      resVal=parseInt(100*(TEDScore.Z23Score/(10*TEDScore.nbZ23)));
      progZ23.value=resVal;
      document.getElementById("Z23Score").innerHTML=(resVal).toString()+"%";
    }
    else{
      progZ23.value=0;
      document.getElementById("Z23Score").innerHTML="0%";
    }
    /////////////////// plot DAS,EMQ,ASRS score
    document.getElementById("depressScore").innerHTML=Math.ceil(TEDScore.depress/7);
    document.getElementById("anxietyScore").innerHTML=Math.ceil(TEDScore.anxiety/7);
    document.getElementById("stressScore").innerHTML=Math.ceil(TEDScore.stress/7);
    document.getElementById("emqScore").innerHTML=Math.ceil(TEDScore.emq/13),
    document.getElementById("asrsScore").innerHTML=Math.ceil(TEDScore.ASRS/6);
   // }
   // catch(error){
  //}
  });
