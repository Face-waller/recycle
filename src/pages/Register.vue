<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>注册</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="username" label="用户名" type="text"/>
                  <v-text-field prepend-icon="person" v-model="password" label="密码" type="text"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="doRegister">注册</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog" width="300px">
      <v-alert icon="warning" color="error" :value="true">
        {{errorMsg}}
      </v-alert>
    </v-dialog>
  </v-app>
</template>

<script>
    export default {
        name:"Register",
        data: () => ({
            username: "",
            password: "",
            dialog: false,
            errorMsg:""
        }),
        methods: {
            doRegister() {
                if (!this.username || !this.password) {
                    this.dialog = true;
                    this.errorMsg = "用户名和密码不能为空";
                    return false;
                }
                this.$http.post(
                    "/trash/user/user/register",
                    {
                        username:this.username,
                        password:this.password
                    }
                ).then(res => {
                    this.$router.push("/register")
                }).catch(error => {
                    this.dialog = true;
                    this.errorMsg = "注册失败，用户名或密码不符合规范!";
                    return false;
                })
            }
        }
    };
</script>
