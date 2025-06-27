<script lang="ts">
    import { signIn } from "@auth/sveltekit/client";
    import { SignIn } from "@auth/sveltekit/components";
    // import { providerMap } from "../../../auth";

    let username = $state<string>("");
    let password = $state<string>("");
</script>

<!-- {#each providerMap as provider} -->
<!-- <SignIn provider="credentials" signInPage="account/login">
    <div slot="submitButton">
        <span> Signin with Credentials</span>
    </div>
</SignIn> -->
<SignIn provider="github" signInPage="account/login">
    <div slot="submitButton">
        <span> Signin with GitHub</span>
    </div>
</SignIn>
<!-- {/each} -->

<form>
    <h1>Login</h1>
    <input type="text" placeholder="Username" bind:value={username} required />
    <input type="password" placeholder="Password" bind:value={password} required />
    <div>
        <button
            type="submit"
            onclick={() => signIn("credentials", { username, password, callbackUrl: "/account" })}
        >
            Login
        </button>
        <a href="/account/recovery"><button type="button">Forgot Password</button></a>
    </div>
    <p>Don't have an account? <a href="/account/register">Register here</a>.</p>
</form>

<style lang="scss">
    @use "$lib/scss/forms";
</style>
