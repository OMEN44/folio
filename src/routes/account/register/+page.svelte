<form>
    <h1>Register</h1>
    <input type="text" placeholder="Username" required />
    <input type="text" placeholder="Email" required />
    <input type="password" placeholder="Password" required />
    <input type="password" placeholder="Confirm Password" required />
    <div>
        <button type="submit">Register</button>
        <a href="/account/login"><button type="button">Cancel</button></a>
    </div>
</form>

<style lang="scss">
    @use "$lib/scss/forms";
</style>
