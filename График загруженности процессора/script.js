var speedData = {
    labels: [],
    datasets: [{
      label: "Загруженность процессора",
      data: [],
      lineTension: 0,
      fill: false,
      borderColor: 'red',
      backgroundColor: 'transparent',
      pointBorderColor: 'red',
      pointBackgroundColor: 'rgba(255,150,0,0.5)',
      pointRadius: 5,
      pointHoverRadius: 10,
      pointHitRadius: 30,
      pointBorderWidth: 2
    }]
  };

var chartOptions = { 
    legend: {
        display: true,
        position: 'top',
        labels: {
            boxWidth: 80,
            fontColor: 'black'
        }
    }
};


let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: speedData,
    options: chartOptions
});

const URL_GPU = "http://exercise.develop.maximaster.ru/service/cpu/";
let time = 0;
let requestsCount = 0;
let errorCount = 0;
let lastResult = 0;
let requestLabel;
let errorLabel;

setInterval(() => {
    requestLabel = document.getElementById("requestsCount");
    errorLabel = document.getElementById("errorCount"); 
    requestLabel.innerHTML = requestsCount;
    errorLabel.innerHTML = ((errorCount / requestsCount) * 100).toFixed(2) + "%";
    time += 5;
    requestsCount++;
    UpdateGPU(URL_GPU).then(gpuData =>{
        console.log(gpuData);
        lastResult = gpuData;
        AddData(myChart, time, gpuData);
    });
}, 5000);


async function UpdateGPU(url){
    let response = null;

    response = await fetch(url);

    if (response.ok) {
        return await response.text();
    }
    else{
        errorCount++;
        return lastResult;
    }
}


function AddData(chart, label, data){
    chart.data.labels.push(label + "s");
    chart.data.datasets.forEach(dataset => {
        dataset.data.push(data);
    });
    chart.update();
}