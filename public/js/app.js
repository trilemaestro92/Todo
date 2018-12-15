const socket = io();

async function render() {

    // Run Queries!
    // ==========================================
    await addItem();
    await toggleComplete();
    await deleteTodo();
    await runTodoQuery();
    await editTodo();
    await finishEdit();
    await cancelEdit();
}

// Sockets!
socket.on('emit-task', function (data) {
    var newItem = $(
        [
            `<li id ='${data.id}' class='list-group-item todo-item'>
                <span>
                ${data.text}
                </span>
                <input id ='${data.id}' type='text' class='edit' style='display: none;'>
                <button id ='${data.id}' class='delete btn btn-secondary'>x</button>
                <button id ='${data.id}' class='complete btn btn-light'>✓</button>
                </li>`
        ].join("")
    );
    newItem.find("button.delete").data("id", data.id);
    newItem.find("input.edit").css("display", "none");
    newItem.data("data", data);
    $('#content').append(newItem);


})
socket.on('removed-task', async function (data) {
    $('#content').empty()
    await runTodoQuery();
})
socket.on('edit-task', async function (data) {
    $('#content').empty();
    await runTodoQuery();
})
socket.on('edited-text', async function (data) {
    $('#content').empty()
     await runTodoQuery();
})

//Functions 

function addItem() {
    $('#submit').on('click', async function (event) {
        event.preventDefault();
        const newItem = {
            text: $('#todo').val().trim(),
            complete: new Boolean(false)
        }
        for (let key in newItem) {
            if (newItem[key] === '') {
                alert('Please fill out all fields');
                return null;
            }
        }
        await socket.emit('new-item', newItem)
        $('#todo').val('');
    });
}
function toggleComplete(event) {
    $(document).on("click", "button.complete", async function () {
        var todo = $(this).parent().data("data");
        todo.complete = !todo.complete;
        await updateTodo(todo);
        await $.ajax({ method: "GET", url: "/api/todos" })
            .then(function (dataList) {
                socket.emit('edit-item', dataList)
            })
    });
}
function deleteTodo(event) {
    $(document).on("click", "button.delete", async function () {
        var id = $(this).data("id");
        await removeTodo(id)
    });
}
function editTodo() {
    $(document).on("click", ".todo-item", function () {
        var currentTodo = $(this).data("data");
        $(this).children().hide();
        $(this).children("input.edit").val(currentTodo.text);
        $(this).children("input.edit").show();
        $(this).children("input.edit").focus();
    });
}
function finishEdit() {
    $(document).on("keyup", ".todo-item", function () {
        var updatedTodo = $(this).data("data");
        let id = event.target.id;
        if (event.which === 13) {
            updatedTodo.text = $(this).children("input").val().trim();
            $(this).blur();
            editText(id, updatedTodo);
        }
    });
}
function cancelEdit() {
    $(document).on("blur", ".todo-item", function () {
        var currentTodo = $(this).data("data");
        if (currentTodo) {
            $(this).children().hide();
            $(this).children("input.edit").val(currentTodo.text);
            $(this).children("span").show();
            $(this).children("button").show();
        }
    });
}

//routes shortcuts

function updateTodo(todo) {
    $.ajax({
        method: "PUT",
        url: "/api/todos",
        data: todo
    }).then();
}
function removeTodo(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/delete/" + id
    }).then(function (data) {
        $.get("/api/todos", function (data) {
            socket.emit('remove-item', data)
        });
    }
    );
}
function editText(id, updatedTodo) {
    $.ajax({
        method: "PUT",
        url: "/api/edit/" + id,
        data: updatedTodo
    }).then(function (data) {
        $.get("/api/todos", function (data) {
            socket.emit('edit-text', data)
        });
    });
}

const renderSocket = function (outputElement, data) {
    for (let i = 0; i < data.length; i++) {
        const output = $(outputElement);
        var newItem = $(
            [
                `<li id ='${data[i].id}' class='list-group-item todo-item'>
                    <span>
                    ${data[i].text}
                    </span>
                    <input id ='${data[i].id}' type='text' class='edit' style='display: none;'>
                    <button id ='${data[i].id}' class='delete btn btn-secondary'>x</button>
                    <button id ='${data[i].id}' class='complete btn btn-light'>✓</button>
                    </li>`
            ].join("")
        );
        newItem.find("button.delete").data("id", data[i].id);
        newItem.find("input.edit").css("display", "none");
        newItem.data("data", data[i]);
        if (data[i].complete) {
            newItem.find("span").css("text-decoration", "line-through");
        }
        output.append(newItem);
    }
}

const runTodoQuery = function () {
    $.ajax({ url: "/api/todos", method: "GET" })
        .then(function (todoList) {
            renderSocket('#content', todoList);
        });
}

$(document).ready(function () {
    $('#content').empty();
    $('#submit').off('click');
    let moment1 = moment().format('ddd');
    let moment2 = moment().format('MMM Do YYYY');
    $('#moment').html(`${moment1} <span id='moment-2'></span>`);
    $('#moment-2').html(`${moment2}`);

    render();
})
