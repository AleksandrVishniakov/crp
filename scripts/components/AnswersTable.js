export class AnswersTable {
    constructor(el) {
        this.table = el;
        this.tbody = el.querySelector("tbody")
        this.template = el.querySelector("template");

        this._rowID = 1;
    }

    clear() {
        this._rowID = 1;
        this.tbody.innerHTML = "";
    }

    showAnswers(answers) {
        answers.forEach(answer => this._appendAnswer(answer))
    }

    _appendAnswer(answer) {
        const taskType = answer.number ? answer.number : "?";
        const taskID = answer.taskId ? answer.taskId : "?";
        const taskKey = answer.key ? answer.key : "";

        const rowID = this._rowID++;
        const row = this.template.content.cloneNode(true);
        const cells = row.querySelectorAll("td")

        cells[0].innerHTML = rowID;
        cells[1].innerHTML = taskType;
        cells[2].innerHTML = taskID;
        cells[3].querySelector("p").innerHTML = taskKey;
        cells[3].addEventListener('click', async ()=>{
            await navigator.clipboard.writeText(taskKey)
        })
        cells[4].querySelector("a").setAttribute("href", `https://kompege.ru/task`);

        this.tbody.appendChild(row);
    }
}