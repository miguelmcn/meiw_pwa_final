<template>
    <section class="page-section">
        <b-container>
            <HeaderPage title="Criar Tarefa" v-if="this.$route.params.groupId == '0'" />
            <HeaderPage title="Atualizar Tarefa" v-if="this.$route.params.groupId != '0'" />

            <!--FORM-->
            <b-row style="padding-top: 20px;">
                <b-col cols="2"></b-col>
                <b-col>
                    <form @submit.prevent="save">
                        <div class="form-group">
                            <label class="form-label ">Nome</label>
                            <input v-model="group.name" type="text" class="form-control " id="txtName"
                                placeholder="nome do grupo" required />
                        </div>

                        <div class="form-group">
                            <label class="form-label ">Utilizadores</label>
                            <select id="sltStatus" class="form-control " v-model="groupAssign">
                                <option v-for="user in users" :key="user.id" :value="user">{{ user.name }}</option>
                            </select>
                            <b-button class="btn btn-sm" style="float: right;" @click="group.users.push(groupAssign)">
                                <i class="fas fa-plus-square"></i>
                            </b-button>

                            <div class="form-group">
                                <p v-for="user in group.users" :key="user.id"
                                    :style="{ backgroundColor: getRandomColor() }" class="tip" style="height: 40px;">
                                    {{ user.name }}
                                    <b-button class="btn btn-sm" @click="group.users.splice(group.users.indexOf(user), 1)">
                                        <i class="fas fa-window-close"></i>
                                    </b-button>
                                </p>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-outline-success btn-lg mr-2">
                            <i class="fas fa-check-square"></i> GRAVAR</button>
                        <router-link :to="{ name: 'groups' }" tag="button" class="btn btn-outline-danger btn-lg"><i
                                class="fas fa-window-close"></i> CANCELAR</router-link>
                    </form>
                </b-col>
                <b-col cols="2"></b-col>
            </b-row>
        </b-container>
    </section>
</template>



<script>
import { ADD_GROUP, EDIT_GROUP } from "@/store/groups/group.constants";
import { FETCH_USERS } from "@/store/users/user.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
    name: "EditGroup",
    components: {
        HeaderPage
    },
    data: () => {
        return {
            groupAssign: "",
            users: [],
            group: {
                name: "",
                users: []
            }
        }
    },
    computed: {
        ...mapGetters("group", ["getGroupsById", "getMessage"]),
        ...mapGetters("user", ["getUsers"])
    },
    methods: {
        add() {
            this.$store.dispatch(`group/${ADD_GROUP}`, this.$data.group).then(
                () => {
                    this.$alert(
                        this.getMessage,
                        "Group criado!",
                        "success"
                    );
                    router.push({ name: 'groups' });
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        },
        update() {
            this.$store.dispatch(`group/${EDIT_GROUP}`, this.$data.group).then(
                () => {
                    this.$alert(this.getMessage, "Tarefa atualizada!", "success");
                    router.push({ name: "groups" });
                },
                err => {
                    this.$alert(`${err.message}`, "Erro", "error");
                }
            );
        },
        save() {
            if (this.$route.params.groupId == '0') {
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
        getRandomColor: function () {
            const colors = ['#3498db', '#2ecc71', '#e74c3c']; // Blue, Green, Red
            return colors[Math.floor(Math.random() * colors.length)];
        }
    },
    created() {
        this.fetchUsers();

        if (this.$route.params.groupId == '0') {
            return;
        }

        this.group = this.getGroupsById(this.$route.params.groupId);        
    }
};
</script>