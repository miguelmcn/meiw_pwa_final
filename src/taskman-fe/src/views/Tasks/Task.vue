<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Criar Tarefa" />

            <!--FORM-->
            <b-row>
                <b-col cols="2"></b-col>
                <b-col>
                    <form @submit.prevent="add">
                        <div class="form-group">
                            <input v-model="task.name" type="text" class="form-control form-control-lg" id="txtName"
                                placeholder="nome da tarefa" required />
                        </div>
                        <div class="form-group">
                            <textarea id="txtDescription" class="form-control form-control-lg"
                                placeholder="escreve descrição" cols="30" rows="3" v-model="task.description"></textarea>
                        </div>
                        <div class="form-group">
                            <select id="sltStatus" class="form-control form-control-lg" v-model="task.status" required>
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <input v-model="task.dueDate" type="text" onmouseenter="(this.type='date')"
                            onmouseleave="(this.type='text')" class="form-control form-control-lg" id="txtDueDate"
                            placeholder="prazo" required />

                        <input v-model="task.completionDate" type="text" onmouseenter="(this.type='date')"
                            onmouseleave="(this.type='text')" class="form-control form-control-lg" id="txtCompletionDate"
                            placeholder="data de conclusão" />





                        <button type="submit" class="btn btn-outline-success btn-lg mr-2">
                            <i class="fas fa-plus-square"></i> ADICIONAR</button>
                        <router-link :to="{ name: 'tasks' }" tag="button" class="btn btn-outline-danger btn-lg"><i
                                class="fas fa-window-close"></i> CANCELAR</router-link>
                    </form>
                </b-col>
                <b-col cols="2"></b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
import { ADD_TASK, EDIT_TASK } from "@/store/tasks/task.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
    name: "EditTask",
    components: {
        HeaderPage
    },
    data: () => {
        return {
            task: {
                name: "",
                description: "",
                status: "todo",
                important: false,
                creationDate: new Date(),
                dueDate: new Date(),
                completionDate: null,
                assign: [],
                labels: []
            }
        }
    },
    computed: {
        ...mapGetters("task", ["getTasksById", "getMessage"])
    },
    methods: {
        add() {
            this.$store.dispatch(`task/${ADD_TASK}`, this.$data).then(
                () => {
                    this.$alert(this.getMessage, "Task criada!", "success");
                    router.push({ name: "tasks" });
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        },
        update() {
            this.$store.dispatch(`task/${EDIT_TASK}`, this.$data.task).then(
                () => {
                    this.$alert(this.getMessage, "Tarefa atualizada!", "success");
                    router.push({ name: "tasks" });
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        }
    },
    created() {
        if (this.$route.params.taskId == '0') {
            return;
        }

        this.task = this.getTasksById(this.$route.params.taskId);
    }
};
</script>