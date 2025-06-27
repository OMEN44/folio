<form method="POST" action="/account/register">
    <h1>Register</h1>
    <input name="username" type="text" placeholder="Username" required />
    <input name="email" type="email" placeholder="Email" required />
    <input name="password" type="password" placeholder="Password" required />
    <input name="confirm" type="password" placeholder="Confirm Password" required />
    <div>
        <button type="submit">Register</button>
        <a href="/account/login"><button type="button">Cancel</button></a>
    </div>
</form>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
    @use "$lib/scss/forms";
</style>
