<script>
    import { signOut } from "@auth/sveltekit/client";
</script>

<form>
    <h1>Account Settings</h1>

    <div>
        <button onclick={async () => signOut()}>Log out</button>
    </div>
</form>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
    @use "$lib/scss/forms";
</style>
