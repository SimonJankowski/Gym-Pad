//Function below takes as arguement array of Objects, loops over them 
//and checks if dates are apearing as one day after another
//then adding aditional objects with value null


const fillTheDates = (arrFromDB) => {

  let newArr = [arrFromDB[0]];
  let dayInAarray, nextDayInAarray, nextDay, fillUpDay, d, lastDayInArray;
  for (let i = 0; i < arrFromDB.length - 1; i++) {
    dayInAarray = new Date(arrFromDB[i].date);
    nextDayInAarray = new Date(arrFromDB[i + 1].date);
    nextDay = new Date(arrFromDB[i].date);              //nextDay is a duplicate of dayInArray but, is needed because it will be modified in the next line
    nextDay.setDate(dayInAarray.getDate() + 1);
    //first It will check if there are entries from the same day, if so, he will ignore the one that apears later in array
    if(dayInAarray.getDate()===nextDayInAarray.getDate() && dayInAarray.getMonth()===nextDayInAarray.getMonth()){
      console.log("two entries from the same day");
      continue
    }
    if (nextDay.getDate() === nextDayInAarray.getDate() && nextDay.getMonth()===nextDayInAarray.getMonth()) {
      console.log("no gap in an array");
      newArr.push(arrFromDB[i + 1]);
    } else {
      console.log("it is not a next day");
      lastDayInArray=arrFromDB[i].date
      do {
        lastDayInArray = lastDayInArray+86400000;
        fillUpDay = {
          date: lastDayInArray,
          value: null,
        };
        newArr.push(fillUpDay);
        console.log("added fillup day")
        d = new Date(fillUpDay.date)
        d.setDate(d.getDate()+1)
      } while (d.getDate() !== nextDayInAarray.getDate());
      newArr.push(arrFromDB[i + 1])
    }
  }
  return newArr;
};

export default fillTheDates;
