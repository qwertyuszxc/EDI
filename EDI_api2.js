fetch('https://my.api.mockaroo.com/edi.json?key=12a6d260').then((data) =>{
    //console.log(data);
    return data.json();
}).then((objectData) => {
    console.log(objectData[0].Nickname);
    let tableData ='';
    let activeCount = 0;
    let notActiveCount = 0;

    const today = new Date();
    const ageBuckets = [0, 0, 0]; // do 20, 21-40, ponad 40 lat

    objectData.forEach((values) => {
        if (values.Active) {
            activeCount++;
        } else {
            notActiveCount++;
        }

        const birthDate = new Date(values.Date_of_birth);
        const age = 2022 - birthDate.getFullYear();
        console.log(`Wiek dla ${values.Real_Name}: ${age}`);
        if (age < 21) {
            ageBuckets[0]++;
        } else if (age < 26) {
            ageBuckets[1]++;
        } else {
            ageBuckets[2]++;
        }
    });

    objectData.map((values) => {
        tableData+=         `<tr>
        <td>${values.Nickname}</td>
        <td>${values.Active}</td>
        <td>${values.Real_Name}</td>
        <td>${values.Date_of_birth}</td>
        <td>${values.Country_of_birth}</td>
    </tr>`;
    });
    document.getElementById('table-body').innerHTML=tableData;





    const ctx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Active', 'Not Active'],
            datasets: [{
                label: '# of Votes',
                data: [activeCount, notActiveCount],
                backgroundColor: [
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            }],
        },
    });
    pieChart.canvas.parentNode.style.height = '400px';
    pieChart.canvas.parentNode.style.width = '400px';
    pieChart.canvas.parentNode.style.float = 'right';

    

const ctx2 = document.getElementById('barChart').getContext('2d');
const barChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['< 21', '21-25', '> 25'],
        datasets: [{
            label: 'Age of our users',
            data: ageBuckets,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        }],
    },
});


})