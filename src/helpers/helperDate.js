//function accepts timestamp format as an arguement and returns abriviated form of month+day string f.e "13 Apr"

const formatDate =(dateStamp)=>{
    let extractedDate = new Date(dateStamp);
    let extractedMonth = extractedDate.getMonth()
    let month
    let day = extractedDate.getDay()
    switch(extractedDate.getMonth()){
      case 0:
         month = "Jan";
         break;
      case 1:
         month = "Feb";
         break;
      case 2:
         month = "Mar";
         break;
      case 3:
         month = "Apr";
         break;
      case 4:
         month = "May";
         break;
      case 5:
         month = "Jun";
         break;
      case 6:
         month = "July";
         break;
      case 7:
         month = "Aug";
         break;
      case 8:
         month = "Sep";
         break;
      case 9:
         month = "Oct";
         break;
      case 10:
         month = "Nov";
         break;
      case 11:
         month = "Dec";
         break;
    }
    return `${day+1} ${month}`
 }

 export default formatDate;