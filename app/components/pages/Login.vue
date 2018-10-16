<template>
    <Page class="page">
        <ActionBar class='home-header' backgroundColor="#fff" title="" android.icon="~/assets/images/pelasruas.png" flat="true" />
        <FlexboxLayout class="login-box" AlignContent="center" justifyContent="center" AlignItems="center">
            <StackLayout class="form" alignSelf="center">
                <StackLayout width="110" height="61" class="logo" />

                <Button text="Log In" @tap="loginWGg()" width="150" height="50" class="btn btn-primary"></Button>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
import SocialLogin from 'nativescript-social-login';

export default {
    name: 'login',
    data() {
        return {
            loginFailedState: false
        }
    },
    methods: {
        loginWGg() {
            SocialLogin.loginWithGoogle((result) => {
                console.log("code: " + result.code);
                console.log("error: " + result.error);
                console.log("userToken: " + result.userToken);
                console.log("displayName: " + result.displayName);
                console.log("photo: " + result.photo);
                console.log("authToken: " + result.authToken);
                if (result.error || result.code == SocialLogin.LoginResultType.Cancelled) {
                    this.loginFailedState = true;
                } else {
                    console.log('AE POHA');
                }
            })
        }
    },
    mounted () {

    }
}
</script>

<style lang="scss" scoped>
    .logo {
        background-image: url('~/assets/images/pelasruas.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .btn.btn-primary {
        margin-top: 50px;
        background-color: #ff4600;
    }
</style>
