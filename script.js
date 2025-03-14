let btn = document.querySelector("#btn")
let input = document.querySelector("#input")

const out = document.querySelector("#res")
btn.addEventListener('click', async () => {
    const variant = input.value
    const variantURL = "https://kompege.ru/api/v1/variant/kim/" + variant

    const response = await fetch(variantURL, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Accept-Encoding": "deflate, gzip",
            "Host": "kompege.ru",
        }
    })

    tasks = (await response.json()).tasks

    for (let i = 0; i < tasks.length; i++) {
        let k = tasks[i].key
        if (!k) k = ""
        k = k.replaceAll("\\n", "; ")
        out.innerHTML = out.innerHTML + "<p>" + (i+1) + ". " + k + "</p>"
    }


    console.log(tasks)
})