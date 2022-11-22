
var freqlist= [125,250,500,1000,2000,4000,8000];
var resultValBC=new Int16Array(freqlist.length).fill(0);
var resultLatBC=new Array(freqlist.length).fill("NoAns");
var resultValAC=new Int16Array(freqlist.length).fill(0);
var resultLatAC=new Array(freqlist.length).fill("NoAns");
var freqind=3;
var amp=-20;
var inc_amp=5;
const FS=44100;
var fade=parseInt(10e-3*FS);
console.log(fade)
///////// auio context ////////
var contextaudio;
var audio_status=false;// check if contextaudio is open
var source={};
var myChart={};


function init_graph(){
  const ctx = document.getElementById('myChart');
  myChart=new Chart(ctx, {
    type: "line",
    data: {
    labels: freqlist,
    datasets: [{
    label:"BC",
    backgroundColor: "rgba(0,0,0,0.01)",
    borderColor: "rgba(255,99,132,255)",
    pointRadius: 8,
    pointHoverRadius: 16,
    pointBackgroundColor: [],
    pointBorderColor: [],
    fill:false,
    borderDash: [5, 5],
    },
    {
      label:"AC",
      backgroundColor: "rgba(0,0,0,0.01)",
      borderColor: "rgba(54,162,235,255)",
      pointRadius: 8,
      pointHoverRadius: 16,
      pointBackgroundColor: [],
      pointBorderColor: [],
      fill:false,
      }],
      }
    });
}


function plot_graph(X,Y,Ytype){
  const toto=document.getElementById("channel");
  const CHAN=toto.options[toto.selectedIndex].text;
  var indChan={};
  if (CHAN=="BC"){
    indChan=0;}
  else if (CHAN=="AC"){
    indChan=1;}  
  console.log(indChan)
  myChart.data.datasets[indChan].data=Y;
  for(let ii=0;ii<X.length;ii++){
    if(Ytype[ii]=="Left"){
      myChart.data.datasets[indChan].pointBackgroundColor[ii] = "rgb(153,102,255)";
      myChart.data.datasets[indChan].pointBorderColor[ii] = "rgb(153,102,255)";
    }
    if(Ytype[ii]=="Right"){
      myChart.data.datasets[indChan].pointBackgroundColor[ii] = "rgb(35, 156, 156)";
      myChart.data.datasets[indChan].pointBorderColor[ii] = "rgb(35, 156, 156)";
    }
    if(Ytype[ii]=="Center"){
      myChart.data.datasets[indChan].pointBackgroundColor[ii] = "rgb(255,205,86)";
      myChart.data.datasets[indChan].pointBorderColor[ii] = "rgb(255,205,86)";
    }
    if(Ytype[ii]=="NoAns"){
      myChart.data.datasets[indChan].pointBackgroundColor[ii] = "rgba(0,0,0,0.0)";
      myChart.data.datasets[indChan].pointBorderColor[ii] = "rgba(0,0,0,0.0)";
    }
  }
  myChart.update();
  }



function frequp(){
  freqind=Math.min(freqind+1,freqlist.length);
  console.log(freqind)
  console.log(freqlist[freqind]);
  const labelfreq=document.getElementById("freqval")
  labelfreq.innerHTML=freqlist[freqind].toString();
}

function freqdown(){
  freqind=Math.max(freqind-1,0);
  console.log(freqlist[freqind]);
  const labelfreq=document.getElementById("freqval")
  labelfreq.innerHTML=freqlist[freqind].toString();
}

function ampup(){
  amp=Math.min(amp+inc_amp,20);
  const labelamp=document.getElementById("ampval")
  labelamp.innerHTML=amp.toString();
}

function ampdown(){
  amp=Math.max(amp-inc_amp,-100);
  const labelamp=document.getElementById("ampval")
  labelamp.innerHTML=amp.toString();
}

function Play_pulse(){
  //////////////// get sound parameters //////////////////////////////
  const freq=parseFloat(document.getElementById("freqval").textContent);
  const amp=parseFloat(document.getElementById("ampval").textContent);
  const amplitude=10**(amp/20);
  const toto=document.getElementById("channel")
  const CHAN=toto.options[toto.selectedIndex].text
  const pulsenum=document.getElementById("nbpulse").value;
  const pulseduration=document.getElementById("pulselen").value;
  const breakduration=document.getElementById("breaklen").value;
  var temp=0;
  console.log(freq,amp,pulsenum,pulseduration,breakduration,CHAN)
  //////////////////////////////////////////////////////////////
  // generate sound
  //////////////////////////////////////////////////////////
  const len_signal=parseInt(FS*(pulsenum*pulseduration+(pulsenum-1)*breakduration));
  console.log(len_signal)
  const signalout=new Float32Array(len_signal).fill(0);
  console.log(signalout)
  for (let ii = 0; ii < len_signal; ii++) {
    signalout[ii]=amplitude*Math.cos(2*Math.PI*ii*freq/FS);
  }
  for (let jj=0;jj<pulsenum-1;jj++){
    temp=0;
    for(let kk=0;kk<parseInt(breakduration*FS);kk++){
      if(kk<fade){
        signalout[parseInt((jj+1)*pulseduration*FS+jj*breakduration*FS)+kk]=(signalout[parseInt((jj+1)*pulseduration*FS+jj*breakduration*FS)+kk])*((fade-kk)/fade);
        }
      else if (kk>parseInt(breakduration*FS)-fade){
        temp=temp+1;
        signalout[parseInt((jj+1)*pulseduration*FS+jj*breakduration*FS)+kk]=(signalout[parseInt((jj+1)*pulseduration*FS+jj*breakduration*FS)+kk])*(temp/fade);
        }
      else{
        signalout[parseInt((jj+1)*pulseduration*FS+jj*breakduration*FS)+kk]=0;
        }
      }
    } 
  console.log(signalout)
  try {
    contextaudio = new AudioContext();
    }
    catch(e) {
    alert('Web Audio API is not supported in this browser');
    }
  const memoireTampon = contextaudio.createBuffer(2,signalout.length, FS);
  if(CHAN=="BC"){
    memoireTampon.copyToChannel(signalout,0);
  }
  else if(CHAN=="AC"){
    memoireTampon.copyToChannel(signalout,1);
  }
  source = contextaudio.createBufferSource();
  // set the buffer in the AudioBufferSourceNode
  source.buffer = memoireTampon;
  //console.log(source.buffer.getChannelData(0))
  //console.log(source.buffer.getChannelData(1))
  // connect the AudioBufferSourceNode to the
  // destination so we can hear the sound
  source.connect(contextaudio.destination);
  // start the source playing
  audio_status=true;
  source.start();
  }

function getResultLeft(){// when result button are clicked, store the amplitude and which button
  if (audio_status==true){
      source.stop();
      source.disconnect();
  }
  const toto=document.getElementById("channel");
  const CHAN=toto.options[toto.selectedIndex].text;
  if (CHAN=="BC"){
    resultValBC[freqind]=amp;
    resultLatBC[freqind]="Left";
    plot_graph(freqlist,resultValBC,resultLatBC);
  
  }
  if (CHAN=="AC"){
      resultValAC[freqind]=amp;
    resultLatAC[freqind]="Left";
    plot_graph(freqlist,resultValAC,resultLatAC);
  }
}
  ////////////////////////

function getResultRight(){// when result button are clicked, store the amplitude and which button
  if (audio_status==true){
    source.stop();
    source.disconnect();
    }

  const toto=document.getElementById("channel");
  const CHAN=toto.options[toto.selectedIndex].text;
  if (CHAN=="BC"){
    resultValBC[freqind]=amp;
    resultLatBC[freqind]="Right";
    plot_graph(freqlist,resultValBC,resultLatBC);
  
  }
  if (CHAN=="AC"){
      resultValAC[freqind]=amp;
      resultLatAC[freqind]="Right";
    plot_graph(freqlist,resultValAC,resultLatAC);
  }
}
    ////////////////////////
function getResultCenter(){// when result button are clicked, store the amplitude and which button
  if (audio_status==true){
    source.stop();
    source.disconnect();
    }

  const toto=document.getElementById("channel");
  const CHAN=toto.options[toto.selectedIndex].text;
  if (CHAN=="BC"){
    resultValBC[freqind]=amp;
    resultLatBC[freqind]="Center";
    plot_graph(freqlist,resultValBC,resultLatBC);
  
  }
  if (CHAN=="AC"){
    resultValAC[freqind]=amp;
    resultLatAC[freqind]="Center";
    plot_graph(freqlist,resultValAC,resultLatAC);
  }
}
//////////////////////////////////////////