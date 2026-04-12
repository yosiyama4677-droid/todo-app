const input = document.getElementById("input");
const btn = document.getElementById("btn");
const output = document.getElementById("output");

btn.addEventListener(`click`, () => {
    const text = input.value;

    const div = document.createElement("div");

    const left = document.createElement("div");
    left.classList.add("todo-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";


    const span = document.createElement("span");
    span.textContent = text;

    checkbox.addEventListener(`change`, () => {
        span.classList.toggle("done");
    });


    const deletebtn = document.createElement("button");
    deletebtn.textContent = "削除";
    deletebtn.classList.add("delete-btn");


    deletebtn.addEventListener(`click`, () => {
    div.remove();
    });

    left.append(checkbox);
    left.append(span);

    div.append(left);
    div.append(deletebtn);

    output.append(div);

    input.value = ""
    
});

input.addEventListener(`keypress`, (e) => {
    if(e.key === "Enter"){
        btn.click();
    }
});
