import {toggleTheme} from '../utils/theme.js'
import {VariantFormController} from "../components/VariantFormController.js";
import {AnswersTable} from "../components/AnswersTable.js";

document.addEventListener('DOMContentLoaded', () => {
    const helperTextElement = document.querySelector("#helper-text")
    const answersSectionElement = document.querySelector("#answers-section")
    const variantIDElement = document.querySelector("#variant-id")
    const answersTableElement = document.querySelector("#answers-table")
    const formElement = document.querySelector("#variant-form");
    const toggleThemeButton = document.querySelector("#toggle-theme-button")
    const resetFormButton = document.querySelector("#reset-variant-button");

    const answersTable = new AnswersTable(answersTableElement);
    const variantForm = new VariantFormController(formElement);

    toggleThemeButton.addEventListener('click', ()=>{
        toggleTheme();
        toggleThemeButton.setAttribute("data-theme", getTheme());
    });
    toggleThemeButton.setAttribute("data-theme", getTheme())

    resetFormButton.addEventListener('click', ()=>{
        variantForm.reset();
        answersTable.clear();
        hideElement(answersSectionElement);
        showElement(helperTextElement);

        document.body.scrollIntoView({block:"start"})
    })

    formElement.addEventListener("submit-error", (e) => {
        console.error(e.detail.error);
    })

    formElement.addEventListener("submit-success", (e) => {
        if (!e.detail.variant || !e.detail.variant.tasks) return;

        const tasks = e.detail.variant.tasks;
        answersTable.showAnswers(tasks);

        variantIDElement.innerHTML = e.detail.variant.kim;

        hideElement(helperTextElement);
        showElement(answersSectionElement);

        answersSectionElement.scrollIntoView()
    })
});

const getTheme = () => {
    const theme = localStorage.getItem('theme');
    return theme ? theme : "light";
}

const hideElement = (el) => {
    el.classList.add("none")
}

const showElement = (el) => {
    el.classList.remove("none")
}