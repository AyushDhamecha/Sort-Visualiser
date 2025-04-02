
// Accessing DOM Elements 

const sortingVisualizerDOM = document.getElementById(
  "sorting-visualizer-container__bar"
);

const arrayRangeSliderDOM = document.querySelector(".array-range-slider");

const arraySizeTextDOM = document.querySelector(".array-range-slider-label");

const speedTextDOM = document.querySelector('.speed-range-slider-label');

const sortingBar = document.getElementsByClassName("sorting-bar");

const optionBtnDOM = document.querySelector(".sorting-option-btn");

const sortingStartBtnDOM = document.querySelector(".start-sorting-btn");

const generateNewArrayBtn =  document.querySelector('.generate-array-btn');

const speedRangeSliderDOM = document.querySelector('.speed-range-slider');

const barDirectionBtn =  document.querySelector('.bar-direction-btn');

const myToast =  document.querySelector('.my-toast');

const SORTING_OPTION = ["Bubble Sort", "Selection Sort", "Merge Sort", "Quick Sort"];


const COLORS = {
  bar: "orange",
  sortedNumber: "#9b59b6",
  firstNumber: "#FF4949",
  secondNumber: "#2ecc71",
};

// Initilial States Every Btn And Graphs


const setGlobalStates = {
    arraySize : 50,
    speed : 50,
}



// Generate random number and return back to caller 

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

// Create a bar and append into dom
const createSortingBar = (hasText = true) => {
    const rand = getRandomNumber();
    const bar = document.createElement("div");
    bar.className = "sorting-bar";
    bar.setAttribute("style", `height:${rand}%`);
    
    // Create a number element that is always visible
    const numberLabel = document.createElement("p");
    numberLabel.textContent = rand;
    numberLabel.style.opacity = 1;  // Ensure visibility
    numberLabel.style.position = "absolute";
    numberLabel.style.top = "-20px";  // Position above the bar
    numberLabel.style.left = "50%";
    numberLabel.style.transform = "translateX(-50%)";
    numberLabel.style.color = "white";  
    numberLabel.style.fontSize = "14px";
    numberLabel.style.fontWeight = "bold";

    bar.appendChild(numberLabel);  // Add the number inside the bar
    sortingVisualizerDOM.append(bar);
};


// Generate a array of random number and create a bar of that number
const generateNewArray = arraySize => {

  const hasText = arraySize > 40 ? false : true;

  sortingVisualizerDOM.innerHTML = "";
  for (let i = 0; i < arraySize; i++) {
    createSortingBar(hasText);
  }
};

// Slider event it's used to increase or decrease the array size
arrayRangeSliderDOM.addEventListener("input", (event) => {
  const size = event.target.value;
  arraySizeTextDOM.innerHTML = `Array Size =  ${size}`;
  setGlobalStates.arraySize = size;
  generateNewArray(size);
});

// Slider event it's used to increase or decrease the speed of sorting 
speedRangeSliderDOM.addEventListener("input", (event) => {
  const speed = event.target.value;
  speedTextDOM.innerHTML = `Speed =  ${speed} ms`;
  setGlobalStates.speed = speed;
});


// Generating New Array Listner 

generateNewArrayBtn.addEventListener('click',()=>{
    generateNewArray(setGlobalStates.arraySize);
});



// sorting option value, By default 1 it's means Bubble Sort

let selectedSortIngOption = 1;

// it's change the sorting algorithms
optionBtnDOM.addEventListener("click", () => {
  if (selectedSortIngOption == SORTING_OPTION.length) selectedSortIngOption = 0;
  optionBtnDOM.innerHTML = `${SORTING_OPTION[selectedSortIngOption++]}
          <span class="material-icons">
          expand_more
          </span>`;
});



// Helper Method
function swap(node1, node2) {
  return new Promise((resolve) => {
    [node1.style.backgroundColor, node2.style.backgroundColor] = [
      COLORS.firstNumber,
      COLORS.secondNumber,
    ];
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        sortingVisualizerDOM.insertBefore(node2, node1);
        setTimeout(() => {
          [node1.style.backgroundColor, node2.style.backgroundColor] = [
            COLORS.bar,
            COLORS.bar,
          ];
          resolve();
        }, setGlobalStates.speed);
      }, setGlobalStates.speed);
    });
  });
}

// Heaper method sorted Number Color Change
const sortedNumber = (num) => {
  num.style.backgroundColor = COLORS.sortedNumber;
};

const getValue = (node) => {
  return parseInt(node.textContent);
};

const chanegBarColor = (arr, color) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.backgroundColor = color;
  }
};



// Bubble Sorting Alogrithm


const bubbleSort = async () => {

  for (let i = 0; i < sortingBar.length - 1; i += 1) {

      for (let j = 0; j < sortingBar.length - i - 1; j += 1) {

          if ( getValue(sortingBar[j]) > getValue(sortingBar[j+1])){
              await swap(sortingBar[j],sortingBar[j+1]);
          }
      }
      sortedNumber(sortingBar[sortingBar.length - i - 1]);
  }
   sortedNumber(sortingBar[0]);
}

//quick sort algo
const quickSort = async (left = 0, right = sortingBar.length - 1) => {
  if (left >= right) return;

  let pivotIndex = await partition(left, right);

  await quickSort(left, pivotIndex - 1); // Sort left half
  await quickSort(pivotIndex + 1, right); // Sort right half

  if (left === 0 && right === sortingBar.length - 1) {
      for (let i = 0; i < sortingBar.length; i++) {
          sortedNumber(sortingBar[i]); // Mark entire array as sorted
      }
  }
};

const partition = async (left, right) => {
  let pivot = sortingBar[right]; // Choosing the last element as the pivot
  pivot.style.backgroundColor = COLORS.firstNumber; // Highlight the pivot
  let pivotValue = getValue(pivot);
  let i = left - 1;

  for (let j = left; j < right; j++) {
      if (getValue(sortingBar[j]) < pivotValue) {
          i++;
          await swap(sortingBar[i], sortingBar[j]);
      }
  }

  await swap(sortingBar[i + 1], sortingBar[right]); // Place pivot in correct position
  pivot.style.backgroundColor = COLORS.sortedNumber; // Mark pivot as sorted
  return i + 1; // Return pivot index
};


// Selection Sort Algo..


const selectionSort = async () => {

 
  for (let i = 0; i < sortingBar.length - 1 ; i++) {

      for (let j = i + 1; j < sortingBar.length; j++) {

  
          if (getValue(sortingBar[i]) > getValue(sortingBar[j])){
              await swap(sortingBar[i],sortingBar[j]);
          }
      
      }
     sortedNumber(sortingBar[i])
  }
  sortedNumber(sortingBar[sortingBar.length-1])
 return new Promise( resolve => resolve());
}



// Merge Sort Algo...
const mergeSort = async (arr) => {
  if (arr.length === 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  const leftResult = await mergeSort(left);
  const rightResult = await mergeSort(right);
  const result = await merge(leftResult, rightResult);
  //   sortingArrayColor(result);
  return result;
};

const merge = async (leftNodes, rightNodes) => {
  chanegBarColor(leftNodes, COLORS.firstNumber);
  chanegBarColor(rightNodes, COLORS.secondNumber);
  let results = [];
  let node;
  while (leftNodes.length && rightNodes.length) {
    if (getValue(leftNodes[0]) > getValue(rightNodes[0])) {
      node = leftNodes.shift();
    } else {
      node = rightNodes.shift();
    }
    await appendNode(node);
    results.push(node);
  }
  while (leftNodes.length) {
    node = leftNodes.shift();
    await appendNode(node);
    results.push(node);
  }

  while (rightNodes.length) {
    node = rightNodes.shift();
    await appendNode(node);
    results.push(node);
  }
  return results;
};

function appendNode(node) {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        sortingVisualizerDOM.insertBefore(node , sortingBar[0]);
        setTimeout(() => {
          node.style.backgroundColor = COLORS.sortedNumber;
          resolve();
        }, 50);
      }, setGlobalStates.speed);
    });
  });
}


// Change Bar Direction Top To Bottom and Vs

barDirectionBtn.addEventListener('click',()=>{
    sortingVisualizerDOM.classList.toggle('sorting-bar--change-flex');
    
})


// Switch Button States
const switchButtonStates = (value , msg) => {

  myToast.classList.add('my-toast-ans-active');
  myToast.textContent = msg;

  arrayRangeSliderDOM.disabled = value;
  optionBtnDOM.disabled = value;
  sortingStartBtnDOM.disabled = value;
  generateNewArrayBtn.disabled = value;

  if(value){
     generateNewArrayBtn.style.backgroundColor = '#494949';
     optionBtnDOM.style.backgroundColor = '#494949';
     sortingStartBtnDOM.style.backgroundColor  = '#494949';
  }else{
    generateNewArrayBtn.style.backgroundColor = '#212121';
    optionBtnDOM.style.backgroundColor = '#212121';
    sortingStartBtnDOM.style.backgroundColor  = '#212121';
  }

};

myToast.addEventListener('animationend',() => {
  myToast.classList.remove('my-toast-ans-active');
})

sortingStartBtnDOM.addEventListener("click", async () => {
  switchButtonStates(true , 'Processing Started');
  await executeSelectedFunction();
  switchButtonStates(false, 'Process Completed');
});


//Helper Method Call A Selection Sorting Algo Funxtion...


const executeSelectedFunction = async () => {
  const name = optionBtnDOM.textContent.trim();
  if (name.includes('Bubble Sort')) await bubbleSort();
  else if (name.includes('Selection Sort')) await selectionSort();
  else if (name.includes('Merge Sort')) await mergeSort(Array.from(sortingBar));
  else if (name.includes('Quick Sort')) await quickSort();
};



// Default Array Generate
generateNewArray(50);
