let level = 1;
game()

function game(){
    let icons, wins, totalWins, cardNum, containerW, containerH, cardDimension, timerH, duration, interval, scaleY;

    if(level === 1){
        icons = ["/L1/p1.jpg","/L1/p2.jpg","/L1/p3.jpg","/L1/p4.jpg","/L1/p5.jpg","/L1/p6.jpg","/L1/p7.jpg","/L1/p8.jpg",
                 "/L1/p1.jpg","/L1/p2.jpg","/L1/p3.jpg","/L1/p4.jpg","/L1/p5.jpg","/L1/p6.jpg","/L1/p7.jpg","/L1/p8.jpg"];
        wins = 0;
        totalWins = 8;
        cardNum = 16;
        containerW = `600px`;
        containerH = `600px`;
        cardDimension = `150px`;
        timerH = 600;
        duration = 60000;
        interval = 50;
        scaleY = 1;
    }else if(level === 2){        
        icons = ["/L2/p1.jpg","/L2/p2.jpg","/L2/p3.jpg","/L2/p4.jpg","/L2/p5.jpg","/L2/p6.jpg","/L2/p7.jpg","/L2/p8.jpg","/L2/p9.jpg","/L2/p10.jpg",
                 "/L2/p1.jpg","/L2/p2.jpg","/L2/p3.jpg","/L2/p4.jpg","/L2/p5.jpg","/L2/p6.jpg","/L2/p7.jpg","/L2/p8.jpg","/L2/p9.jpg","/L2/p10.jpg"];
        wins = 0;
        totalWins = 10;
        cardNum = 20;
        containerW = `600px`;
        containerH = `480px`;
        cardDimension = `120px`;
        timerH = 480;
        duration = 90000;
        interval = 50;
        scaleY = 1;
    }
    else if(level === 3){
        icons = ["/L3/p1.jpg","/L3/p2.jpg","/L3/p3.jpg","/L3/p4.jpg","/L3/p5.jpg","/L3/p6.jpg","/L3/p7.jpg","/L3/p8.jpg","/L3/p9.jpg","/L3/p10.jpg","/L3/p11.jpg",
                 "/L3/p12.jpg","/L3/p13.jpg","/L3/p14.jpg","/L3/p15.jpg","/L3/p1.jpg","/L3/p2.jpg","/L3/p3.jpg","/L3/p4.jpg","/L3/p5.jpg","/L3/p6.jpg","/L3/p7.jpg",
                 "/L3/p8.jpg","/L3/p9.jpg","/L3/p10.jpg","/L3/p11.jpg","/L3/p12.jpg","/L3/p13.jpg","/L3/p14.jpg","/L3/p15.jpg"];
        wins = 0;
        totalWins = 15;
        cardNum = 30;
        containerW = `600px`;
        containerH = `500px`;
        cardDimension = `100px`;
        timerH = 500; 
        duration = 120000;
        interval = 50;
        scaleY = 1;
    }
    let twoFliped = [];

    let container = document.querySelector('.container');
    let timer = document.querySelector('.timer');
    timer.style.height = `${containerH}`;
    container.style.width = containerW;
    container.style.height = containerH;
    createGrid();

    let cards = document.querySelectorAll('.card');
    let backs = document.querySelectorAll('.back');
    let fronts = document.querySelectorAll('.front');
    for(let i = 0; i < cards.length; i++){
        cards[i].style.width = cardDimension;
        cards[i].style.height = cardDimension;
        backs[i].style.width = cardDimension;
        backs[i].style.height = cardDimension;
        fronts[i].style.width = cardDimension;
        fronts[i].style.height = cardDimension;
    }
    let decrement = interval / duration;
    let timerInterval = setInterval(()=>{
        scaleY -= decrement; // Smanjujemo `scaleY` vrednost
        timer.style.transform = `scaleY(${scaleY})`; // Ažuriramo `transform` da koristi novu vrednost

        // Proveravamo da li je `scaleY` dostigao nulu
        if (scaleY <= 0) {
        clearInterval(timerInterval); // Zaustavljamo interval
        timer.style.transform = 'scaleY(0)'; // Osiguravamo da `scaleY` bude tačno nula
        alert("Zao nam je ali je vreme isteklo!");
        cards.forEach(card => card.removeEventListener('click', flipCard));
        
  }
    },interval);
    cards.forEach(card => card.addEventListener('click', flipCard));

    function flipCard(){
        this.removeEventListener('click', flipCard)
        this.classList.add("active");
        twoFliped.push(this);
        if(twoFliped.length === 2){
            checkCards()
        }
    }

    function checkCards(){
        removeAllClicks()
        let back1 = twoFliped[0].querySelector('.back');
        let back2 = twoFliped[1].querySelector('.back');
        if(back1.innerHTML === back2.innerHTML){
            wins++;
            if(wins === totalWins) {
                level++;
                clearInterval(timerInterval);
                timer.style.transform = 'scaleY(0)';
                setTimeout(()=> {
                    alert(`Cestitamo! Uspesno ste zavrsili level ${level-1}`);
                    game()
                },700);
            }
            twoFliped = [];
            returnClicks();               
        }
        else {
            setTimeout(() => {
                twoFliped[0].classList.remove('active');    
                twoFliped[1].classList.remove('active');
                twoFliped = [];
                returnClicks();
                
            }, 700);
        }
    }

    function returnClicks(){
        let cardsNoActive = document.querySelectorAll('.card:not(.active)');
        cardsNoActive.forEach(card => card.addEventListener('click', flipCard));
    }

    function removeAllClicks(){
        cards.forEach(card => card.removeEventListener('click', flipCard));
    }

    function createGrid(){
        let cardsHtml = "";
        for(let i = 0; i < cardNum; i++){            
            let rand = Math.floor(Math.random()*icons.length);
            cardsHtml += `<div class="card">
                        <div class="back""><img src="${icons[rand]}"></div>
                        <div class="front"></div>
                    </div>
            `.trim()
            icons.splice(rand,1);
        }
        container.innerHTML = cardsHtml;
    }
}