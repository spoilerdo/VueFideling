<template>
    <div>
        <p>fill in to login:</p>
        <form
            @submit="login">
            <input v-model="form.username"/>
            <input v-model="form.password" type="password"/>
            <input type="submit" value="login"/>
        </form>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            form: {
                username: null,
                password: null
            }
        };
    },
    methods: {
        login(e) {
            e.preventDefault();
            if(this.form.username !== null && this.form.password !== null){
                this.$store.dispatch('auth/login', this.form)
            }
        }
    }
}
</script>
