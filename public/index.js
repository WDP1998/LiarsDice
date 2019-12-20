async function GetTheNums(){
    try {
        let bet = document.getElementById('bet').value;
        let count = document.getElementById('count').value;
        var ones = document.querySelector('.ones').checked;
        const data = {
            bet,
            count,
            ones
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const resdata = await response.json();
        let res = document.getElementById('res');
        res.innerText = "Odds = " + resdata + "%"
        

    } catch (error) {
        console.error(error);
    }
}