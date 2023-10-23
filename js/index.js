const taskInput = document.getElementById("task");
        const taskList = document.getElementById("taskList");
        let currentList = 0;

        function switchList(listIndex) {
            currentList = listIndex;
            loadTasksFromLocalStorage();
        }

        function addTask() {
            const taskText = taskInput.value;
            if (taskText === "") {
                alert("Будь ласка, введіть текст завдання.");
                return;
            }

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${taskText}</span>
                <button onclick="deleteTask(this)">Видалити</button>
                <button onclick="markAsDone(this)">Виконано</button>
            `;
            taskList.appendChild(listItem);

            taskInput.value = "";
            saveTasksToLocalStorage();
        }

        function deleteTask(button) {
            const listItem = button.parentElement;
            taskList.removeChild(listItem);
            saveTasksToLocalStorage();
        }

        function markAsDone(button) {
            const listItem = button.parentElement;
            listItem.classList.add("done");
            button.style.display = "none";
            saveTasksToLocalStorage();
        }

        function saveTasksToLocalStorage() {
            const tasks = [];
            const listItems = taskList.querySelectorAll("li");
            listItems.forEach((item) => {
                const taskText = item.querySelector("span").textContent;
                const isDone = item.classList.contains("done");
                tasks.push({ text: taskText, done: isDone });
            });

            localStorage.setItem(`tasks-${currentList}`, JSON.stringify(tasks));
        }

        function loadTasksFromLocalStorage() {
            const tasks = JSON.parse(localStorage.getItem(`tasks-${currentList}`)) || [];
            taskList.innerHTML = "";
            tasks.forEach((task) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <span>${task.text}</span>
                    <button onclick="deleteTask(this)">Видалити</button>
                    <button onclick="markAsDone(this)">Виконано</button>
                `;

                if (task.done) {
                    listItem.classList.add("done");
                    listItem.querySelector("button:last-child").style.display = "none";
                }

                taskList.appendChild(listItem);
            });
        }

        loadTasksFromLocalStorage();