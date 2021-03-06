//L’utente indica un livello di difficoltà (3 pulsanti) in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella
// contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

function getRandomNumber(min,max){  //funzione che genera un numero randomico tra un min e un max 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gridGenerator(num,container){  //funzione per la creazione della griglia
    const cells = [];
    container.innerHTML = "";  //svuoto la griglia precedente
    for(let i=1; i <= num; i++){
        const newBox = document.createElement('div');
        newBox.classList.add('box');
        newBox.innerHTML += `${i}`;
        // newBox.addEventListener('click',function(){  //al click sul box, il box diventa azzurro
        //     this.classList.add('light-blue');
        // })
        cells.push(newBox);
        container.append(newBox);
    }
    const width = Math.sqrt(num) * 60; // calcolo la larghezza della griglia facendo la radice quadrata del numero ricevuto in ingresso dalla funzione 
    container.style.width = `${width}px`;  //moltiplicato per la larghezza di un singolo box della griglia
    return cells;
    
}

function hideElements(element1,element2,element3){  //funzione che aggiunge la classe hide agli elementi che gli vengono passati in input 
    element1.classList.add('hide');
    element2.classList.add('hide');
    element3.classList.add('hide');
}

function bombsGenerator(rangeMax){  //funzione che genera un array di numeri (le bombe)
    const bombs = [];
    while(bombs.length < 16){
        let oneBomb = getRandomNumber(1,rangeMax);  //richiamo la funzione per generare i numeri randomicamente
        if(!bombs.includes(oneBomb)){
            bombs.push(oneBomb);
        }
    }
    return bombs; //ritorna l'array
}

function play(n,counter,array1,array2,endBlock,status,grid){
    
        for(let i=0; i < n; i++){
                array1[i].addEventListener('click',function(){
                    counter = document.querySelectorAll('.light-blue').length +1;
                    if((status) && (counter < (n - 16))){
                        if(array2.includes(i+1)){
                            status = false;
                            array1[i].classList.add('red');
                            endBlock.classList.remove('end');
                            endBlock.classList.add('end1');
                            grid.append(endBlock);
                            counter = document.querySelectorAll('.light-blue').length;
                            results.innerHTML = `punteggio: ${counter}`;
                         }else{
                            array1[i].classList.add('light-blue');
                            results.innerHTML = `punteggio: ${counter}`;
                         }
                    }else if(counter === (n - 16)){
                        array1[i].classList.add('light-blue');
                        results.innerHTML = `punteggio: ${counter}`;
                        status = false;
                        win.classList.remove('win');
                        win.classList.add('win1');
                        win.innerHTML = 'HAI VINTO';
                        grid.append(win);
                    }
                
                 })
            
         }
    

}

//definisco le variabili del programma
const button1 = document.querySelector('.level-1');
const button2 = document.querySelector('.level-2');
const button3 = document.querySelector('.level-3');
const buttonsContainer = document.querySelector('.buttons-container');
const grid = document.getElementById('grid');
const backButton = document.querySelector('.back');
const gameOver = document.querySelector('.end');
const results = document.querySelector('.results');
const win = document.querySelector('.win');


let mines = []; //array per contenere le bombe 
let gridElements = [];
let safeCounter = 0;
let playing = true;


button1.addEventListener('click',function(){  //evento sul click del bottone livello 1
    gridElements = gridGenerator(100,grid);  //richiamo la funzione per generare la griglia
    mines = bombsGenerator(100);

    play(100,safeCounter,gridElements,mines,gameOver,playing,grid);
    results.style.display = 'block';
     
})


button2.addEventListener('click',function(){  //evento sul click del bottone livello 2
    gridElements = gridGenerator(81,grid);   //richiamo la funzione per generare la griglia
    mines = bombsGenerator(81);

    play(81,safeCounter,gridElements,mines,gameOver,playing,grid);
     results.style.display = 'block';
})

button3.addEventListener('click',function(){  //evento sul click del bottone livello 3
    gridElements = gridGenerator(49,grid);   //richiamo la funzione per generare la griglia
    mines = bombsGenerator(49);
    
    play(49,safeCounter,gridElements,mines,gameOver,playing,grid);
     results.style.display = 'block';
})

