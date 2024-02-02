<template>
    <div class="kanban-task" draggable="true" :style="{ backgroundColor: getBackgroundColor() }">
        
        <div>
            <p class="title" style="display: inline-block;">{{ task.name }}</p>
            <router-link :to="{ name: 'editTask', params: { taskId: task._id } }" tag="button"
                    class="btn edit-button">
                    <i class="fas fa-edit"></i>
                  </router-link>
        </div>
        <div>
            <p v-for="assign in task.assign" :key="assign" :style="{ backgroundColor: getRandomColor() }" class="tip">
                {{ assign }}
            </p>
        </div>
        <div>
            <p v-for="label in task.labels" :key="label" :style="{ backgroundColor: getRandomColor() }" class="tip">
                {{ label }}
            </p>
        </div>
        <div>
            <p v-if="task.important" style="float: left; font-weight: bold;">Importante!</p>
            <p class="align-right" :class="{ 'important-text': task.important, 'overdue-date': isDueDateOverdue() }" >Prazo: {{ task.dueDate | formatDate }}</p>
            <p class="align-right" :class="{ 'important-text': task.important, 'overdue-date': isDueDateOverdue() }" v-if="task.status == 'done'" >Feito em: {{ task.completionDate | formatDate }}</p>
        </div>

    </div>
</template>

<style>
.title {
    font-weight: bold;
    font-size: x-large;
}

.tip {
    height: 30px;
    margin-top: 2px;
    padding: 2px;
    padding-right: 5px;
    padding-left: 5px;
    margin-bottom: 0px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 10px;
    display: inline-block;
    text-align: center;
    color: #fff;
}

.align-right {
    text-align: right;
    margin-bottom: 0px;
}

.overdue-date {
    color: #e74c3c;
    font-weight: bold;
    margin-top: 5px;
}

.edit-button {
    float: right;
    cursor: pointer;
    color: #3498db;
    font-weight: bold;
  }
</style>

<script>
export default {
    name: "TaskComponent",
    props: ["task"],
    filters: {
        formatDate(value) {
            return new Date(value).toLocaleDateString("pt-pt");
        }
    },
    methods: {
        getRandomColor: function () {
            const colors = ['#3498db', '#2ecc71', '#e74c3c']; // Blue, Green, Red
            return colors[Math.floor(Math.random() * colors.length)];
        },
        getBackgroundColor: function () {
            if (this.task.important) {
                return '#f1c40f'; // Amarelo para tarefas importantes
            } else {
                return '';
            }
        },
        getDueDateColor: function () {
            if (this.task.important) {
                return '#e74c3c'; // Vermelho para atrasado
            } else {
                return '';
            }
        },
        isDueDateOverdue: function () {
            const dueDate = new Date(this.task.dueDate);
            const completionDate = new Date(this.task.completionDate);
            const today = new Date();

            const openOverdue = this.task.status != "done" && dueDate <= today
            const doneOverdue = this.task.status == "done" && dueDate < completionDate

            return openOverdue || doneOverdue;
        }
    }
};
</script>