let obj = [
    {
        "address": "0xbaa81e92c1c6ad6aebd1b69ad67c019815143de7",
        "tokenAmt": 12.697083333333282,
        "usdAmt": 45974.36115833315,
        "weiAmt": 12697083333333283000,
        "date": "Mon Sep 20 2021 22:24:29 GMT-0700 (Pacific Daylight Time)",
        "transactions": 1
    },
    {   "address": "0xbaa81e92c1c6ad6aebd1b69ad67c019815143de7",
        "tokenAmt": 12.697083333333282,
        "usdAmt": 45974.36115833315,
        "weiAmt": 12697083333333283000,
        "date": "Mon Sep 20 2021 22:24:29 GMT-0700 (Pacific Daylight Time)",
        "transactions": 1
    }

];

for(let key in obj){
   key["address"] = "cutiepie";
}
console.log(obj);