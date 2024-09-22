class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject, controllers) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
        this.isGameOver = false;
        this.controllers = controllers;
    }

    start() {
        this.update();
        this.controlTurns();
        this.controllers.initialize(this);
    }

    controlTurns() {
        const fighter1AttackButton = this.controllers.fighter1AttackButton;
        const fighter2AttackButton = this.controllers.fighter2AttackButton;
        const healer1Button = this.controllers.healer1Button;
        const healer2Button = this.controllers.healer2Button;

        // Desativando os botões de ataque e cura e ajustando o cursor no início
        fighter1AttackButton.disabled = true;
        fighter2AttackButton.disabled = true;
        healer1Button.disabled = true;
        healer2Button.disabled = true;

        fighter1AttackButton.style.cursor = 'not-allowed';
        fighter2AttackButton.style.cursor = 'not-allowed';
        healer1Button.style.cursor = 'not-allowed';
        healer2Button.style.cursor = 'not-allowed';

        // Lógica do cara ou coroa para decidir quem começa
        let coinFlip = Math.random() < 0.5; // True = P1 começa, False = P2 começa
        let starter = coinFlip ? fighter1AttackButton : fighter2AttackButton;
        let starterHealer = coinFlip ? healer1Button : healer2Button;
        let nonStarter = coinFlip ? fighter2AttackButton : fighter1AttackButton;
        let nonStarterHealer = coinFlip ? healer2Button : healer1Button;
        let message = coinFlip ? 'P1 é cara, P1 começa!' : 'P2 é coroa, P2 começa!';

        this.log.addMessage(message);

        // Delay de 2.5 segundos antes de comecar a luta // espaco para uma animacao/ contagem regressiva etc  
        setTimeout(() => {
            starter.disabled = false;
            starterHealer.disabled = false;
            starter.style.cursor = 'pointer';
            starterHealer.style.cursor = 'pointer';
        }, 2500);

        // Configuração dos turnos
        fighter1AttackButton.addEventListener('click', () => {
            fighter1AttackButton.disabled = true;
            fighter2AttackButton.disabled = false;
            healer1Button.disabled = true;
            healer2Button.disabled = false;


            fighter1AttackButton.style.cursor = 'not-allowed';
            fighter2AttackButton.style.cursor = 'pointer';
            healer1Button.style.cursor = 'not-allowed';
            healer2Button.style.cursor = 'pointer';
        });

        healer1Button.addEventListener('click', () => {
            fighter1AttackButton.disabled = true;
            fighter2AttackButton.disabled = false;
            healer1Button.disabled = true;
            healer2Button.disabled = false;

            healer1Button.style.cursor = 'not-allowed';
            healer2Button.style.cursor = 'pointer';
        });

        fighter2AttackButton.addEventListener('click', () => {
            fighter2AttackButton.disabled = true;
            fighter1AttackButton.disabled = false;
            healer2Button.disabled = true;
            healer1Button.disabled = false;

            fighter2AttackButton.style.cursor = 'not-allowed';
            fighter1AttackButton.style.cursor = 'pointer';
            healer2Button.style.cursor = 'not-allowed';
            healer1Button.style.cursor = 'pointer';
        });

        healer2Button.addEventListener('click', () => {
            fighter2AttackButton.disabled = true;
            fighter1AttackButton.disabled = false;
            healer2Button.disabled = true;
            healer1Button.disabled = false;

            healer2Button.style.cursor = 'not-allowed';
            healer1Button.style.cursor = 'pointer';
        });
    }

    update() {
        // Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct.toFixed(2)}%`;

        // Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct.toFixed(2)}%`;
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) { // Condição de vitória ou derrota
            return;
        }

        let attackFactor = parseFloat((Math.random() * 2).toFixed(2));
        let defenseFactor = parseFloat((Math.random() * 2).toFixed(2));

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        } else {
            this.log.addMessage(`${attacked.name} defendeu o ataque`);
        }

        // Verificação do fim da luta
        if (attacked.life <= 0) {
            this.log.addMessage(`${attacked.name} foi derrotado!`);
            this.endFight(attacking.name);
            return;
        }

        this.update();
    }

    doHeal(fighter) {
        let healingTimes = 4; //corrigir, nao funciona 

        // Verifica se ainda há curas disponíveis
        while (healingTimes > 0) {
            let healAmount = Math.floor(Math.random() * 10) + 5;
            fighter.life = Math.min(fighter.maxLife, fighter.life + healAmount); // Cura, mas não ultrapassa a vida máxima

            this.log.addMessage(`${fighter.name} curou ${healAmount} de HP.`);
            this.update(); // Atualiza a barra de vida





            healingTimes--;

            // settar as mudancas graficas com o decremento aqui 
        }

        return;
    }

    endFight(winnerName) {
        this.log.addMessage(`${winnerName} venceu a luta!`);
        this.fighter1El.querySelector('.attackButton').disabled = true;
        this.fighter2El.querySelector('.attackButton').disabled = true;

        this.fighter1El.querySelector('.healButton').disabled = true;
        this.fighter2El.querySelector('.healButton').disabled = true;
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        let li = document.createElement('li');
        li.innerText = msg;
        this.listEl.appendChild(li); // Adiciona o <li> à lista
    }
}
