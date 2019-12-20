const express = require('express');
require('dotenv').config();

function Fact(n) {
    //console.log(n)
    if(n < 0){
        console.error("Factorial of a negative number is not allowed");
        return 0;
    }
    if((n == 1) || (n == 0)){
        return 1;
    }
    else{
        return n*Fact(n-1);
    }
};

function CalcProb(x, n){//Ones are not wild
    if( x > n){
        return 0;
    }
    let C = (Fact(n)/(Fact(n-x) * Fact(x))) * Math.pow(1.0/6.0,x) * Math.pow(5.0/6.0,n-x);
    while(x < n){
        x++;
        //console.log(x, C)
        C += (Fact(n) / (Fact(n - x) * Fact(x))) * Math.pow(1.0 / 6.0, x) * Math.pow(5.0 / 6.0, n - x);
    }
    return C*100;    
};

function CalcProb2(x, n) {//ones are wild
    if (x > n) {
        return 0;
    }
    let C = (Fact(n) / (Fact(n - x) * Fact(x))) * Math.pow(2.0 / 6.0, x) * Math.pow(4.0 / 6.0, n - x);
    //console.log(x, C);
    while (x < n) {
        x++;
        var p = (Fact(n) / (Fact(n - x) * Fact(x))) * Math.pow(2.0 / 6.0, x) * Math.pow(4.0 / 6.0, n - x);
      //  console.log(x, p);
        C += p;
    }
    return C*100;
}

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (req, res)=>{
    const data = req.body;
    console.log(data);
    var result;
    if(data.ones){
        result = CalcProb2(parseInt(data.bet), parseInt(data.count));
    }
    else{
        result = CalcProb(parseInt(data.bet), parseInt(data.count));
    }
    res.json(result); 
});

//FIXME: strict typing!