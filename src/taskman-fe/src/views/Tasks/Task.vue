<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Criar Tarefa" v-if="this.$route.params.taskId == '0'" />
            <HeaderPage title="Atualizar Tarefa" v-if="this.$route.params.taskId != '0'" />

            <!--FORM-->
            <b-row style="padding-top: 20px;">
                <b-col cols="2"></b-col>
                <b-col>
                    <form @submit.prevent="save">
                        <div class="form-group">
                            <label class="form-label ">Título</label>
                            <input v-model="task.name" type="text" class="form-control " id="txtName"
                                placeholder="nome da tarefa" required />
                        </div>

                        <div class="form-group">
                            <label class="form-label ">Descrição</label>
                            <textarea id="txtDescription" class="form-control " placeholder="escreve descrição" cols="30"
                                rows="3" v-model="task.description"></textarea>
                        </div>

                        <div class="form-group">
                            <label class="form-label ">Estado</label>
                            <select id="sltStatus" class="form-control " v-model="task.status" required>
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label ">Prazo</label>
                            <input v-model="task.dueDate" type="date" class="form-control " id="txtDueDate"
                                placeholder="prazo" required />
                        </div>

                        <div class="form-group">
                            <label class="form-label ">Feito em</label>
                            <input v-model="task.completionDate" type="date" class="form-control " id="txtCompletionDate"
                                placeholder="feito em" />
                        </div>

                        <div class="form-group ">
                            <div class="form-check ">
                                <input type="checkbox" id="editTaskImportant" v-model="task.important"
                                    class="form-check-input">
                                <label class="form-check-label" for="flexCheckDisabled">
                                    Importante!
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label ">Assignar</label>
                            <select id="sltStatus" class="form-control " v-model="taskAssign">
                                <option v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</option>
                                <option v-for="group in groups" :key="group.id" :value="group.name">{{ group.name }}</option>
                            </select>
                            <b-button class="btn btn-sm" style="float: right;" @click="task.assign.push(taskAssign)">
                                <i class="fas fa-plus-square"></i>
                            </b-button>

                            <div class="form-group">
                                <p v-for="assign in task.assign" :key="assign"
                                    :style="{ backgroundColor: getRandomColor() }" class="tip" style="height: 40px;">
                                    {{ assign }}
                                    <b-button class="btn btn-sm" @click="task.assign.splice(task.assign.indexOf(assign), 1)">
                                        <i class="fas fa-window-close"></i>
                                    </b-button>
                                </p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label ">Etiquetas</label>
                            <input v-model="taskLabel" type="text" class="form-control " id="txtLabel"
                                placeholder="etiqueta" />
                            <b-button class="btn btn-sm" style="float: right;" @click="task.labels.push(taskLabel)">
                                <i class="fas fa-plus-square"></i>
                            </b-button>

                            <div class="form-group">
                                <p v-for="label in task.labels" :key="label"
                                    :style="{ backgroundColor: getRandomColor() }" class="tip" style="height: 40px;">
                                    {{ label }}
                                    <b-button class="btn btn-sm" @click="task.labels.splice(task.labels.indexOf(label), 1)">
                                        <i class="fas fa-window-close"></i>
                                    </b-button>
                                </p>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-outline-success btn-lg mr-2">
                            <i class="fas fa-check-square"></i> GRAVAR</button>
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
import { FETCH_USERS } from "@/store/users/user.constants";
import { FETCH_GROUPS } from "@/store/groups/group.constants";
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
            taskAssign: "",
            taskLabel: "",
            users: [],
            groups: [],
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
        ...mapGetters("task", ["getTasksById", "getMessage"]),
        ...mapGetters("user", ["getUsers", "getMessage"]),
        ...mapGetters("group", ["getGroups", "getMessage"])
    },
    methods: {
        add() {
            this.$store.dispatch(`task/${ADD_TASK}`, this.$data.task).then(
                () => {
                    this.$alert(
                        this.getMessage,
                        "Task criada!",
                        "success"
                    );
                    router.push({ name: 'tasks' });
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
        },
        save() {
            if (this.$route.params.taskId == '0') {
                this.add();
            } else {
                this.update();
            }
        },
        fetchUsers() {
            this.$store.dispatch(`user/${FETCH_USERS}`).then(
                () => {
                    this.users = this.getUsers;
                }, err => {
                    this.$alert(`${err.message}`, 'Erro', 'error');
                });
        },
        fetchGroups() {
            this.$store.dispatch(`group/${FETCH_GROUPS}`).then(
                () => {
                    this.groups = this.getGroups;
                }, err => {
                    this.$alert(`${err.message}`, 'Erro', 'error');
                });
        },
        getRandomColor: function () {
            const colors = ['#3498db', '#2ecc71', '#e74c3c']; // Blue, Green, Red
            return colors[Math.floor(Math.random() * colors.length)];
        }
    },
    created() {
        if (this.$route.params.taskId == '0') {
            return;
        }

        this.task = this.getTasksById(this.$route.params.taskId);
        this.fetchUsers();
        this.fetchGroups();
    }
};
</script>