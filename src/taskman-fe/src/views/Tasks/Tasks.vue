<template>
    <section class="page-section">
        <div class="row">
            <div style="display: flex;">
                <div style="display: flex; padding-left: 30px;">
                    <router-link style="margin-left: 20px;" :to="{ name: 'editTask', params: { taskId: '0' } }" tag="button" class="btn btn-outline-success mr-2 mt-2">
                        <i class="fas fa-plus-square"></i> Nova Tarefa
                    </router-link>
                </div>
            </div>
            <div class="kanban-container">
                <div class="kanban-column">
                    <h2>To Do</h2>
                    <p v-for="task in todoTasks" :key="task.id">
                        <TaskComponent :task="task"></TaskComponent>
                    </p>
                </div>

                <div class="kanban-column">
                    <h2>Doing</h2>
                    <p v-for="task in doingTasks" :key="task.id">
                        <TaskComponent :task="task"></TaskComponent>
                    </p>
                </div>

                <div class="kanban-column">
                    <h2>Done</h2>
                    <p v-for="task in doneTasks" :key="task.id">
                        <TaskComponent :task="task"></TaskComponent>
                    </p>
                </div>
            </div>


        </div>
    </section>
</template>

<style>
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

.kanban-container {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    width: 100%;
}

.kanban-column {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    width: 30%;
    padding: 10px;
    box-sizing: border-box;
}

.kanban-column h2 {
    text-align: center;
    color: #333;
}

.kanban-task {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-bottom: 10px;
    padding: 10px;
    cursor: pointer;
}
</style>

<script>
import TaskComponent from "@/components/TaskComponent.vue";
import { FETCH_TASKS } from "@/store/tasks/task.constants";

import { mapGetters } from "vuex";

export default {
    name: "Task",
    components: {
        TaskComponent
    },
    data: function () {
        return {
            tasks: []
        };
    },
    computed: {
        ...mapGetters("task", ["getTasks"]),
        todoTasks: function () {
            if (this.tasks == []) return [];

            return this.tasks.filter(task => {
                return task.status.toLowerCase().includes("todo");
            });
        },
        doingTasks: function () {
            if (this.tasks == []) return [];

            return this.tasks.filter(task => {
                return task.status.toLowerCase().includes("doing");
            });
        },
        doneTasks: function () {
            if (this.tasks == null) return null;

            return this.tasks.filter(task => {
                return task.status.toLowerCase().includes("done");
            });
        },
    },
    methods: {
        fetchTasks() {
            this.$store.dispatch(`task/${FETCH_TASKS}`).then(
                () => {
                    this.tasks = this.getTasks;
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        },
    },
    created() {
        this.fetchTasks();
    }
}
</script>

