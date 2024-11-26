async function userLogin(page, username, password) {
    await page.getByRole("button", { name: "Log in" }).click()
    await page.getByTestId("username").fill(username)
    await page.getByTestId("password").fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

async function createBlog(page, title, author, url) {

    await page.getByRole("button", { name: "New blog" }).click()
    await page.getByPlaceholder('Blog title')
        .fill(title);
    await page.getByPlaceholder('Blog author')
        .fill(author);
    await page.getByPlaceholder('Blog link')
        .fill(url);
    await page.getByRole("button", { name: "create" }).click()
}

export { userLogin, createBlog }