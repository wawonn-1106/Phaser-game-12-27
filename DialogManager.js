export default class DialogManager {
    constructor() {
        this.currentSequence = [];
        this.currentIndex = 0;
        this.isTalking = false;
        this.playerName = "名無し";
        this.inputMode = false; 
        this.onChoice = null;
    }

    start(dialogArray) {
        this.currentSequence = dialogArray;
        this.currentIndex = 0;
        this.isTalking = true;
        document.getElementById('dialog-window').style.display = 'block';
        this.showLine();
    }

    showLine() {
        if (this.inputMode) return;
        if (this.currentIndex >= this.currentSequence.length) {
            this.end();
            return;
        }

        const line = this.currentSequence[this.currentIndex];
        const nameEl = document.getElementById('dialog-name');
        const textEl = document.getElementById('dialog-text');

        nameEl.innerText = line.name;

        const displayText = (line.text || '').replace(/\[\[NAME\]\]/g, this.playerName);

        switch (line.type) {
            case "text":
                this.inputMode = false;
                textEl.innerText = displayText;
                this.currentIndex++;
                break;

            case "input":
                this.inputMode = true;
                textEl.innerText = displayText;
                const inputContainer = document.getElementById('dialog-input');
                const inputField = document.getElementById('player-name-input');
                const inputSubmit = document.getElementById('player-name-submit');
                if (inputContainer && inputField && inputSubmit) {
                    inputContainer.style.display = 'block';
                    inputField.value = '';
                    inputField.focus();

                    const submitHandler = () => {
                        const val = inputField.value.trim();
                        if (val) this.playerName = val;
                        inputContainer.style.display = 'none';
                        inputSubmit.removeEventListener('click', submitHandler);
                        inputField.removeEventListener('keydown', keyHandler);
                        this.inputMode = false;
                        this.currentIndex++;
                        this.showLine();
                    };
                    const keyHandler = (e) => {
                        if (e.key === 'Enter') submitHandler();
                    };

                    inputSubmit.addEventListener('click', submitHandler);
                    inputField.addEventListener('keydown', keyHandler);
                } else {
                    const val = prompt(displayText) || '';
                    if (val) this.playerName = val;
                    this.inputMode = false;
                    this.currentIndex++;
                    this.showLine();
                }
                break;

            case "choice":
                this.inputMode = true;
                let html = `<p>${displayText}</p>`;
                line.choices.forEach(choice => {
                    html += `<button class="choice-btn" data-next="${choice.next}">${choice.text}</button> `;
                });
                textEl.innerHTML = html;

                textEl.onclick = (e) => {
                    if (e.target.classList.contains('choice-btn')) {
                        const nextScene = e.target.dataset.next;
                        this.end();
                        if (this.onChoice) this.onChoice(nextScene);
                    }
                };
                break;
        }
    }

    end() {
        this.isTalking = false;
        this.inputMode = false;
        document.getElementById('dialog-window').style.display = 'none';
        document.getElementById('dialog-text').innerText = "";
    }
}