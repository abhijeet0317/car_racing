const score = document.querySelector('.score');
        const startScreen = document.querySelector('.startScreen');
        const gameArea =  document.querySelector('.gameArea');
        let x = 1;

        startScreen.addEventListener('click' , start);

        let player = { speed : 5 , score : 0};

        let keys = {ArrowUp : false , ArrowDown: false, ArrowLeft: false ,
             ArrowRight: false};

        document.addEventListener('keydown' , keyDown);
        document.addEventListener('keyup' , keyUp);

        function keyDown(e){
            e.preventDefault(); 
            keys[e.key] = true;  
            // console.log(e.key);
            // console.log(keys); 
        }
        function keyUp(e){
            e.preventDefault();
            keys[e.key] = false;
        }

        function isCollide(a,b){
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();

            return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
                (aRect.right < bRect.left) || (aRect.left > bRect.right));
        }

        function moveLines(){
            let lines = document.querySelectorAll('.lines');
            lines.forEach((item) =>{
                if(item.y >= 750){
                    item.y = -50;
                }
                item.y += player.speed;
                item.style.top = item.y +'px'; 
            })
        }

        function endGame(){
            player.start = false;
            x = 1;
            startScreen.classList.remove('hide');
            startScreen.innerHTML = "Game Over <br/> Your final Score is "+ player.score
            + "<br/>press here to restart the game.";
        }

        function moveEnemy(car){
            let enemy = document.querySelectorAll('.enemy');
            enemy.forEach((item) =>{

                if(isCollide(car , item)){
                    console.log('Boom hit');
                    endGame();
                }

                if(item.y >= 750){
                    item.y = -300;
                    item.style.left = Math.floor(Math.random() * 350)+'px';
                }
                item.y += player.speed;
                item.style.top = item.y +'px';  
                
            })
        }

        function gamePlay(){

            let car = document.querySelector('.car');
            let road = gameArea.getBoundingClientRect(); 
    
            if (player.start){

                moveLines();
                moveEnemy(car); 
                if(keys.ArrowUp && player.y > road.top + 100 ){ player.y -= player.speed};
                if(keys.ArrowDown && player.y < road.bottom - 70){ player.y += player.speed};
                if(keys.ArrowLeft && player.x > 0 ){ player.x -= player.speed};
                if(keys.ArrowRight && player.x < (road.width - 50)){ player.x += player.speed};
 
                car.style.top = player.y + 'px';
                car.style.left = player.x + 'px';

                window.requestAnimationFrame(gamePlay);
             
                player.score++;
                let ps = player.score -1;
                score.innerText = "Score : " + ps;
                
            }   
        }
        function start(){
            // gameArea.classList.remove('hide');
            startScreen.classList.add('hide');
            gameArea.innerHTML = "";

            player.start = true;
            player.score = 0;
            player.speed = 5;
            console.log(player.speed);

            for(let i = 0 ; i< 5;i++){
                let roadLine = document.createElement('div');
                roadLine.setAttribute('class' , 'lines');
                roadLine.y = (i*150); 
                roadLine.style.top = roadLine.y +'px';
                gameArea.appendChild(roadLine);
            }

            let car = document.createElement('div');
            car.classList.add('car');                   
           
            gameArea.insertAdjacentElement('afterBegin' , car); 

            player.x = car.offsetLeft;
            player.y = car.offsetTop;
            
            for(let i = 0 ; i< 3;i++){
                let enemyCar = document.createElement('div');
                enemyCar.setAttribute('class' , 'enemy');
                enemyCar.y = ((i+1) * 350) * -1; 
                enemyCar.style.top = enemyCar.y +'px';
                enemyCar.style.backgroundColor = randomColor();
                enemyCar.style.left = Math.floor(Math.random() * 350)+'px';
                gameArea.appendChild(enemyCar);
            }

            window.requestAnimationFrame(gamePlay);
        }

        function randomColor(){
            function c(){
                let hex = Math.floor(Math.random() * 256).toString(16);
                return ("0" + String(hex)).substr(-2); 
            }
            return "#"+c()+c()+c();
        }