/* 
 * The MIT License
 *
 * Copyright 2019 Giuseppe Amato
 * giuseppe.amato@vtadiy.com
 * VTADIY - http://www.vtadiy.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


var tubes=null;
var tube1;

var initTube1=function(tube,whichGraph){
    tube1=new Tube();
    tube1.whichGraph=whichGraph;
    tube1.addTubeList("all",function(){tube1.setGraph(tube);});
}

var tube2;

var initTube2=function(tube,whichGraph){
    tube2=new Tube();
    tube2.whichGraph=whichGraph;
    tube2.addTubeList("all",function(){tube2.setGraph(tube);});
}

var tube3;

var initTube3=function(tube,whichGraph){
    tube3=new Tube();
    tube3.whichGraph=whichGraph;
    tube3.addTubeList("all",function(){tube3.setGraph(tube);});
}


class Tube{
    constructor(){
        this.PP=false;
        this.parameters;
        this.lineWidth=1.5;
        this.whichGraph;
        this.graph;
        this.headroom;
    };

    updateBtnOnClick(){
      
      this.setGraph("ZZZ");
    }
    
    setGraph(tube){  
        var thisContext=this;
        if(tube=="noChange"){
            this.setTube(tube,thisContext.whichGraph);
            this.doSetGraph(tube,thisContext);
            this.logQuery();
        }else{    
            if(tube==""){      //Let's check if there is the tube parameter in the URL        
                var queryString=window.location.search;
                var urlParams=new URLSearchParams(queryString);
                tube=urlParams.get('tube');
            }/**/
                var sel = document.getElementById("w3review");
                var tubeModel =  JSON.parse(sel.value);

                if(tubeModel==null){
                    thisContext.setGraph(thisContext.getRandomTube());
                }else{
                    thisContext.parameters=tubeModel;
                    thisContext.setTube(tube,thisContext.whichGraph);
                    thisContext.doSetGraph(tube,thisContext);
                    thisContext.logQuery();
                }
            
        }
    }
    
    getRandomTube(){
       var sel = document.getElementById(this.whichGraph+"-"+"tube");
       var numOfTubes=sel.length-1;
       var tubeId=Math.random()*numOfTubes+1;
       var tube=sel[Math.trunc(tubeId)].value;
       return tube;
    }
    
    logQuery(){
        //log query
        $.ajax({
            type: "get",
            url: "https://www.vtadiy.com/giuseppe/insertQueryLog.php",
            data:{myData:JSON.stringify(this.parameters)},
            contentType: "application/json",
            dataType: "text"
        }).then(function(result){
            result=result;
        });/**/
    }
    
    doSetGraph(tube,thisContext) {
        var webSite="www.vtadiy.com";
        
        var lineChartData = {
                datasets: []
            };
        lineChartData = thisContext.anodeCharacteristicGraph(lineChartData,thisContext.parameters); //add anode characteristic graph
        //lineChartData = thisContext.screenCharacteristicGraph(lineChartData,thisContext.parameters); //add screen characteristic graph
        lineChartData.datasets.push(thisContext.createMaxAnodePowerDissipationGraph(thisContext.parameters)); // add max anode power dissipation
        lineChartData.datasets.push(thisContext.createOperatingPoint(thisContext.parameters)); //add operating point
        lineChartData.datasets.push(thisContext.createLoadlineGraph(thisContext.parameters.loadType+":",thisContext.parameters, thisContext.parameters.load)); //add loadline
        try{
            lineChartData.datasets.push(thisContext.createACLoadlineGraph("AC Loadline:",thisContext.parameters)); //add AC loadline
        }catch(e){};
        try{
            if(!(isNaN(thisContext.headroom)||thisContext.headroom==0))
                lineChartData.datasets.push(thisContext.createHeadroom(thisContext.parameters,thisContext.headroom)); //add headroom
            else
                thisContext.updateHDTextBox("Set out. headroom ");
        }catch(e){};
        var canvas=document.getElementById(thisContext.whichGraph);
        var ctx = canvas.getContext('2d');


        try{
            thisContext.graph.destroy();
        }catch(e){}

        thisContext.graph= Chart.Scatter(ctx, {
            data: lineChartData,
            options: {
                responsive: true,
                hoverMode: 'index',
                stacked: false,
                title: {
                    display: true,
                    text: 'Anode Characteristic Graph: '+ thisContext.parameters.name+ " - "+webSite,
                },
                legend: {
                    display: false,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                },
                scales: { 
                    yAxes: [{ ticks: { 

                                callback: function(value, index, values) {
                                    return + Number(value*1000).toFixed(2);
                                },

                                max: thisContext.parameters.maxI_A, min: 0, stepSize: thisContext.parameters.maxI_A/10 },
                                scaleLabel: { display: true,labelString: 'Ia (mA)'}
                        }],
                    xAxes: [{ ticks: { max: thisContext.parameters.maxV_A, min: 0, stepSize: 50 },
                              scaleLabel: { display: true,labelString: 'Va (V)'}

                          }]
                },
                tooltips: {
                    intersect: false,
                    callbacks: {
                            title: function() {
                                //var datasetLabel = data.datasets[item.datasetIndex].label || '';
                                    return '';     // doesn't make sense for scatter since data are formatted as a point
                            },
                            label: function(item,data) {
                                    var datasetLabel = data.datasets[item.datasetIndex].label || '';
                                    return datasetLabel+' (Va:' + item.xLabel + 'V, Ia:' + Number(item.yLabel*1000).toFixed(2) + 'mA)';
                            }
                    }
                }
            }
        });   
    };
    
    
    addTubeList_local(loadType,callThisAfterDataIsReady){
        var sel = document.getElementById(this.whichGraph+"-"+"tube");
        for(var i=0;i<tubes.length;i++){
            if(tubes[i].loadType==loadType || loadType=="all"){
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(tubes[i].name+" ("+tubes[i].loadType+")"));
                opt.value = tubes[i].name; 
                sel.appendChild(opt);
            }
        }
        callThisAfterDataIsReady();
    }
    
    addTubeList_database(loadType,callThisAfterDataIsReady){
        var sel = document.getElementById(this.whichGraph+"-"+"tube");
 
            tubes=[
                {
                  "name": "101D",
                  "loadType": "resistive"
                },
                {
                  "name": "12AT7",
                  "loadType": "resistive"
                },
                {
                  "name": "12AU7",
                  "loadType": "resistive"
                },
                {
                  "name": "12AX7",
                  "loadType": "resistive"
                },
                {
                  "name": "12AY7",
                  "loadType": "resistive"
                },
                {
                  "name": "12BH7",
                  "loadType": "resistive"
                },
                {
                  "name": "12E1 ",
                  "loadType": "reactive"
                },
                {
                  "name": "12SJ7",
                  "loadType": "resistive"
                },
                {
                  "name": "12SQ7",
                  "loadType": "resistive"
                },
                {
                  "name": "205D",
                  "loadType": "resistive"
                },
                {
                  "name": 211,
                  "loadType": "reactive"
                },
                {
                  "name": "2A3",
                  "loadType": "reactive"
                },
                {
                  "name": "2A3-40 JJ",
                  "loadType": "reactive"
                },
                {
                  "name": "300B",
                  "loadType": "reactive"
                },
                {
                  "name": "300B-XLS(EML)",
                  "loadType": "reactive"
                },
                {
                  "name": "3A5",
                  "loadType": "resistive"
                },
                {
                  "name": "417A",
                  "loadType": "resistive"
                },
                {
                  "name": 45,
                  "loadType": "reactive"
                },
                {
                  "name": "4P1L",
                  "loadType": "reactive"
                },
                {
                  "name": 5687,
                  "loadType": "resistive"
                },
                {
                  "name": 5751,
                  "loadType": "resistive"
                },
                {
                  "name": 5842,
                  "loadType": "resistive"
                },
                {
                  "name": 5881,
                  "loadType": "reactive"
                },
                {
                  "name": 5902,
                  "loadType": "reactive"
                },
                {
                  "name": 5977,
                  "loadType": "resistive"
                },
                {
                  "name": "5AQ5",
                  "loadType": "reactive"
                },
                {
                  "name": "5V6",
                  "loadType": "reactive"
                },
                {
                  "name": 6005,
                  "loadType": "reactive"
                },
                {
                  "name": 6021,
                  "loadType": "resistive"
                },
                {
                  "name": 6072,
                  "loadType": "resistive"
                },
                {
                  "name": 6111,
                  "loadType": "resistive"
                },
                {
                  "name": "6336A",
                  "loadType": "reactive"
                },
                {
                  "name": 6360,
                  "loadType": "reactive"
                },
                {
                  "name": 6528,
                  "loadType": "reactive"
                },
                {
                  "name": 6550,
                  "loadType": "reactive"
                },
                {
                  "name": 6688,
                  "loadType": "resistive"
                },
                {
                  "name": 6888,
                  "loadType": "resistive"
                },
                {
                  "name": 6973,
                  "loadType": "reactive"
                },
                {
                  "name": "6AH4GT",
                  "loadType": "reactive"
                },
                {
                  "name": "6AH6",
                  "loadType": "resistive"
                },
                {
                  "name": "6AK6",
                  "loadType": "resistive"
                },
                {
                  "name": "6AQ5",
                  "loadType": "reactive"
                },
                {
                  "name": "6AQ8",
                  "loadType": "resistive"
                },
                {
                  "name": "6AS7G",
                  "loadType": "resistive"
                },
                {
                  "name": "6AS7GC",
                  "loadType": "resistive"
                },
                {
                  "name": "6AU6",
                  "loadType": "resistive"
                },
                {
                  "name": "6BK5",
                  "loadType": "reactive"
                },
                {
                  "name": "6BQ5",
                  "loadType": "reactive"
                },
                {
                  "name": "6BQ6GTB",
                  "loadType": "reactive"
                },
                {
                  "name": "6BQ7A",
                  "loadType": "resistive"
                },
                {
                  "name": "6BX7GT",
                  "loadType": "reactive"
                },
                {
                  "name": "6C33C(2 cath)",
                  "loadType": "resistive"
                },
                {
                  "name": "6C41C",
                  "loadType": "reactive"
                },
                {
                  "name": "6CA7",
                  "loadType": "reactive"
                },
                {
                  "name": "6CD6GA",
                  "loadType": "reactive"
                },
                {
                  "name": "6CG7",
                  "loadType": "resistive"
                },
                {
                  "name": "6CK4",
                  "loadType": "reactive"
                },
                {
                  "name": "6DJ8",
                  "loadType": "resistive"
                },
                {
                  "name": "6DQ6-B",
                  "loadType": "reactive"
                },
                {
                  "name": "6GM8",
                  "loadType": "resistive"
                },
                {
                  "name": "6GU7",
                  "loadType": "resistive"
                },
                {
                  "name": "6H30",
                  "loadType": "resistive"
                },
                {
                  "name": "6H7C",
                  "loadType": "reactive"
                },
                {
                  "name": "6J1",
                  "loadType": "resistive"
                },
                {
                  "name": "6J5",
                  "loadType": "resistive"
                },
                {
                  "name": "6J7",
                  "loadType": "resistive"
                },
                {
                  "name": "6JE6A",
                  "loadType": "reactive"
                },
                {
                  "name": "6JE6B",
                  "loadType": "reactive"
                },
                {
                  "name": "6JN6",
                  "loadType": "reactive"
                },
                {
                  "name": "6JQ6",
                  "loadType": "reactive"
                },
                {
                  "name": "6K6GT",
                  "loadType": "reactive"
                },
                {
                  "name": "6KX8",
                  "loadType": "resistive"
                },
                {
                  "name": "6L6G",
                  "loadType": "reactive"
                },
                {
                  "name": "6L6GC",
                  "loadType": "reactive"
                },
                {
                  "name": "6LQ6",
                  "loadType": "reactive"
                },
                {
                  "name": "6N16B",
                  "loadType": "resistive"
                },
                {
                  "name": "6N17B",
                  "loadType": "resistive"
                },
                {
                  "name": "6N1P",
                  "loadType": "resistive"
                },
                {
                  "name": "6N23P",
                  "loadType": "resistive"
                },
                {
                  "name": "6N2P",
                  "loadType": "resistive"
                },
                {
                  "name": "6N2P-EV",
                  "loadType": "resistive"
                },
                {
                  "name": "6N6P",
                  "loadType": "resistive"
                },
                {
                  "name": "6N7",
                  "loadType": "reactive"
                },
                {
                  "name": "6N7G",
                  "loadType": "reactive"
                },
                {
                  "name": "6N7GT",
                  "loadType": "reactive"
                },
                {
                  "name": "6N7P",
                  "loadType": "reactive"
                },
                {
                  "name": "6N7S",
                  "loadType": "reactive"
                },
                {
                  "name": "6P1P-EV",
                  "loadType": "reactive"
                },
                {
                  "name": "6P30B",
                  "loadType": "reactive"
                },
                {
                  "name": "6P31S",
                  "loadType": "reactive"
                },
                {
                  "name": "6P3S",
                  "loadType": "reactive"
                },
                {
                  "name": "6S19P",
                  "loadType": "reactive"
                },
                {
                  "name": "6S3P-EV",
                  "loadType": "reactive"
                },
                {
                  "name": "6S4A",
                  "loadType": "reactive"
                },
                {
                  "name": "6SJ7",
                  "loadType": "resistive"
                },
                {
                  "name": "6SL7",
                  "loadType": "resistive"
                },
                {
                  "name": "6SN7",
                  "loadType": "resistive"
                },
                {
                  "name": "6SQ7",
                  "loadType": "resistive"
                },
                {
                  "name": "6U8APentodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "6U8ATriodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "6V6",
                  "loadType": "reactive"
                },
                {
                  "name": "6V6GT",
                  "loadType": "reactive"
                },
                {
                  "name": "6V6S",
                  "loadType": "reactive"
                },
                {
                  "name": "6W6GT",
                  "loadType": "reactive"
                },
                {
                  "name": "6Y6GT",
                  "loadType": "reactive"
                },
                {
                  "name": 7591,
                  "loadType": "reactive"
                },
                {
                  "name": 7868,
                  "loadType": "reactive"
                },
                {
                  "name": "7AK7",
                  "loadType": "resistive"
                },
                {
                  "name": 805,
                  "loadType": "reactive"
                },
                {
                  "name": 807,
                  "loadType": "reactive"
                },
                {
                  "name": 809,
                  "loadType": "reactive"
                },
                {
                  "name": "811A",
                  "loadType": "reactive"
                },
                {
                  "name": "8298A",
                  "loadType": "reactive"
                },
                {
                  "name": "829B",
                  "loadType": "reactive"
                },
                {
                  "name": 8417,
                  "loadType": "reactive"
                },
                {
                  "name": 845,
                  "loadType": "reactive"
                },
                {
                  "name": "A2134",
                  "loadType": "reactive"
                },
                {
                  "name": "CK5654",
                  "loadType": "resistive"
                },
                {
                  "name": "CK6336A",
                  "loadType": "reactive"
                },
                {
                  "name": "CK6688",
                  "loadType": "resistive"
                },
                {
                  "name": "CV1040",
                  "loadType": "reactive"
                },
                {
                  "name": "CV1936",
                  "loadType": "resistive"
                },
                {
                  "name": "CV2798",
                  "loadType": "reactive"
                },
                {
                  "name": "CV3998",
                  "loadType": "resistive"
                },
                {
                  "name": "CV515",
                  "loadType": "reactive"
                },
                {
                  "name": "CV591",
                  "loadType": "resistive"
                },
                {
                  "name": "CV808",
                  "loadType": "resistive"
                },
                {
                  "name": "D3A",
                  "loadType": "resistive"
                },
                {
                  "name": "DCC90",
                  "loadType": "resistive"
                },
                {
                  "name": "DO24",
                  "loadType": "reactive"
                },
                {
                  "name": "E180F",
                  "loadType": "resistive"
                },
                {
                  "name": "E188CC",
                  "loadType": "resistive"
                },
                {
                  "name": "E55L",
                  "loadType": "reactive"
                },
                {
                  "name": "E88CC",
                  "loadType": "resistive"
                },
                {
                  "name": "EC8020",
                  "loadType": "reactive"
                },
                {
                  "name": "ECC180",
                  "loadType": "resistive"
                },
                {
                  "name": "ECC808",
                  "loadType": "resistive"
                },
                {
                  "name": "ECC81",
                  "loadType": "resistive"
                },
                {
                  "name": "ECC82",
                  "loadType": "resistive"
                },
                {
                  "name": "ECC83",
                  "loadType": "resistive"
                },
                {
                  "name": "ECC85",
                  "loadType": "resistive"
                },
                {
                  "name": "ECC88",
                  "loadType": "resistive"
                },
                {
                  "name": "ECC99",
                  "loadType": "resistive"
                },
                {
                  "name": "ECF80PentodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "ECF80TriodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "ECL80PentodeSect",
                  "loadType": "reactive"
                },
                {
                  "name": "ECL80TriodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "ECL82PentodeSect",
                  "loadType": "reactive"
                },
                {
                  "name": "ECL82TriodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "ECL83PentodeSect",
                  "loadType": "reactive"
                },
                {
                  "name": "ECL83TriodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "ECL84PentodeSect",
                  "loadType": "reactive"
                },
                {
                  "name": "ECL84TriodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "ECL85PentodeSect",
                  "loadType": "reactive"
                },
                {
                  "name": "ECL85TriodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "ECL86PentodeSect",
                  "loadType": "reactive"
                },
                {
                  "name": "ECL86TriodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "EF80",
                  "loadType": "resistive"
                },
                {
                  "name": "EF86",
                  "loadType": "resistive"
                },
                {
                  "name": "EF94",
                  "loadType": "resistive"
                },
                {
                  "name": "EFL200PowerSect",
                  "loadType": "reactive"
                },
                {
                  "name": "EFL200PreSect",
                  "loadType": "resistive"
                },
                {
                  "name": "EL34",
                  "loadType": "reactive"
                },
                {
                  "name": "EL36",
                  "loadType": "reactive"
                },
                {
                  "name": "EL506",
                  "loadType": "reactive"
                },
                {
                  "name": "EL803",
                  "loadType": "reactive"
                },
                {
                  "name": "EL84",
                  "loadType": "reactive"
                },
                {
                  "name": "EL86",
                  "loadType": "reactive"
                },
                {
                  "name": "EL90",
                  "loadType": "reactive"
                },
                {
                  "name": "EL91",
                  "loadType": "reactive"
                },
                {
                  "name": "EL95",
                  "loadType": "reactive"
                },
                {
                  "name": "GK71",
                  "loadType": "reactive"
                },
                {
                  "name": "GM70",
                  "loadType": "reactive"
                },
                {
                  "name": "GU-50",
                  "loadType": "reactive"
                },
                {
                  "name": "GU81",
                  "loadType": "reactive"
                },
                {
                  "name": "KT120",
                  "loadType": "reactive"
                },
                {
                  "name": "KT150",
                  "loadType": "reactive"
                },
                {
                  "name": "KT66",
                  "loadType": "reactive"
                },
                {
                  "name": "KT77",
                  "loadType": "reactive"
                },
                {
                  "name": "KT88",
                  "loadType": "reactive"
                },
                {
                  "name": "KT90",
                  "loadType": "reactive"
                },
                {
                  "name": "NR47",
                  "loadType": "reactive"
                },
                {
                  "name": "Nuvistor 7587",
                  "loadType": "resistive"
                },
                {
                  "name": "P27-500",
                  "loadType": "reactive"
                },
                {
                  "name": "PCC88",
                  "loadType": "resistive"
                },
                {
                  "name": "PCL84PentodeSect",
                  "loadType": "reactive"
                },
                {
                  "name": "PCL84TriodeSect",
                  "loadType": "resistive"
                },
                {
                  "name": "PP5/400",
                  "loadType": "reactive"
                },
                {
                  "name": "PP6/400",
                  "loadType": "reactive"
                },
                {
                  "name": "PX25(Osram)",
                  "loadType": "reactive"
                },
                {
                  "name": "PX4",
                  "loadType": "reactive"
                },
                {
                  "name": "QQE03-10",
                  "loadType": "reactive"
                },
                {
                  "name": "QQE03-12",
                  "loadType": "reactive"
                },
                {
                  "name": "RCA-6146b",
                  "loadType": "reactive"
                },
                {
                  "name": "SV572-10",
                  "loadType": "reactive"
                },
                {
                  "name": "T100(KR)",
                  "loadType": "reactive"
                },
                {
                  "name": "T110-1",
                  "loadType": "reactive"
                },
                {
                  "name": "VR40",
                  "loadType": "reactive"
                },
                {
                  "name": "VT-103",
                  "loadType": "resistive"
                },
                {
                  "name": "VT-104",
                  "loadType": "resistive"
                },
                {
                  "name": "VT-116",
                  "loadType": "resistive"
                },
                {
                  "name": "VT-168A",
                  "loadType": "reactive"
                },
                {
                  "name": "VT-91",
                  "loadType": "resistive"
                }
              ];
            for(var i=0;i<tubes.length;i++){
                if(tubes[i].loadType==loadType || loadType=="all"){
                    var opt = document.createElement('option');
                    //opt.appendChild(document.createTextNode(tubes[i].name+" ("+tubes[i].loadType+")"));
                    opt.appendChild(document.createTextNode(tubes[i].name));
                    opt.value = tubes[i].name; 
                    sel.appendChild(opt);
                }
            }
            callThisAfterDataIsReady();
       
    }
    
    addTubeList(loadType,callThisAfterDataIsReady){
        this.addTubeList_database(loadType,callThisAfterDataIsReady);
        //this.addTubeList_local(loadType);
        //exportTubesinDatabase(loadType);
    }


    setTube(tubeName,whichGraph){
        /*for(var i=0;i<tubes.length;i++){         
            if(tubes[i].name==tubeName)
                this.parameters=Object.assign({},tubes[i]);
        }/**/
        
           
        if(tubeName!=="noChange"){
            this.headroom=0;
            this.PP=false;
            try{
                document.getElementById(this.whichGraph+"-"+"PP").checked=false;
                document.getElementById(this.whichGraph+"-"+"SE").checked=true;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"tube").value=tubeName;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"B_Plus").value=this.parameters.B_Plus;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"biasCurrent").value=this.parameters.biasCurrent*1000;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"load").value=this.parameters.load;
            }catch(e){};
            try{
                //document.getElementById(this.whichGraph+"-"+"acImpedance").value=this.parameters.nextStageACIpedance;
                document.getElementById(this.whichGraph+"-"+"acImpedance").value="";
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"UL_TAP").value=this.parameters.UL_TAP*100;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"V_G2").value=this.parameters.V_G2;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"headroom").value="";
            }catch(e){};
            if(this.parameters.tubeType=="pentode"){          
                try{
                    document.getElementById(this.whichGraph+"-"+"pentode").disabled=false;
                }catch(e){};
                try{
                    document.getElementById(this.whichGraph+"-"+"triode").disabled=false;
                }catch(e){};
                try{
                    document.getElementById(this.whichGraph+"-"+"ultralinear").disabled=false;
                }catch(e){};
            }else{                    
                try{
                    document.getElementById(this.whichGraph+"-"+"pentode").disabled=true;
                }catch(e){};
                try{
                    document.getElementById(this.whichGraph+"-"+"triode").disabled=true;
                }catch(e){};
                try{
                    document.getElementById(this.whichGraph+"-"+"ultralinear").disabled=true;
                }catch(e){};
            }
            if(this.parameters.loadType=="reactive"){
                this.setReactive(true,true);
            }else{
                this.setResistive(true,true);
            }
            this.updateBiasVoltageTextBox();
            //this.setOperatingMode("triode",true);
            this.setOperatingMode(this.parameters.operatingMode,true);
        }      
        this.updateBiasCurrentTextBox();
        
        this.updateMaxPower();

        this.parameters.V_G1=this.computeGridBias(this.parameters.biasCurrent, this.parameters);
        try{
            document.getElementById(this.whichGraph+"-"+"V_G1").value=Number(this.parameters.V_G1).toFixed(2);     
        }catch(e){};
        
    };
    
    updateBiasVoltageTextBox(){
        if(this.parameters.loadType=="reactive"){
            this.parameters.biasVoltage=this.parameters.B_Plus;
            try{
                document.getElementById(this.whichGraph+"-"+"biasVoltage").value=Number(this.parameters.biasVoltage).toFixed(2);
            }catch(e){};
        }else{
            this.parameters.biasVoltage=this.getResistiveOperatingVoltageFromCurrent(this.parameters,this.parameters.biasCurrent);
            try{
                document.getElementById(this.whichGraph+"-"+"biasVoltage").value=Number(this.parameters.biasVoltage).toFixed(2);
            }catch(e){};
        }       
    }
    
    updateBiasCurrentTextBox(){
        if(this.parameters.loadType=="reactive"){
            this.parameters.biasVoltage=this.parameters.B_Plus;
            try{
                document.getElementById(this.whichGraph+"-"+"biasVoltage").value=Number(this.parameters.biasVoltage).toFixed(2);
            }catch(e){};
        }else{
            this.parameters.biasCurrent=this.getResistiveOperatingCurrentFromVoltage(this.parameters,this.parameters.biasVoltage);
            try{
                document.getElementById(this.whichGraph+"-"+"biasCurrent").value=Number(this.parameters.biasCurrent*1000).toFixed(2);
            }catch(e){};
        }
    }
    
    updateHDTextBox(text){
        var paragraph = document.getElementById(this.whichGraph+"-"+"THD");
        paragraph.textContent = text;
    }
    
    updateMaxPower(){
        var maxG1Va;
        maxG1Va=this.computeAnodeVoltageOnLoadlineFromVg(this.parameters,this.parameters.maxV_G1);
        var voltagePeak=(this.parameters.biasVoltage-maxG1Va);
        if(this.PP)
            voltagePeak*=2;
        var maxG1Power=(voltagePeak*0.707*voltagePeak*0.707)/this.parameters.load;
        
        var G10Va;
        G10Va=this.computeAnodeVoltageOnLoadlineFromVg(this.parameters,0);
        voltagePeak=(this.parameters.biasVoltage-G10Va);
        if(this.PP)
            voltagePeak*=2;
        var G10Power=(voltagePeak*0.707*voltagePeak*0.707)/this.parameters.load;
        
        var classAVoltage;
        if(this.parameters.loadType=="reactive"){
            var load=this.parameters.load;
            if(this.PP)
                load=load/2;
            var qA=(this.parameters.B_Plus/load)+this.parameters.biasCurrent;
            var mA=-(qA-this.parameters.biasCurrent)/this.parameters.B_Plus;
            classAVoltage=this.parameters.B_Plus-(this.parameters.B_Plus-((-qA/mA)-this.parameters.B_Plus));
        }
        else{
            classAVoltage=this.parameters.B_Plus-this.parameters.biasVoltage;
        }
        if(this.PP)
            classAVoltage*=2;
        var ClassAPower=(classAVoltage*0.707*classAVoltage*0.707)/this.parameters.load;
        
        
        var HeadroomPower;
        if((isNaN(this.headroom)||this.headroom==0))
            HeadroomPower="Set out. headroom";
        else{
            voltagePeak=this.headroom;
            if(this.PP)
                voltagePeak*=2;
            var HeadroomPower=Number((voltagePeak*0.707*voltagePeak*0.707)/this.parameters.load).toFixed(2);
        }
        
        var maxG1Text="at max g1:"+Number(maxG1Power).toFixed(2);
        var G10Text=" at g1=0:"+Number(G10Power).toFixed(2);
        var ClassAText=" at class A/A2:"+Number(ClassAPower).toFixed(2);
        var HeadroomText=" at headroom:"+HeadroomPower;               
        try{
            var paragraph= document.getElementById(this.whichGraph+"-"+"maxPower");
            paragraph.textContent="";
            paragraph.appendChild(document.createTextNode(maxG1Text));
            var linebreak = document.createElement("br");
            paragraph.appendChild(linebreak);
            paragraph.appendChild(document.createTextNode(G10Text));
            var linebreak = document.createElement("br");
            paragraph.appendChild(linebreak);
            paragraph.appendChild(document.createTextNode(ClassAText));
            var linebreak = document.createElement("br");
            paragraph.appendChild(linebreak);
            paragraph.appendChild(document.createTextNode(HeadroomText));
        }catch(e){};
    }

    setB_Plus(B_Plus){
        this.parameters.B_Plus=B_Plus;
        if(this.parameters.operatingMode=="ultralinear")
            this.parameters.V_G2=B_Plus;
        this.setGraph("noChange");
    };

    setBiasCurrent(biasCurrent){
        this.parameters.biasCurrent=(biasCurrent/1000);
        this.updateBiasVoltageTextBox();
        this.setGraph("noChange");
    };
    
    setBiasVoltage(biasVoltage){
        this.parameters.biasVoltage=(biasVoltage);
        this.updateBiasCurrentTextBox();
        this.setGraph("noChange");
    };

    setLoad(load){
        this.parameters.load=load;
        this.setGraph("noChange");
    };
    
    setAcImpedance(impedance){
        this.parameters.nextStageACIpedance=impedance;
        this.setGraph("noChange");
    };

    setUL_TAP(UL_TAP){
        this.parameters.UL_TAP=UL_TAP/100;
        this.setGraph("noChange");
    };

    setV_G2(V_G2){
        this.parameters.V_G2=V_G2;
        this.setGraph("noChange");
    };

    setPP(isPP,doNotRedraw){
        this.PP=isPP;
        if(this.PP){
            this.parameters.load=this.parameters.load*2;
            try{
                document.getElementById(this.whichGraph+"-"+"PP").checked=true;
            }catch(e){};
            try{
                 document.getElementById(this.whichGraph+"-"+"SE").checked=false;
            }catch(e){};
        }else{
            this.parameters.load=this.parameters.load/2;
            try{    
                document.getElementById(this.whichGraph+"-"+"PP").checked=false;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"SE").checked=true;
            }catch(e){};
        }
        try{
            document.getElementById(this.whichGraph+"-"+"load").value=this.parameters.load;
        }catch(e){};
        if(!doNotRedraw)
            this.setGraph("noChange");
    };

    setOperatingMode(value,doNotRedraw){
        switch (value){
            case "ultralinear":{
                    this.parameters.operatingMode="ultralinear";
                    try{
                        this.parameters.UL_TAP=document.getElementById(this.whichGraph+"-"+"UL_TAP").value/100;
                    }catch(e){};
                    this.parameters.V_G2=this.parameters.B_Plus;
                    try{
                        document.getElementById(this.whichGraph+"-"+"ultralinear").checked=true;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"pentode").checked=false;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"triode").checked=false;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"UL_TAP").disabled=false;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"V_G2").disabled=true;   
                    }catch(e){}; 
            }
                break;
            case "pentode":{
                    this.parameters.operatingMode="pentode";
                    this.parameters.UL_TAP=0;
                    try{
                        this.parameters.V_G2=document.getElementById(this.whichGraph+"-"+"V_G2").value;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"ultralinear").checked=false;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"pentode").checked=true;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"triode").checked=false;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"UL_TAP").disabled=true;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"V_G2").disabled=false;
                    }catch(e){};

            }
                break;
            case "triode":{
                    this.parameters.operatingMode="triode";
                    this.parameters.UL_TAP=1;
                    this.parameters.V_G2=this.parameters.B_Plus;
                    try{
                        document.getElementById(this.whichGraph+"-"+"ultralinear").checked=false;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"pentode").checked=false;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"triode").checked=true;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"UL_TAP").disabled=true;
                    }catch(e){};
                    try{
                        document.getElementById(this.whichGraph+"-"+"V_G2").disabled=true;
                    }catch(e){};

            }
                break; 
        }
        if(!doNotRedraw)
            this.setGraph("noChange");
    };
    
    setResistive(isResistive,doNotRedraw){
        if(isResistive){
            this.parameters.loadType="resistive";
            if(this.PP)
                this.setPP(false,true);
            this.updateBiasVoltageTextBox();
            try{
                document.getElementById(this.whichGraph+"-"+"biasVoltage").disabled=false;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"acImpedance").disabled=false;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"headroom").disabled=false;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"PP").disabled=true;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"SE").disabled=true;
            }catch(e){};
        }else{
            this.parameters.loadType="reactive";
            try{
                document.getElementById(this.whichGraph+"-"+"biasVoltage").disabled=true;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"acImpedance").disabled=true;
                document.getElementById(this.whichGraph+"-"+"acImpedance").value="";
                this.parameters.nextStageACIpedance=0;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"PP").disabled=false;
            }catch(e){};
            try{
                document.getElementById(this.whichGraph+"-"+"SE").disabled=false;
            }catch(e){};
        }
        try{
            document.getElementById(this.whichGraph+"-"+"resistive").checked=isResistive;
        }catch(e){};
        try{
             document.getElementById(this.whichGraph+"-"+"reactive").checked=!isResistive;
        }catch(e){};
        if(!doNotRedraw)
            this.setGraph("noChange");
    }
    
    setReactive(isReactive,doNotRedraw){
        this.setResistive(!isReactive,doNotRedraw);
    }
    
    setHeadroom(volt){
        this.headroom=volt*1;
        this.setGraph("noChange");
    }
    
    getHeadroom(){
        return this.headroom;
    }


//To be translated int PHP
    getMaxAnodePowerDissipation(maxV_A){
        var step=3;
        var maxAnodePowerDissipation=[];
        for(var V_A=0;V_A<=maxV_A;V_A=V_A+step){
            maxAnodePowerDissipation.push({x: V_A,y: this.parameters.maxAnodePowerDissipation/V_A});
        }
        return maxAnodePowerDissipation;
    };

    createLoadlineGraph(name, parameters, load){
        var plot={
            label: name+'Load:'+parameters.load+'Ohm',
            showLine: true,
            pointRadius: 0,
            borderColor: "rgb(255,0,0)",
            backgroundColor: "rgb(255,0,0)",
            borderWidth: this.lineWidth,
            fill: false,
            lineTension: 0,
            data: this.getLoadline(parameters,load)
        };
        return plot;
    };
    
    createACLoadlineGraph(name, parameters){
        var plot={
            label: name+'Load:'+parameters.nextStageACIpedance+'Ohm',
            showLine: true,
            pointRadius: 0,
            borderColor: "rgb(0,255,0)",
            backgroundColor: "rgb(0,255,0)",
            borderWidth: this.lineWidth,
            fill: false,
            data: this.getACLoadline(parameters)
        };
        return plot;
    };
    
    getParameters(){
        return this.parameters;
    }

    getLoadline(parameters,load){
        if(parameters.loadType=="reactive")
            return this.getReactiveLoadline(parameters);
        if(parameters.loadType=="resistive")
            return this.getResistiveLoadline(parameters);
    }
    
    ACLoadline(parameters, V_A){
        var ACload=(parameters.load*parameters.nextStageACIpedance)/(parameters.load*1.0+parameters.nextStageACIpedance*1.0);
        var q=parameters.biasVoltage/ACload;
        var m=-(q)/parameters.biasVoltage;
        return m*V_A+q+parameters.biasCurrent;
    }
    
    getACLoadline(parameters){
        var loadline=[{x:0,y:this.ACLoadline(parameters,0)},{x:parameters.maxV_A,y:this.ACLoadline(parameters,parameters.maxV_A)}];
        return loadline;
    }
    
    DCLoadline(parameters, V_A){
        var load=parameters.load;
        var q=parameters.B_Plus/load;
        var m=-(q)/parameters.B_Plus;
        return m*V_A+q;
    }

//To be translated int PHP
    getResistiveLoadline(parameters){
        var loadline=[{x:0,y:this.DCLoadline(parameters, 0)},{x:parameters.B_Plus,y:this.DCLoadline(parameters, parameters.B_Plus)}];
        return loadline;
    };
    
    reactiveLoadline(parameters, V_A){
        var load=parameters.load;
        if(this.PP)
            load=load/2;
        var qA=(parameters.B_Plus/load)+parameters.biasCurrent;
        var mA=-(qA-parameters.biasCurrent)/parameters.B_Plus;
        var classALimitVoltage=(parameters.B_Plus-((-qA/mA)-parameters.B_Plus));
        var classALimitCurrent=mA*classALimitVoltage+qA;
        var qB=parameters.B_Plus/(load/2);
        var mB=-(qB)/parameters.B_Plus;
        qB+=(classALimitCurrent-(mB*classALimitVoltage+qB));
        if(this.PP && V_A<classALimitVoltage)
            return mB*V_A+qB;
        else
            return mA*V_A+qA;
    }
    
    loadline(parameters, V_A){
        if(parameters.loadType=="reactive")
            return this.reactiveLoadline(parameters, V_A);
        else{
            var I=this.ACLoadline(parameters, V_A);
            if(isNaN(I))
                return this.DCLoadline(parameters, V_A);
            else
                return I;
        }
    }

//To be translated int PHP
    getReactiveLoadline(parameters){
        var load=parameters.load;
        if(this.PP)
            load=load/2;
        var qA=(parameters.B_Plus/load)+parameters.biasCurrent;
        var mA=-(qA-parameters.biasCurrent)/parameters.B_Plus;
        var classALimitVoltage=(parameters.B_Plus-((-qA/mA)-parameters.B_Plus));
        var loadline;
        if(this.PP)
            loadline =[{x:0,y:this.reactiveLoadline(parameters,0)},{x:classALimitVoltage,y:this.reactiveLoadline(parameters,classALimitVoltage)},{x:parameters.maxV_A,y:this.reactiveLoadline(parameters,parameters.maxV_A)}];
        else
            var loadline=[{x:0,y:this.reactiveLoadline(parameters,0)},{x:parameters.maxV_A,y:this.reactiveLoadline(parameters,parameters.maxV_A)}];
        return loadline;
    };


    getResistiveOperatingVoltageFromCurrent(parameters,amp){ 
        var qA=parameters.B_Plus/parameters.load;
        var mA=-qA/parameters.B_Plus;
        var V_operating=(amp-qA)/mA;
        return V_operating;
    }

    getResistiveOperatingCurrentFromVoltage(parameters,volt){ 
        var I_operating=this.DCLoadline(parameters,volt);
        return I_operating;
    }
    
    getACOperatingCurrentFromVoltage(parameters,volt){ 
        var I_operating=this.ACLoadline(parameters,volt);
        return I_operating;
    }
    
    getOperatingCurrentFromVoltage(parameters,volt){ 
        var I_operating=this.loadline(parameters,volt);
        return I_operating;
    }

    createOperatingPoint(parameters){
        var V_operating;
        var I_operating;
        if(parameters.loadType=="reactive"){
            V_operating=parameters.B_Plus;
            I_operating=parameters.biasCurrent;
        }
        if(parameters.loadType=="resistive"){
            V_operating=this.getResistiveOperatingVoltageFromCurrent(parameters,parameters.biasCurrent);
            I_operating=parameters.biasCurrent;
        }

        var point={
                    label: "Operating Point:",
                    showLine: true,
                    pointRadius: 5,
                    borderColor: "RGB(255,0,0)",
                    backgroundColor: "RGB(255,0,0)",
                    fill: false,
                    data: [{x:V_operating,y:I_operating}]
                };
        return point;
    };
    
    createHeadroom(parameters,headroom){
        var V_operating;
        
        var I_max;                      //Ia
        var I_max_mid_distorted;        //Ib
        var I_min_mid_distorted;        //Id
        var I_min_distorted;            //Ie
        var I_min;
        
        var V_min;                      //Va
        var V_min_mid_distorted;        //Vb
        var V_max_mid_distorted;        //Vd
        var V_max_distorted;            //Ve
        var V_max;
        
        V_operating=parameters.biasVoltage*1.0;
        V_min=V_operating-headroom;
        V_max=V_operating+headroom;

        I_max=this.getOperatingCurrentFromVoltage(parameters,V_min);
        I_min=this.getOperatingCurrentFromVoltage(parameters,V_max);

        
        var Vg_max=this.computeGridBias(I_max,this.parameters);                     
        var Vg_max_mid=this.parameters.V_G1+(Vg_max-this.parameters.V_G1)/2;      
        var Vg_min_mid=this.parameters.V_G1-(Vg_max-this.parameters.V_G1)/2;                 
        var Vg_min=this.parameters.V_G1-(Vg_max-this.parameters.V_G1);

        V_min_mid_distorted=this.computeVaFromVg(Vg_max_mid,parameters);
        V_max_mid_distorted=this.computeVaFromVg(Vg_min_mid,parameters);
        V_max_distorted=this.computeVaFromVg(Vg_min,parameters);
        
        if(!isNaN(I_max)){
            I_max_mid_distorted=this.getOperatingCurrentFromVoltage(parameters,V_min_mid_distorted);
            I_min_mid_distorted=this.getOperatingCurrentFromVoltage(parameters,V_max_mid_distorted);
            I_min_distorted=this.getOperatingCurrentFromVoltage(parameters,V_max_distorted);
        }
        else
            I_min=I_max;
        
        if(!this.PP){
            var Ia=I_max;
            var Ib=I_max_mid_distorted;
            var Ic=parameters.biasCurrent;
            var Id=I_min_mid_distorted;
            var Ie=I_min_distorted;
        }else{
            var Ia=I_max-I_min_distorted;
            var Ib=I_max_mid_distorted-I_min_mid_distorted;
            var Ic=parameters.biasCurrent-parameters.biasCurrent;
            var Id=I_min_mid_distorted-I_max_mid_distorted;
            var Ie=I_min_distorted-I_max;
        }
        
        //Source: https://jacmusic.com/techcorner/SBENCH-PAGES/sbench102/pent.html
        var hd2 = Math.abs(75*(Ia + Ie - 2*Ic)/(Ia + Ib - Id - Ie));
        var hd3 = Math.abs(50*(Ia - (2*Ib) + (2*Id) - Ie)/(Ia + Ib - Id - Ie));
        var hd4 = Math.abs(25*(Ia - (4*Ib) + (6*Ic) - (4*Id) + Ie)/(Ia + Ib - Id - Ie));/**/
        
        if(!this.PP){
            var Va=V_min;
            var Vb=V_min_mid_distorted;
            var Vc=parameters.biasVoltage;
            var Vd=V_max_mid_distorted;
            var Ve=V_max_distorted;
        }else{
            var Va=V_min-V_max_distorted;
            var Vb=V_min_mid_distorted-V_max_mid_distorted;
            var Vc=parameters.biasVoltage-parameters.biasVoltage;
            var Vd=V_max_mid_distorted-V_min_mid_distorted;
            var Ve=V_max_distorted-V_min;
        }
        
        /*var hd2 = Math.abs(75*(Va + Ve - 2*Vc)/(Va + Vb - Vd - Ve));
        var hd3 = Math.abs(50*(Va - (2*Vb) + (2*Vd) - Ve)/(Va + Vb - Vd - Ve));
        var hd4 = Math.abs(25*(Va - (4*Vb) + (6*Vc) - (4*Vd) + Ve)/(Va + Vb - Vd - Ve));/**/
        
        
        
        var thd="2nd:"+Number(hd2).toFixed(2)+" 3rd:"+Number(hd3).toFixed(2)+" 4th:"+Number(hd4).toFixed(2)+" THD:"+Number(Math.sqrt(hd2*hd2+hd3*hd3+hd4*hd4)).toFixed(2);
        
        //var thd=Math.sqrt(hd2*hd2+hd3*hd3+hd4*hd4);

        //Source: Pierluigi Marzullo:
        //var thd=100*Math.abs((2*V_operating-(V_max_distorted+V_min))/(V_max_distorted-V_min)); 
        try{
                this.updateHDTextBox(thd);
        }catch(e){};

        var point={
                    label: "Headroom:",
                    showLine: true,
                    pointRadius: 5,
                    borderColor: "RGB(0,255,0)",
                    backgroundColor: "RGB(0,255,0)",
                    fill: true,
                    //data: [{x:(V_max_distorted),y:I_min_distorted},{x:(V_max),y:I_min},{x:(V_min),y:I_max}]
                    //data: [{x:Va,y:Ia},{x:Vb,y:Ib},{x:Vc,y:Ic},{x:Vd,y:Id},{x:Ve,y:Ie}]
                    //data: [{x:V_min,y:I_max},{x:V_min_mid_distorted,y:I_max_mid_distorted},{x:V_max_mid_distorted,y:I_min_mid_distorted},{x:V_max_distorted,y:I_min_distorted}]
                    data: [{x:V_min,y:I_max},{x:V_max_distorted,y:I_min_distorted}]
                };
        return point;
    };

//To be translated int PHP
    computeAnodeVoltageOnLoadlineFromVg(parameters,Vg){
        var step=10;
        var I_A;
        var V_A_min;
        for(var V_A=parameters.maxV_A;V_A>0;V_A-=step){
            I_A=this.anodeCurrent(Vg,V_A,parameters);
            V_A_min=V_A;
            if(I_A<=this.loadline(parameters,V_A)&&step<=0.00001){
                break;
            }else
                if(I_A<=this.loadline(parameters,V_A)){
                    V_A+=step;
                    step/=10;
                }
        }
        return V_A_min;
    };
    
    computeReactiveGridBias(current,parameters){
        var Ia_prev=0;
        var load=parameters.load;
        if(this.PP)
            load=load/2;
        var step=100;
        var Ia=0;
        var V_G1=parameters.minV_G1;
        do{
            Ia_prev=Ia;
            var qAa=(parameters.B_Plus/load);
            var mAa=-qAa/parameters.B_Plus;
            var V_Aa=(current-(qAa+this.parameters.biasCurrent))/mAa;
            var qAb=(parameters.B_Plus/(load/2));
            var mAb=-qAb/parameters.B_Plus;
            //var V_Ab=(current-(qAb+this.parameters.biasCurrent))/mAb;
            var V_Ab=(current-(qAb))/mAb;
            var V_A;
            if(this.PP)
                V_A=Math.max(V_Aa,V_Ab);  //CONTROLLARE!!!! Forse è minimo
                //V_A=Math.min(V_Aa,V_Ab);
            else
                //V_A=V_Aa,V_Ab;
                V_A=V_Aa;
            Ia=this.anodeCurrent(V_G1,V_A,parameters);
            if((Ia>=current)||((Ia==Ia_prev&&Ia!=0))){
                Ia_prev=0;
                V_G1-=step;
                step/=10;
            }
            V_G1=V_G1+step;
        //}while(!(Ia>=current&&step<=0.000001||V_A<0||isNaN(Ia)))
        }while(!(Ia>=current&&step<=0.000001||step<=0.000001||V_A<0||isNaN(Ia)))
        return V_G1;
    };
    
    computeResistiveGridBias(current,parameters){
        var Ia_prev=-100;
        var step=100;
        var Ia;
        var V_G1=this.parameters.minV_G1;
        do{
            Ia_prev=Ia;
            var qA=(parameters.B_Plus/this.parameters.load)+current;
            var mA=-(qA-current)/parameters.B_Plus;
            var V_0=-qA/mA;
            var V_A=parameters.B_Plus-(V_0-parameters.B_Plus);
            Ia=this.anodeCurrent(V_G1,V_A,parameters);
            if(Ia>=current||(Ia==Ia_prev&&Ia!=0)){
                Ia_prev=-100;
                V_G1-=step;
                step/=10;
            }
            V_G1=V_G1+step;
        }while(!(Ia>=current&&step<=0.000001||step<=0.000001||V_A<0||isNaN(Ia)));
        return V_G1;
    };
    
    computeACGridBias(current,parameters){
        var step=100;
        var Ia;
        var V_G1=this.parameters.minV_G1;
        var ACload=(this.parameters.load*this.parameters.nextStageACIpedance)/(this.parameters.load*1.0+this.parameters.nextStageACIpedance*1.0);
        do{
            var qA=(this.parameters.biasVoltage/ACload)+this.parameters.biasCurrent;
            var mA=-(qA-this.parameters.biasCurrent)/this.parameters.biasVoltage;
            var V_A=(current-qA)/mA;
            Ia=this.anodeCurrent(V_G1,V_A,parameters);
            if(Ia>=current){
                V_G1-=step;
                step/=10;
            }
            V_G1=V_G1+step;
        }while(!(Ia>=current&&step<=0.000001||V_A<0)||isNaN(Ia))
        return V_G1;
    };
    
    
    

//To be translated int PHP
    computeGridBias(current,parameters){
        var V_G1;
        if(parameters.loadType=="reactive")
            V_G1=this.computeReactiveGridBias(current,parameters);
        else{
            if(parameters.nextStageACIpedance==0||isNaN(parameters.nextStageACIpedance))
                V_G1=this.computeResistiveGridBias(current,parameters);
            else
                V_G1=this.computeACGridBias(current,parameters);
        }
        return V_G1;
    };
    
    
    computeVaFromVg(Vg,parameters){
        var V_a;
        var incr=100;
        //for(V_a=0;V_a<=this.parameters.maxV_A;V_a+=incr){
        for(V_a=0;true;V_a+=incr){ // it stops when encounter break, that it when it interesects the loadline
            var It;
            It=this.anodeCurrent(Vg,V_a,parameters);
            var Il;
            Il=this.getOperatingCurrentFromVoltage(parameters,V_a);
            if(It>=Il && incr<=0.000001||isNaN(It)||isNaN(Il))
                break;
            else
                if(It>=Il ){
                    V_a-=incr;
                    incr/=10;
            }
        }
        return V_a;
    }
    
    createMaxAnodePowerDissipationGraph(parameters){
        var plot={
                label: 'Max Power:'+parameters.maxAnodePowerDissipation+'W',
                showLine: true,
                pointRadius: 0,
                borderColor: "RGB(255,0,0)",
                backgroundColor: "RGB(255,0,0)",
                borderWidth: this.lineWidth,
                borderDash: [10, 10],
                fill: false,
                data: this.getMaxAnodePowerDissipation(parameters.maxV_A)
            };
        return plot;
    };

    anodeCharacteristicGraph(lineChartData,parameters){
        for(var vg=parameters.maxV_G1;vg>=parameters.minV_G1;vg-=parameters.gridStep){
            lineChartData.datasets.push(this.createAnodeCurveGraph(vg,parameters));
        }
        return lineChartData;
    };
    
    screenCharacteristicGraph(lineChartData,parameters){
        for(var vg=parameters.maxV_G1;vg>=parameters.minV_G1;vg-=parameters.gridStep){
            lineChartData.datasets.push(this.createScreenCurveGraph(vg,parameters));
        }
        return lineChartData;
    };

    createAnodeCurveGraph(V_G1,parameters){
        var plot={
            label: 'Vg='+V_G1+'V',
            showLine: true,
            pointRadius: 0,
            borderColor: "rgb(0,0,255)",
            backgroundColor: "rgb(0,0,255)",
            borderWidth: this.lineWidth,
            fill: false,
            data: this.getAnodeCurve(V_G1,parameters)
        };
        return plot;
    };
    
    createScreenCurveGraph(V_G1,parameters){
        var plot={
            label: 'Vg='+V_G1+'V',
            showLine: true,
            pointRadius: 0,
            borderColor: "rgb(255,0,0)",
            backgroundColor: "rgb(255,0,0)",
            borderWidth: this.lineWidth,
            //borderDash: [10, 10],
            fill: false,
            data: this.getScreenCurve(V_G1,parameters)
        };
        return plot;
    };

    getAnodeCurve(V_G1,parameters){
        var step=3;
        var anodeCurve=[];
        for(var V_A=0;V_A<=parameters.maxV_A;V_A=V_A+step){
            anodeCurve.push({x: V_A,y: this.anodeCurrent(V_G1,V_A,parameters)});
        }
        return anodeCurve;
    }
    
    anodeCurrent(V_G1,V_A,parameters){
        var V_G2=parameters.V_G2*(1-parameters.UL_TAP)+V_A*parameters.UL_TAP;
        var I_a;
        if(parameters.tubeType=="pentode")
            I_a=this.pentode1(V_G1, V_A, V_G2, parameters.KP, parameters.MU, parameters.EX, parameters.KG1, parameters.KVB,parameters.M,parameters.Q,parameters.M_1);
        else
            I_a=this.triode(V_G1, V_A, parameters.KP, parameters.MU, parameters.EX, parameters.KG1, parameters.KVB, parameters.VCT,parameters.M_1);
        return I_a;
    }
    
    getScreenCurve(V_G1,parameters){
        var step=3;
        var screenCurve=[];
        for(var V_A=0;V_A<=parameters.maxV_A;V_A=V_A+step){
            screenCurve.push({x: V_A,y: this.screenCurrent(V_G1,V_A,parameters)});
        }
        return screenCurve;
    }
    
    screenCurrent(V_G1,V_A,parameters){
        var V_G2=parameters.V_G2*(1-parameters.UL_TAP)+V_A*parameters.UL_TAP;
        var I_s;
        if(parameters.tubeType=="pentode")
            I_s=this.screen(V_G1,V_G2,parameters.MU,parameters.KG2);
        else
            I_s=0;
        return I_s;
    }


      //To be translated int PHP
    pentode1(V_G1, V_A, V_G2, KP, MU, EX, KG1, KVB,M,Q,M_1){
        var E = V_G2/KP*Math.log(1 + Math.exp((1 / MU + V_G1 / V_G2) * KP));
        //return ((Math.pow(Math.abs(E),EX)) + Math.sign(E) * (Math.pow(Math.abs(E),EX))) / KG1 * Math.atan(V_A / KVB);  //Original Koren formula
        //return V_A*Math.max(0,M+Q*V_G1)+((Math.pow(Math.abs(E),EX)) + Math.sign(E) * (Math.pow(Math.abs(E),EX))) / KG1 * Math.atan(V_A / KVB);  //new formula for non converging pentodes
        return Math.min(V_A*M_1,V_A*Math.max(0,M+Q*V_G1)+((Math.pow(Math.abs(E),EX)) + Math.sign(E) * (Math.pow(Math.abs(E),EX))) / KG1 * Math.atan(V_A / KVB));  //new formula 2 for non converging pentodes and beam tetrodes - linear 
        //return Math.min(Math.pow(V_A,1.5)*32.5/V_G2*M_1,V_A*Math.max(0,M+Q*V_G1)+((Math.pow(Math.abs(E),EX)) + Math.sign(E) * (Math.pow(Math.abs(E),EX))) / KG1 * Math.atan(V_A / KVB));  //new formula 2 for non converging pentodes and beam tetrodes - power law inv proportional to screen
        //return Math.min(Math.pow(V_A,1.5)*0.13*M_1,V_A*Math.max(0,M+Q*V_G1)+((Math.pow(Math.abs(E),EX)) + Math.sign(E) * (Math.pow(Math.abs(E),EX))) / KG1 * Math.atan(V_A / KVB));  //new formula 2 for non converging pentodes and beam tetrodes - power law fixed
    };
    
    screen(V_G1, V_G2, MU, KG2){
        var I=Math.pow((V_G1+V_G2/MU),(1.5))/KG2;
        return((V_G1+V_G2/MU)>=0)?I:0;
    };
    
    //To be translated int PHP
    triode(V_G1, V_A, KP, MU, EX, KG1, KVB, VCT,M_1){
        var E = V_A / KP * Math.log(1 + Math.exp(KP * (1 / MU + (V_G1 + VCT) / Math.sqrt(KVB + V_A * V_A))));
        //return ((Math.pow(Math.abs(E),EX)) + Math.sign(E) * (Math.pow(Math.abs(E),EX))) / KG1; without power law for high grid values
        return Math.min(Math.pow(V_A,1.5)*0.13*M_1,((Math.pow(Math.abs(E),EX)) + Math.sign(E) * (Math.pow(Math.abs(E),EX))) / KG1); //with power law for high grid values
    };
    
}